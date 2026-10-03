export function observeTooltipPosition(trigger, tooltip, update) {
  let frame = null;
  const schedule = () => {
    if (frame !== null) return;
    frame = requestAnimationFrame(() => {
      frame = null;
      update();
    });
  };
  const observer =
    typeof ResizeObserver === "function" ? new ResizeObserver(schedule) : null;
  if (trigger) observer?.observe(trigger);
  if (tooltip) observer?.observe(tooltip);
  window.addEventListener("resize", schedule);
  document.addEventListener("scroll", schedule, {
    passive: true,
    capture: true,
  });
  window.visualViewport?.addEventListener("resize", schedule);
  window.visualViewport?.addEventListener("scroll", schedule);
  update();
  schedule();
  return () => {
    if (frame !== null) cancelAnimationFrame(frame);
    observer?.disconnect();
    window.removeEventListener("resize", schedule);
    document.removeEventListener("scroll", schedule, { capture: true });
    window.visualViewport?.removeEventListener("resize", schedule);
    window.visualViewport?.removeEventListener("scroll", schedule);
  };
}
