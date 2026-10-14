import test from "node:test";
import assert from "node:assert/strict";
import {
  wrap,
  slidePosition,
  dragVisual,
  swipeDirection,
  arrowDirection,
  MAX_SHIFT,
} from "../src/ui/carousel-state.js";
import { PROJECT_SLIDES, SLIDE_DURATION_MS } from "../src/config/projects.js";

test("wrap and slide positions are circular", () => {
  assert.equal(wrap(-1, 3), 2);
  assert.equal(wrap(3, 3), 0);
  assert.deepEqual([0, 1, 2].map((i) => slidePosition(i, 0, 3)), ["active", "after", "before"]);
  // From the last slide the first one is "next", so it enters from the right.
  assert.deepEqual([0, 1, 2].map((i) => slidePosition(i, 2, 3)), ["after", "before", "active"]);
});

test("dragging has resistance, never exceeds the resting offset and fades", () => {
  assert.deepEqual(dragVisual(0), { shift: 0, blur: 0, opacity: 1 });
  assert.equal(dragVisual(-500).shift, -MAX_SHIFT);
  assert.equal(dragVisual(500).shift, MAX_SHIFT);
  assert.ok(dragVisual(40).blur > 0 && dragVisual(40).opacity < 1);
});

test("swipes need distance or speed and map to a direction", () => {
  assert.equal(swipeDirection(-10, 500), 0);
  assert.equal(swipeDirection(-80, 500), 1);
  assert.equal(swipeDirection(80, 500), -1);
  assert.equal(swipeDirection(-30, 40), 1); // short but fast flick
  assert.equal(swipeDirection(-5, 1), 0); // tap jitter
  assert.equal(arrowDirection("ArrowRight"), 1);
  assert.equal(arrowDirection("ArrowLeft"), -1);
  assert.equal(arrowDirection("a"), 0);
});

test("project slides are valid: unique ids, https links only", () => {
  assert.ok(SLIDE_DURATION_MS >= 3000);
  assert.equal(new Set(PROJECT_SLIDES.map((s) => s.id)).size, PROJECT_SLIDES.length);
  for (const slide of PROJECT_SLIDES) {
    assert.ok(slide.title && slide.blurb && slide.eyebrow);
    if (slide.link) assert.equal(new URL(slide.link.href).protocol, "https:");
  }
});
