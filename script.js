// ─────────────────────────────────────────────────────────────────────────────
// DOM references
// ─────────────────────────────────────────────────────────────────────────────

/** @type {HTMLElement[]} */
const sections = [...document.querySelectorAll('.slide')];

/** @type {HTMLAnchorElement[]} */
const navLinks = [...document.querySelectorAll('.nav-link')];

const jumpButton = document.querySelector('.jump-button');
const presenterToggle = document.querySelector('.presenter-toggle');
const progressBar = document.querySelector('.progress-bar');
const slideIndicatorIndex = document.querySelector('.slide-indicator-index');
const slideIndicatorTitle = document.querySelector('.slide-indicator-title');
const slideIndicatorState = document.querySelector('.slide-indicator-state');

// ─────────────────────────────────────────────────────────────────────────────
// Utilities
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Returns the display title for a slide section.
 * Uses the .eyebrow text when present, otherwise falls back to the element id.
 * @param {HTMLElement} section
 * @returns {string}
 */
function getSectionTitle(section) {
  return section.querySelector('.eyebrow')?.textContent?.trim() ?? section.id;
}

/**
 * Returns the id of the currently active section, or the first section's id.
 * @returns {string}
 */
function getActiveId() {
  return (
    document.querySelector('.nav-link.active')?.getAttribute('href')?.slice(1) ??
    sections[0].id
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Active section management
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Updates all active-state indicators when a new section comes into view.
 * @param {string} id - The id of the newly active section.
 */
function setActiveSection(id) {
  const currentIndex = sections.findIndex((section) => section.id === id);
  const nextSection = sections[currentIndex + 1];

  // Nav links
  navLinks.forEach((link) => {
    link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
  });

  // Section state classes
  sections.forEach((section, index) => {
    section.classList.toggle('is-active', index === currentIndex);
    if (index < currentIndex) {
      section.classList.add('was-viewed');
    }
  });

  // Progress bar
  if (progressBar) {
    progressBar.style.width = `${((currentIndex + 1) / sections.length) * 100}%`;
  }

  // Slide indicator
  if (slideIndicatorIndex) {
    slideIndicatorIndex.textContent = String(currentIndex + 1).padStart(2, '0');
  }
  if (slideIndicatorTitle) {
    slideIndicatorTitle.textContent = getSectionTitle(sections[currentIndex]);
  }
  if (slideIndicatorState) {
    slideIndicatorState.textContent = nextSection ? 'Presentatiemodus' : 'Laatste slide';
  }

  // Jump button label
  const jumpLabel = jumpButton?.querySelector('span');
  if (jumpLabel) {
    jumpLabel.textContent = nextSection ? 'Volgende' : 'Naar boven';
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Intersection Observer
// ─────────────────────────────────────────────────────────────────────────────

const observer = new IntersectionObserver(
  (entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (visible) {
      setActiveSection(visible.target.id);
    }
  },
  { threshold: [0.4, 0.6, 0.8] },
);

sections.forEach((section) => observer.observe(section));

// ─────────────────────────────────────────────────────────────────────────────
// Keyboard & scroll navigation
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Scrolls to the next or previous slide by a given delta (+1 / -1).
 * @param {number} delta
 */
function navigate(delta) {
  const currentIndex = sections.findIndex((section) => section.id === getActiveId());
  const targetIndex = Math.min(Math.max(currentIndex + delta, 0), sections.length - 1);
  sections[targetIndex].scrollIntoView({ behavior: 'smooth', block: 'start' });
}

jumpButton?.addEventListener('click', () => {
  const currentIndex = sections.findIndex((section) => section.id === getActiveId());
  const nextSection = sections[currentIndex + 1];

  if (nextSection) {
    nextSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  } else {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
});

window.addEventListener('keydown', (event) => {
  const { key } = event;

  if (key.toLowerCase() === 'n') {
    event.preventDefault();
    presenterToggle?.click();
    return;
  }

  if (['ArrowRight', 'ArrowDown', 'PageDown', ' '].includes(key)) {
    event.preventDefault();
    navigate(1);
    return;
  }

  if (['ArrowLeft', 'ArrowUp', 'PageUp'].includes(key)) {
    event.preventDefault();
    navigate(-1);
  }
});

// ─────────────────────────────────────────────────────────────────────────────
// Presenter mode toggle
// ─────────────────────────────────────────────────────────────────────────────

presenterToggle?.addEventListener('click', () => {
  const enabled = document.body.classList.toggle('presenter-mode');
  presenterToggle.setAttribute('aria-pressed', String(enabled));
  presenterToggle.textContent = enabled
    ? 'Verberg presentatornotities'
    : 'Toon presentatornotities';
});

// ─────────────────────────────────────────────────────────────────────────────
// Init
// ─────────────────────────────────────────────────────────────────────────────

setActiveSection(sections[0].id);
