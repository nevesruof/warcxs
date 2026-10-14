// Slides of the "projects" card (src/ui/projects-carousel.js), in display order.
// kind: "project" and "community" show a logo (or a monogram tile when there
// is no logo), "notice" shows an alert sign. `link` is optional: add an https
// URL to get a button, leave it null to show no button.
export const SLIDE_DURATION_MS = 6000;

export const PROJECT_SLIDES = [
  {
    id: "artifact-x",
    kind: "project",
    eyebrow: "Current Project",
    title: "Artifact X",
    blurb: "An all-in-one ScreenShare tool equipped with the commonly used tools.",
    logo: "/assets/artifact-logo.webp",
    link: {
      href: "https://github.com/iTakeDev/Artifact-X/releases/tag/ScreenShare",
      label: "open on github",
    },
  },
  {
    id: "fm-society",
    kind: "community",
    eyebrow: "Discord Community",
    title: "FM | Society",
    blurb: "A Discord community I'm part of.",
    monogram: "FM",
    // Put the invite here, e.g. { href: "https://discord.gg/xxxx", label: "join on discord" }
    link: null,
  },
  {
    id: "notice",
    kind: "notice",
    eyebrow: "Heads up",
    title: "Taking a step back",
    blurb: "I'm no longer taking part in or starting new projects. I want to enjoy my life.",
    link: null,
  },
];
