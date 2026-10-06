import test from "node:test";
import assert from "node:assert/strict";
import { createWheelScroller } from "../src/ui/smooth-scroll.js";

function fixture(axis, reduced = false) {
  let frameId = 0;
  let time = 0;
  const frames = new Map();
  const element = {
    scrollLeft: 300,
    scrollTop: 0,
    clientWidth: 200,
    scrollWidth: 500,
    clientHeight: 100,
    scrollHeight: 500,
  };
  const scroller = createWheelScroller(element, axis, {
    reducedMotion: () => reduced,
    requestFrame: (callback) => {
      const id = ++frameId;
      frames.set(id, callback);
      return id;
    },
    cancelFrame: (id) => frames.delete(id),
  });
  const event = (deltaY, options = {}) => ({
    deltaX: 0,
    deltaY,
    deltaMode: 0,
    preventDefault() {
      this.defaultPrevented = true;
    },
    ...options,
  });
  return {
    element,
    scroller,
    frames,
    event,
    animate: () => {
      for (let i = 0; frames.size && i < 100; i++) {
        const next = [...frames][0];
        frames.delete(next[0]);
        next[1]((time += 16));
      }
      assert.equal(
        frames.size,
        0,
        "Scrolling must stop requesting frames once settled",
      );
    },
  };
}

test("GitHub wheel movement follows both directions and clamps at the beginning and latest week", () => {
  const f = fixture("x");
  assert.equal(f.scroller.wheel(f.event(-140)), true);
  assert.equal(
    f.element.scrollLeft,
    300,
    "Wheel motion begins through animation",
  );
  f.animate();
  assert.equal(f.element.scrollLeft, 160);
  f.scroller.wheel(f.event(140));
  f.animate();
  assert.equal(f.element.scrollLeft, 300);
  const atEnd = f.event(140);
  assert.equal(f.scroller.wheel(atEnd), false);
  assert.equal(
    atEnd.defaultPrevented,
    undefined,
    "Page scroll remains available at the graph boundary",
  );
  f.scroller.wheel(f.event(-1000));
  f.animate();
  assert.equal(f.element.scrollLeft, 0);
});

test("Fast successive wheel events accumulate smoothly, while zoom and precision touchpads retain native behavior", () => {
  const f = fixture("y");
  f.scroller.wheel(f.event(100));
  f.scroller.wheel(f.event(100));
  f.animate();
  assert.equal(f.element.scrollTop, 200);
  assert.equal(f.scroller.wheel(f.event(100, { ctrlKey: true })), false);
  assert.equal(f.scroller.wheel(f.event(5)), false);
  f.scroller.wheel(f.event(100));
  f.scroller.cancel();
  assert.equal(f.frames.size, 0);
});

test("Reduced motion scrolls directly without requesting frames", () => {
  const f = fixture("x", true);
  f.scroller.wheel(f.event(-100));
  assert.equal(f.element.scrollLeft, 200);
  assert.equal(f.frames.size, 0);
});
