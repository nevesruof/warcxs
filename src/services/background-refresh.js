export function startBackgroundRefresh(refresh, interval = 15000) {
  let timer;
  const stop = () => {
    clearInterval(timer);
    timer = null;
  };
  const start = () => {
    stop();
    if (document.hidden) return;
    refresh();
    timer = setInterval(refresh, interval);
  };
  document.addEventListener("visibilitychange", start);
  window.addEventListener("online", start);
  window.addEventListener("pageshow", start);
  window.addEventListener("pagehide", stop);
  start();
  return () => {
    stop();
    document.removeEventListener("visibilitychange", start);
    window.removeEventListener("online", start);
    window.removeEventListener("pageshow", start);
    window.removeEventListener("pagehide", stop);
  };
}
