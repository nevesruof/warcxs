export function createWheelScroller(
  element,
  axis = "y",
  {
    requestFrame = requestAnimationFrame,
    cancelFrame = cancelAnimationFrame,
    reducedMotion = () =>
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    onIdle = () => {},
  } = {},
) {
  const position = axis === "x" ? "scrollLeft" : "scrollTop";
  const viewport = axis === "x" ? "clientWidth" : "clientHeight";
  const extent = axis === "x" ? "scrollWidth" : "scrollHeight";
  let frame = 0;
  let target = 0;
  let previousTime;

  function cancel() {
    cancelFrame(frame);
    frame = 0;
    previousTime = undefined;
    onIdle();
  }

  function move(value) {
    if (element.scrollTo)
      element.scrollTo({
        [axis === "x" ? "left" : "top"]: value,
        behavior: "instant",
      });
    else element[position] = value;
  }

  function animate(time) {
    const elapsed =
      previousTime === undefined ? 16 : Math.min(48, time - previousTime);
    previousTime = time;
    const distance = target - element[position];
    if (Math.abs(distance) < 0.5) {
      move(target);
      cancel();
      return;
    }
    move(element[position] + distance * (1 - Math.exp(-elapsed / 55)));
    frame = requestFrame(animate);
  }

  function wheel(event) {
    if (
      event.ctrlKey ||
      event.metaKey ||
      event.defaultPrevented ||
      (axis === "y" && event.shiftKey)
    )
      return false;
    const delta =
      axis === "x"
        ? Math.abs(event.deltaX) > Math.abs(event.deltaY)
          ? event.deltaX
          : event.deltaY
        : event.deltaY;
    const scale =
      event.deltaMode === 1
        ? 16
        : event.deltaMode === 2
          ? element[viewport]
          : 1;
    const current = frame ? target : element[position];
    const max = Math.max(0, element[extent] - element[viewport]);
    const next = Math.min(max, Math.max(0, current + delta * scale));
    if (!delta || next === current) return false;
    // Precision touchpads already supply smooth motion; retain it for vertical scrolling.
    if (axis === "y" && event.deltaMode === 0 && Math.abs(delta) < 40 && !frame)
      return false;
    event.preventDefault();
    target = next;
    if (reducedMotion()) {
      cancel();
      move(target);
    } else if (!frame) frame = requestFrame(animate);
    return true;
  }
  return { wheel, cancel };
}

export function installPageWheelSmoothing() {
  const scrollers = new WeakMap();
  const active = new Set();
  const cancel = () => {
    active.forEach((scroller) => scroller.cancel());
  };
  const wheel = (event) => {
    if (
      event.defaultPrevented ||
      event.target.closest?.(
        'input, textarea, select, [contenteditable="true"]',
      )
    )
      return;
    let element = event.target instanceof Element ? event.target : null;
    const root = document.scrollingElement;
    while (element) {
      const overflow =
        element === root ||
        /auto|scroll/.test(getComputedStyle(element).overflowY);
      if (overflow && element.scrollHeight > element.clientHeight + 1) {
        let scroller = scrollers.get(element);
        if (!scroller) {
          scroller = createWheelScroller(element, "y", {
            onIdle: () => active.delete(scroller),
          });
          scrollers.set(element, scroller);
        }
        active.add(scroller);
        if (scroller.wheel(event)) return;
        active.delete(scroller);
      }
      element = element.parentElement;
    }
  };
  document.addEventListener("wheel", wheel, { passive: false });
  document.addEventListener("pointerdown", cancel, { passive: true });
  document.addEventListener("keydown", cancel);
  window.addEventListener("pagehide", cancel);
  return () => {
    cancel();
    document.removeEventListener("wheel", wheel);
    document.removeEventListener("pointerdown", cancel);
    document.removeEventListener("keydown", cancel);
    window.removeEventListener("pagehide", cancel);
  };
}
