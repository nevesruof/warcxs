import test from "node:test";
import assert from "node:assert/strict";
import { startBackgroundRefresh } from "../src/services/background-refresh.js";
import { observeTooltipPosition } from "../src/ui/tooltip-position.js";
import { createActivityHistory } from "../src/services/activity-history.js";

function globalValue(t, key, value) {
  const previous = Object.getOwnPropertyDescriptor(globalThis, key);
  Object.defineProperty(globalThis, key, {
    value,
    configurable: true,
    writable: true,
  });
  t.after(() => {
    if (previous) Object.defineProperty(globalThis, key, previous);
    else delete globalThis[key];
  });
}

test("Background refresh pauses when hidden and restarts after browser back navigation, with no duplicate timers", (t) => {
  const document = new EventTarget();
  document.hidden = false;
  const window = new EventTarget();
  const timers = new Map();
  let id = 0;
  let calls = 0;
  t.mock.method(globalThis, "setInterval", (fn) => {
    timers.set(++id, fn);
    return id;
  });
  t.mock.method(globalThis, "clearInterval", (key) => timers.delete(key));
  globalValue(t, "document", document);
  globalValue(t, "window", window);
  const stop = startBackgroundRefresh(() => calls++);
  assert.equal(calls, 1);
  assert.equal(timers.size, 1);
  window.dispatchEvent(new Event("pageshow"));
  assert.equal(timers.size, 1);
  document.hidden = true;
  document.dispatchEvent(new Event("visibilitychange"));
  assert.equal(timers.size, 0);
  document.hidden = false;
  document.dispatchEvent(new Event("visibilitychange"));
  assert.equal(timers.size, 1);
  window.dispatchEvent(new Event("pagehide"));
  assert.equal(timers.size, 0);
  window.dispatchEvent(new Event("pageshow"));
  assert.equal(timers.size, 1);
  stop();
  window.dispatchEvent(new Event("online"));
  assert.equal(timers.size, 0);
});

test("Tooltip positions update on scroll/resize, coalesce events and consume no animation frames while idle", (t) => {
  const document = new EventTarget();
  const window = new EventTarget();
  window.visualViewport = new EventTarget();
  let frame;
  let updates = 0;
  let disconnected = false;
  class Observer {
    constructor(schedule) {
      this.schedule = schedule;
    }
    observe() {}
    disconnect() {
      disconnected = true;
    }
  }
  globalValue(t, "document", document);
  globalValue(t, "window", window);
  globalValue(t, "ResizeObserver", Observer);
  globalValue(t, "requestAnimationFrame", (fn) => {
    frame = fn;
    return 1;
  });
  globalValue(t, "cancelAnimationFrame", () => {
    frame = null;
  });
  const flush = () => {
    const fn = frame;
    frame = null;
    fn();
  };
  const stop = observeTooltipPosition({}, {}, () => updates++);
  flush();
  assert.equal(frame, null, "No perpetual requestAnimationFrame loop");
  assert.equal(updates, 2);
  document.dispatchEvent(new Event("scroll"));
  window.dispatchEvent(new Event("resize"));
  flush();
  assert.equal(updates, 3);
  assert.equal(frame, null);
  stop();
  assert.equal(disconnected, true);
  document.dispatchEvent(new Event("scroll"));
  assert.equal(frame, null);
});

test("Unchanged history does not write storage or rerender when only the API timestamp changes", async () => {
  let writes = 0;
  let publishes = 0;
  let generatedAt = 1;
  const history = createActivityHistory(
    async () =>
      Response.json({
        userId: "1239908273885286546",
        source: "bot",
        generatedAt: generatedAt++,
        recentActivities: [{ id: "game", name: "Minecraft", lastSeenAt: 1000 }],
        activities: [],
        recentSongs: [],
      }),
    { getItem: () => null, setItem: () => writes++ },
    () => publishes++,
  );
  await history.refresh(true);
  await history.refresh(true);
  assert.equal(writes, 1);
  assert.equal(publishes, 1);
});

test("Snapshot writes are batched and flush the latest data before navigation", async (t) => {
  const window = new EventTarget();
  const timers = new Map();
  const saved = [];
  let id = 0;
  globalValue(t, "window", window);
  globalValue(t, "localStorage", {
    setItem: (key, value) => saved.push(JSON.parse(value)),
  });
  t.mock.method(globalThis, "setTimeout", (fn) => {
    timers.set(++id, fn);
    return id;
  });
  t.mock.method(globalThis, "clearTimeout", (key) => timers.delete(key));
  const { saveSnapshot } =
    await import("../src/services/snapshot-storage.js?test=resources");
  saveSnapshot({ value: 1 }, true);
  saveSnapshot({ value: 2 });
  saveSnapshot({ value: 3 });
  assert.equal(saved.length, 1);
  assert.equal(timers.size, 1);
  [...timers.values()][0]();
  assert.deepEqual(saved, [{ value: 1 }, { value: 3 }]);
  saveSnapshot({ value: 4 });
  window.dispatchEvent(new Event("pagehide"));
  assert.deepEqual(saved.at(-1), { value: 4 });
  assert.equal(timers.size, 0);
});
