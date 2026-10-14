import { React, jsxRuntime } from "./runtime.js";
import { PROJECT_SLIDES, SLIDE_DURATION_MS } from "../config/projects.js";
import {
  wrap,
  slidePosition,
  dragVisual,
  swipeDirection,
  arrowDirection,
} from "./carousel-state.js";

const { jsx, jsxs } = jsxRuntime;
const { useState, useRef, useEffect, useCallback } = React;

const DRAG_START_PX = 6;

function ExternalIcon() {
  return jsxs("svg", {
    "aria-hidden": "true",
    viewBox: "0 0 24 24",
    width: 12,
    height: 12,
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    children: [
      jsx("path", { d: "M15 3h6v6" }),
      jsx("path", { d: "M10 14 21 3" }),
      jsx("path", { d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" }),
    ],
  });
}

function AlertSign() {
  return jsxs("svg", {
    "aria-hidden": "true",
    viewBox: "0 0 48 48",
    width: 40,
    height: 40,
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 3,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    children: [
      jsx("path", { d: "M21.1 7.6 4.9 36.4A3.3 3.3 0 0 0 7.8 41.3h32.4a3.3 3.3 0 0 0 2.9-4.9L26.9 7.6a3.3 3.3 0 0 0-5.8 0Z" }),
      jsx("path", { d: "M24 18v10" }),
      jsx("path", { d: "M24 34.2v.1" }),
    ],
  });
}

function SlideVisual({ slide }) {
  if (slide.logo)
    return jsx("img", {
      className: "fumoware-promo__logo",
      src: slide.logo,
      alt: "",
      width: 64,
      height: 64,
      loading: "lazy",
      decoding: "async",
      draggable: false,
    });
  if (slide.kind === "notice")
    return jsx("span", {
      className: "project-slide__tile project-slide__tile--alert",
      "aria-hidden": "true",
      children: jsx(AlertSign, {}),
    });
  return jsx("span", {
    className: "project-slide__tile",
    "aria-hidden": "true",
    children: slide.monogram || slide.title.slice(0, 2),
  });
}

function Slide({ slide, position, index, total }) {
  const active = position === "active";
  return jsxs("div", {
    className: "project-slide",
    "data-pos": position,
    role: "group",
    "aria-roledescription": "slide",
    "aria-label": `${index + 1} of ${total}: ${slide.title}`,
    "aria-hidden": active ? undefined : "true",
    // `inert` keeps hidden slides out of the tab order and screen readers.
    ...(active ? {} : { inert: "" }),
    children: [
      jsx(SlideVisual, { slide }),
      jsxs("div", {
        className: "fumoware-promo__copy",
        children: [
          jsx("p", { className: "fumoware-promo__eyebrow", children: slide.eyebrow }),
          jsx("p", { className: "fumoware-promo__title", children: slide.title }),
          jsx("p", { className: "fumoware-promo__blurb", children: slide.blurb }),
          slide.link
            ? jsxs("a", {
                className: "fumoware-promo__link",
                href: slide.link.href,
                target: "_blank",
                rel: "noopener noreferrer",
                draggable: false,
                children: [slide.link.label, jsx(ExternalIcon, {})],
              })
            : null,
        ],
      }),
    ],
  });
}

function useReducedMotion() {
  const [reduced, setReduced] = useState(
    () => typeof matchMedia === "function" && matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  useEffect(() => {
    if (typeof matchMedia !== "function") return;
    const query = matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  return reduced;
}

export function ProjectCarousel({ slides = PROJECT_SLIDES, duration = SLIDE_DURATION_MS }) {
  const count = slides.length;
  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [onScreen, setOnScreen] = useState(true);
  const [tabVisible, setTabVisible] = useState(() => !document.hidden);
  const reduced = useReducedMotion();
  const root = useRef(null);
  const viewport = useRef(null);
  const gesture = useRef(null);
  const suppressClick = useRef(false);

  const go = useCallback((target) => setIndex(wrap(target, count)), [count]);
  const step = useCallback((direction) => setIndex((current) => wrap(current + direction, count)), [count]);

  // Autoplay only while the card is visible and the visitor is not interacting.
  useEffect(() => {
    const onVisibility = () => setTabVisible(!document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);
  useEffect(() => {
    if (!root.current || typeof IntersectionObserver !== "function") return;
    const observer = new IntersectionObserver(([entry]) => setOnScreen(entry.isIntersecting), {
      threshold: 0.3,
    });
    observer.observe(root.current);
    return () => observer.disconnect();
  }, []);

  const paused = hovered || focused || pressed || !onScreen || !tabVisible;
  const autoplay = !reduced && count > 1;

  // The timer, not the CSS animation, decides when to advance: global
  // performance/reduced-motion rules shorten CSS animations to ~0ms, and the
  // card must not skip through slides when that happens. Pausing keeps the
  // time that is left. The reset effect must stay above the timer effect.
  const remaining = useRef(duration);
  const startedAt = useRef(0);
  useEffect(() => {
    remaining.current = duration;
  }, [index, duration]);
  useEffect(() => {
    if (!autoplay || paused) return;
    startedAt.current = performance.now();
    const timer = setTimeout(() => step(1), Math.max(0, remaining.current));
    return () => {
      clearTimeout(timer);
      remaining.current -= performance.now() - startedAt.current;
    };
  }, [index, paused, autoplay, step]);

  const setDragVars = (element, dx) => {
    if (dx === null) {
      for (const name of ["--drag-x", "--drag-blur", "--drag-opacity"]) element.style.removeProperty(name);
      return;
    }
    const { shift, blur, opacity } = dragVisual(dx);
    element.style.setProperty("--drag-x", `${shift}px`);
    element.style.setProperty("--drag-blur", `${blur}px`);
    element.style.setProperty("--drag-opacity", String(opacity));
  };

  const onPointerDown = (event) => {
    if (count < 2 || (event.pointerType === "mouse" && event.button !== 0)) return;
    gesture.current = {
      id: event.pointerId,
      x: event.clientX,
      y: event.clientY,
      t: performance.now(),
      dragging: false,
    };
    if (event.pointerType !== "mouse") setPressed(true);
  };
  const onPointerMove = (event) => {
    const g = gesture.current;
    if (!g || g.id !== event.pointerId) return;
    const dx = event.clientX - g.x;
    if (!g.dragging) {
      // Lazy capture keeps plain clicks on the link working.
      if (Math.abs(dx) < DRAG_START_PX || Math.abs(dx) < Math.abs(event.clientY - g.y)) return;
      g.dragging = true;
      viewport.current.setPointerCapture?.(event.pointerId);
      viewport.current.dataset.dragging = "true";
    }
    setDragVars(viewport.current, dx);
  };
  const endGesture = (event, cancelled) => {
    const g = gesture.current;
    if (!g || g.id !== event.pointerId) return;
    gesture.current = null;
    setPressed(false);
    if (!g.dragging) return;
    suppressClick.current = true;
    setTimeout(() => (suppressClick.current = false), 0);
    delete viewport.current.dataset.dragging;
    setDragVars(viewport.current, null);
    if (!cancelled) {
      const direction = swipeDirection(event.clientX - g.x, performance.now() - g.t);
      if (direction) step(direction);
    }
  };

  const onKeyDown = (event) => {
    const direction = arrowDirection(event.key);
    if (!direction || event.target.closest?.("a")) return;
    event.preventDefault();
    step(direction);
  };

  return jsxs("section", {
    ref: root,
    className: "project-carousel",
    "aria-roledescription": "carousel",
    "aria-label": "Projects and communities",
    tabIndex: 0,
    "data-paused": paused ? "true" : undefined,
    "data-autoplay": autoplay ? "true" : undefined,
    onKeyDown,
    onPointerEnter: (e) => e.pointerType === "mouse" && setHovered(true),
    onPointerLeave: (e) => e.pointerType === "mouse" && setHovered(false),
    onFocus: (e) => setFocused(e.target.matches?.(":focus-visible") ?? false),
    onBlur: () => setFocused(false),
    children: [
      jsx("div", {
        className: "project-carousel__bar",
        children: slides.map((slide, i) =>
          jsx(
            "button",
            {
              type: "button",
              className: "project-carousel__seg",
              "aria-label": `Show ${slide.title}`,
              "aria-current": i === index ? "true" : undefined,
              onClick: () => go(i),
              children: jsx("span", {
                className: "project-carousel__track",
                children: jsx("span", {
                  // The key restarts the fill animation whenever the slide changes.
                  key: `${i}-${i === index ? index : "idle"}`,
                  className: `project-carousel__fill${i < index ? " is-done" : ""}${i === index ? " is-active" : ""}`,
                  style: { "--slide-ms": `${duration}ms` },
                }),
              }),
            },
            slide.id,
          ),
        ),
      }),
      jsx("div", {
        ref: viewport,
        className: "project-carousel__viewport",
        onPointerDown,
        onPointerMove,
        onPointerUp: (e) => endGesture(e, false),
        onPointerCancel: (e) => endGesture(e, true),
        onClickCapture: (e) => {
          if (!suppressClick.current) return;
          e.preventDefault();
          e.stopPropagation();
        },
        children: slides.map((slide, i) =>
          jsx(Slide, { slide, position: slidePosition(i, index, count), index: i, total: count }, slide.id),
        ),
      }),
    ],
  });
}
