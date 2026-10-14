// Pure helpers for the projects carousel (no DOM, easy to test).

export const wrap = (index, count) => ((index % count) + count) % count;

// Where a slide sits relative to the active one. With a circular list every
// other slide is either the previous or the next one, so wrapping from the
// last slide to the first still enters from the right.
export function slidePosition(index, active, count) {
  if (index === active) return "active";
  return wrap(index - active, count) === 1 ? "after" : "before";
}

export const MAX_SHIFT = 40; // px, must match the CSS offset of before/after
const DRAG_RESISTANCE = 0.5;
export const SWIPE_DISTANCE = 48; // px
export const SWIPE_VELOCITY = 0.4; // px per ms

// Visual state of the active slide while a finger/mouse drags it.
export function dragVisual(dx) {
  const shift = Math.max(-MAX_SHIFT, Math.min(MAX_SHIFT, dx * DRAG_RESISTANCE));
  const ratio = Math.abs(shift) / MAX_SHIFT;
  return { shift, blur: ratio * 6, opacity: 1 - ratio * 0.5 };
}

// -1 = previous, 1 = next, 0 = snap back.
export function swipeDirection(dx, elapsedMs) {
  const fast = Math.abs(dx) / Math.max(elapsedMs, 1) > SWIPE_VELOCITY && Math.abs(dx) > 20;
  if (Math.abs(dx) < SWIPE_DISTANCE && !fast) return 0;
  return dx < 0 ? 1 : -1;
}

export function arrowDirection(key) {
  return key === "ArrowRight" ? 1 : key === "ArrowLeft" ? -1 : 0;
}
