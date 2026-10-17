import { React, jsxRuntime } from "./runtime.js";
import { loadGuestbook, signGuestbook } from "../services/guestbook.js";
import { timeAgo } from "../services/time.js";

const { jsx, jsxs } = jsxRuntime;
const { useState, useRef, useEffect, useCallback } = React;

const NAME_MAX = 24;
const MESSAGE_MAX = 200;
const NAME_KEY = "warcxs-guestbook-name";

const readName = () => {
  try {
    return localStorage.getItem(NAME_KEY) || "";
  } catch {
    return "";
  }
};
const saveName = (value) => {
  try {
    localStorage.setItem(NAME_KEY, value);
  } catch {
    /* private mode: the name just is not remembered */
  }
};

function BookIcon() {
  return jsxs("svg", {
    "aria-hidden": "true",
    viewBox: "0 0 24 24",
    width: 16,
    height: 16,
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: "social-rail__icon",
    children: [
      jsx("path", { d: "M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5v-15Z" }),
      jsx("path", { d: "M4 20.5A2.5 2.5 0 0 0 6.5 23H20v-5" }),
      jsx("path", { d: "M9 8h7M9 12h5" }),
    ],
  });
}

function Entry({ entry }) {
  return jsxs("li", {
    className: "guestbook__entry",
    children: [
      jsxs("div", {
        className: "guestbook__meta",
        children: [
          jsx("strong", { className: "guestbook__name", children: entry.name }),
          jsx("time", {
            className: "guestbook__time",
            dateTime: new Date(entry.createdAt).toISOString(),
            children: timeAgo(entry.createdAt),
          }),
        ],
      }),
      jsx("p", { className: "guestbook__text", children: entry.message }),
    ],
  });
}

function Panel({ onClose }) {
  const [state, setState] = useState({ loading: true, enabled: false, entries: [] });
  const [name, setName] = useState(readName);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState({ kind: "idle", text: "" });
  const openedAt = useRef(performance.now());
  const website = useRef(null);
  const textarea = useRef(null);

  useEffect(() => {
    let alive = true;
    loadGuestbook().then((data) => alive && setState({ loading: false, ...data }));
    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event) => event.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    textarea.current?.focus({ preventScroll: true });
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const submit = useCallback(
    async (event) => {
      event.preventDefault();
      if (status.kind === "sending") return;
      setStatus({ kind: "sending", text: "" });
      try {
        const entry = await signGuestbook({
          name,
          message,
          elapsed: performance.now() - openedAt.current,
          website: website.current?.value || "",
        });
        saveName(name.trim());
        setMessage("");
        if (entry) setState((s) => ({ ...s, entries: [entry, ...s.entries] }));
        setStatus({ kind: "sent", text: "Thanks! Your message is on the wall." });
      } catch (error) {
        setStatus({ kind: "error", text: error.message });
      }
    },
    [name, message, status.kind],
  );

  const disabled = !state.enabled && !state.loading;
  const ready = message.trim().length >= 2 && status.kind !== "sending" && !disabled;

  return jsx("div", {
    className: "guestbook-overlay",
    onMouseDown: (event) => event.target === event.currentTarget && onClose(),
    children: jsxs("section", {
      className: "guestbook",
      role: "dialog",
      "aria-modal": "true",
      "aria-labelledby": "guestbook-title",
      children: [
        jsxs("header", {
          className: "guestbook__header",
          children: [
            jsx("h2", { id: "guestbook-title", className: "guestbook__title", children: "Guestbook" }),
            jsx("button", {
              type: "button",
              className: "guestbook__close",
              "aria-label": "Close guestbook",
              onClick: onClose,
              children: "×",
            }),
          ],
        }),
        jsx("div", {
          className: "guestbook__list-wrap",
          children: state.loading
            ? jsx("p", { className: "guestbook__note", children: "Loading…" })
            : disabled
              ? jsx("p", { className: "guestbook__note", children: "The guestbook is offline right now." })
              : state.entries.length === 0
                ? jsx("p", { className: "guestbook__note", children: "Nobody has signed yet. Be the first." })
                : jsx("ul", {
                    className: "guestbook__list",
                    children: state.entries.map((entry) => jsx(Entry, { entry }, entry.id)),
                  }),
        }),
        jsxs("form", {
          className: "guestbook__form",
          onSubmit: submit,
          children: [
            jsx("input", {
              className: "guestbook__input",
              type: "text",
              value: name,
              maxLength: NAME_MAX,
              placeholder: "Name (optional)",
              "aria-label": "Your name (optional)",
              autoComplete: "nickname",
              disabled,
              onChange: (event) => setName(event.target.value),
            }),
            jsx("textarea", {
              ref: textarea,
              className: "guestbook__input guestbook__textarea",
              value: message,
              maxLength: MESSAGE_MAX,
              rows: 3,
              placeholder: "Leave a message…",
              "aria-label": "Your message",
              disabled,
              onChange: (event) => setMessage(event.target.value),
            }),
            // Honeypot: invisible to people, filled in by bots.
            jsx("input", {
              ref: website,
              className: "guestbook__hp",
              type: "text",
              name: "website",
              tabIndex: -1,
              autoComplete: "off",
              "aria-hidden": "true",
            }),
            jsxs("div", {
              className: "guestbook__actions",
              children: [
                jsx("span", {
                  className: "guestbook__status",
                  role: status.kind === "error" ? "alert" : "status",
                  "data-kind": status.kind,
                  children: status.text || `${message.length}/${MESSAGE_MAX} · no links please`,
                }),
                jsx("button", {
                  type: "submit",
                  className: "guestbook__submit",
                  disabled: !ready,
                  children: status.kind === "sending" ? "Signing…" : "Sign",
                }),
              ],
            }),
          ],
        }),
      ],
    }),
  });
}

// `createPortal` comes from the bundled react-dom (see profile.js).
export function createGuestbook(createPortal) {
  return function GuestbookButton() {
    const [open, setOpen] = useState(false);
    const button = useRef(null);
    const close = useCallback(() => {
      setOpen(false);
      button.current?.focus({ preventScroll: true });
    }, []);
    return jsxs(React.Fragment, {
      children: [
        jsx("button", {
          ref: button,
          type: "button",
          className: "social-rail__button",
          title: "Guestbook",
          "aria-label": "Open guestbook",
          "aria-haspopup": "dialog",
          onClick: () => setOpen(true),
          children: jsx(BookIcon, {}),
        }),
        open ? createPortal(jsx(Panel, { onClose: close }), document.body) : null,
      ],
    });
  };
}
