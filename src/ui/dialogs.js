export function manageDialogs() {
  let previousFocus;
  const observer = new MutationObserver(() => {
    const dialog = [...document.querySelectorAll('[role="dialog"]')].at(-1);
    if (!dialog || dialog.dataset.focusManaged) return;
    previousFocus = document.activeElement;
    dialog.dataset.focusManaged = 'true';
    dialog.querySelector('button[aria-label^="Close"]')?.focus({ preventScroll: true });
  });
  observer.observe(document.body, { childList: true, subtree: true });
  document.addEventListener('keydown', (event) => {
    const dialog = [...document.querySelectorAll('[role="dialog"]')].at(-1);
    if (!dialog) return;
    if (event.key === 'Escape') {
      dialog.querySelector('button[aria-label^="Close"]')?.click();
      previousFocus?.focus({ preventScroll: true });
    }
    if (event.key !== 'Tab') return;
    const elements = [
      ...dialog.querySelectorAll('button:not([disabled]), a[href], input, [tabindex="0"]'),
    ].filter((element) => element.getClientRects().length);
    const first = elements[0];
    const last = elements.at(-1);
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last?.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first?.focus();
    }
  });
}
