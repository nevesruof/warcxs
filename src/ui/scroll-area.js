import { createWheelScroller } from "./smooth-scroll.js";

export function createScrollArea(React) {
  return React.forwardRef(function ScrollArea(
    { as = "div", axis = "y", children, ...props },
    forwardedRef,
  ) {
    const viewport = React.useRef(null);
    const rail = React.useRef(null);
    const thumb = React.useRef(null);
    const geometry = React.useRef({ max: 0, travel: 0 });
    const drag = React.useRef(null);
    const scroller = React.useRef(null);
    const id = React.useId();
    const horizontal = axis === "x";
    const position = horizontal ? "scrollLeft" : "scrollTop";
    const setRef = React.useCallback(
      (node) => {
        viewport.current = node;
        if (typeof forwardedRef === "function") forwardedRef(node);
        else if (forwardedRef) forwardedRef.current = node;
      },
      [forwardedRef],
    );

    React.useLayoutEffect(() => {
      const element = viewport.current;
      const bar = rail.current;
      const handle = thumb.current;
      let frame = 0;
      const paint = () => {
        const { max, travel } = geometry.current;
        const offset = max
          ? Math.min(1, Math.max(0, element[position] / max)) * travel
          : 0;
        handle.style.transform = horizontal
          ? `translateX(${offset}px)`
          : `translateY(${offset}px)`;
        bar.setAttribute("aria-valuenow", Math.round(element[position]));
      };
      const measure = () => {
        frame = 0;
        const visible = horizontal ? element.clientWidth : element.clientHeight;
        const full = horizontal ? element.scrollWidth : element.scrollHeight;
        const length = horizontal ? bar.clientWidth : bar.clientHeight;
        const size = Math.min(
          length,
          Math.max(24, (length * visible) / Math.max(visible, full)),
        );
        geometry.current = {
          max: Math.max(0, full - visible),
          travel: length - size,
        };
        handle.style[horizontal ? "width" : "height"] = `${size}px`;
        bar.dataset.overflow = full > visible + 1 ? "true" : "false";
        bar.setAttribute("aria-valuemax", geometry.current.max);
        paint();
      };
      const queueMeasure = () => {
        if (!frame) frame = requestAnimationFrame(measure);
      };
      const resize = new ResizeObserver(queueMeasure);
      resize.observe(element);
      resize.observe(bar);
      for (const child of element.children) resize.observe(child);
      const mutations = new MutationObserver(queueMeasure);
      mutations.observe(element, {
        childList: true,
        subtree: true,
        characterData: true,
      });
      element.addEventListener("scroll", paint, { passive: true });
      element.addEventListener("load", queueMeasure, true);
      scroller.current = createWheelScroller(element, axis);
      const wheel = (event) => scroller.current.wheel(event);
      if (horizontal)
        element.addEventListener("wheel", wheel, { passive: false });
      measure();
      return () => {
        cancelAnimationFrame(frame);
        scroller.current.cancel();
        resize.disconnect();
        mutations.disconnect();
        element.removeEventListener("scroll", paint);
        element.removeEventListener("load", queueMeasure, true);
        element.removeEventListener("wheel", wheel);
      };
    }, [axis]);

    const pointerDown = (event) => {
      if (!geometry.current.max || event.button !== 0) return;
      event.preventDefault();
      scroller.current.cancel();
      rail.current.setPointerCapture(event.pointerId);
      const coordinate = horizontal ? event.clientX : event.clientY;
      if (event.target !== thumb.current) {
        const bounds = rail.current.getBoundingClientRect();
        const start = horizontal ? bounds.left : bounds.top;
        const length = horizontal
          ? thumb.current.offsetWidth
          : thumb.current.offsetHeight;
        const ratio = Math.min(
          1,
          Math.max(
            0,
            (coordinate - start - length / 2) / geometry.current.travel,
          ),
        );
        viewport.current[position] = ratio * geometry.current.max;
      }
      drag.current = { coordinate, scroll: viewport.current[position] };
    };
    const pointerMove = (event) => {
      if (!drag.current || !geometry.current.travel) return;
      const coordinate = horizontal ? event.clientX : event.clientY;
      viewport.current[position] =
        drag.current.scroll +
        ((coordinate - drag.current.coordinate) * geometry.current.max) /
          geometry.current.travel;
    };
    const keyDown = (event) => {
      const element = viewport.current;
      const page = horizontal ? element.clientWidth : element.clientHeight;
      const changes = {
        ArrowUp: -40,
        ArrowLeft: -40,
        ArrowDown: 40,
        ArrowRight: 40,
        PageUp: -page,
        PageDown: page,
      };
      if (
        !(event.key in changes) &&
        event.key !== "Home" &&
        event.key !== "End"
      )
        return;
      event.preventDefault();
      scroller.current.cancel();
      element[position] =
        event.key === "Home"
          ? 0
          : event.key === "End"
            ? geometry.current.max
            : element[position] + changes[event.key];
    };
    return React.createElement(
      "div",
      { className: "clean-scroll-frame", "data-scroll-axis": axis },
      React.createElement(
        as,
        { ...props, ref: setRef, id, "data-clean-scroll": axis },
        children,
      ),
      React.createElement(
        "div",
        {
          className: "clean-scrollbar",
          ref: rail,
          role: "scrollbar",
          tabIndex: 0,
          "aria-label": horizontal
            ? "Scroll contribution history"
            : "Scroll profile",
          "aria-controls": id,
          "aria-orientation": horizontal ? "horizontal" : "vertical",
          "aria-valuemin": 0,
          "aria-valuemax": 0,
          "aria-valuenow": 0,
          onPointerDown: pointerDown,
          onPointerMove: pointerMove,
          onPointerUp: () => {
            drag.current = null;
          },
          onPointerCancel: () => {
            drag.current = null;
          },
          onKeyDown: keyDown,
        },
        React.createElement("span", {
          className: "clean-scrollbar__thumb",
          ref: thumb,
        }),
      ),
    );
  });
}
