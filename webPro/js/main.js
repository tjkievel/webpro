const navigationLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('main section[id]');
const currentYear = document.querySelector('#current-year');

function setActiveNavigation(sectionId) {
  navigationLinks.forEach((link) => {
    const isCurrent = link.getAttribute('href') === `#${sectionId}`;

    link.classList.toggle('is-active', isCurrent);
    if (isCurrent) {
      link.setAttribute('aria-current', 'page');
    } else {
      link.removeAttribute('aria-current');
    }
  });
}

if (sections.length > 0 && 'IntersectionObserver' in window) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      const visibleSection = entries
        .filter((entry) => entry.isIntersecting)
        .sort((first, second) => second.intersectionRatio - first.intersectionRatio)[0];

      if (visibleSection) {
        setActiveNavigation(visibleSection.target.id);
      }
    },
    { rootMargin: '-20% 0px -65% 0px', threshold: [0, 0.2, 0.5] },
  );

  sections.forEach((section) => sectionObserver.observe(section));
}

if (currentYear) {
  currentYear.textContent = String(new Date().getFullYear());
}
