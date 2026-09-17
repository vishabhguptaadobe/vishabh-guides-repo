import { getMetadata, decorateIcons } from '../../scripts/aem.js';
import { migrateTree } from '../utils.js';

const isDesktop = window.matchMedia('(min-width: 900px)');

function closeOnEscape(e) {
  if (e.code === 'Escape') {
    const nav = document.getElementById('nav');
    const navSections = nav.querySelector('.nav-sections');
    const navSectionExpanded = navSections?.querySelector('[aria-expanded="true"]');
    if (navSectionExpanded && isDesktop.matches) {
      toggleAllNavSections(navSections);
      navSectionExpanded.focus();
    } else if (!isDesktop.matches) {
      toggleMenu(nav, navSections);
      nav.querySelector('button')?.focus();
    }
  }
}

function openOnKeydown(e) {
  const focused = document.activeElement;
  const isNavDrop = focused.className === 'nav-drop';
  if (isNavDrop && (e.code === 'Enter' || e.code === 'Space')) {
    const dropExpanded = focused.getAttribute('aria-expanded') === 'true';
    toggleAllNavSections(focused.closest('.nav-sections'));
    focused.setAttribute('aria-expanded', dropExpanded ? 'false' : 'true');
  }
}

function focusNavSection() {
  document.activeElement.addEventListener('keydown', openOnKeydown);
}

function toggleAllNavSections(sections, expanded = false) {
  sections?.querySelectorAll('.nav-sections > ul > li').forEach((section) => {
    section.setAttribute('aria-expanded', expanded);
  });
}

function toggleMenu(nav, navSections, forceExpanded = null) {
  const expanded = forceExpanded !== null ? !forceExpanded : nav.getAttribute('aria-expanded') === 'true';
  const button = nav.querySelector('.nav-hamburger button');
  document.body.style.overflowY = (expanded || isDesktop.matches) ? '' : 'hidden';
  nav.setAttribute('aria-expanded', expanded ? 'false' : 'true');
  toggleAllNavSections(navSections, expanded || isDesktop.matches ? 'false' : 'true');
  if (button) button.setAttribute('aria-label', expanded ? 'Open navigation' : 'Close navigation');
  const navDrops = navSections ? navSections.querySelectorAll('.nav-drop') : [];
  if (isDesktop.matches) {
    navDrops.forEach((drop) => {
      if (!drop.hasAttribute('tabindex')) {
        drop.setAttribute('role', 'button');
        drop.setAttribute('tabindex', 0);
        drop.addEventListener('focus', focusNavSection);
      }
    });
  } else {
    navDrops.forEach((drop) => {
      drop.removeAttribute('role');
      drop.removeAttribute('tabindex');
      drop.removeEventListener('focus', focusNavSection);
    });
  }
  if (!expanded || isDesktop.matches) {
    window.addEventListener('keydown', closeOnEscape);
  } else {
    window.removeEventListener('keydown', closeOnEscape);
  }
}

/**
 * Tag each top-level div of the DITA-generated nav fragment by WHAT IT CONTAINS,
 * not by its position. The publish can change the number/order of these divs, so
 * position-based tagging (child 0 = brand, etc.) is fragile. Content-based tagging
 * keeps the logo, title, tools, and toc-button correctly identified across republishes.
 * @param {Element} nav The <nav> element
 */
function tagNavSections(nav) {
  [...nav.children].forEach((section) => {
    if (
      section.classList.contains('nav-brand')
      || section.classList.contains('nav-sections')
      || section.classList.contains('nav-tools')
      || section.classList.contains('nav-toc-btn')
    ) return;

    if (section.querySelector('img, picture')) {
      section.classList.add('nav-brand');
    } else if (section.querySelector('#toc-mob-button')) {
      // the mobile "Table of content" button group — check before .nav-tools,
      // since it is also a .header-button-group
      section.classList.add('nav-toc-btn');
    } else if (section.querySelector('.search, .header-button-group')) {
      section.classList.add('nav-tools');
    } else {
      // whatever is left (the title / menu list) is the sections slot
      section.classList.add('nav-sections');
    }
  });
}

export default async function decorate(block) {
  const navMeta = getMetadata('nav');
  const navPath = navMeta ? new URL(navMeta).pathname : '/nav';
  const resp = await fetch(`${navPath}.plain.html`);
  if (!resp.ok) return;

  const html = await resp.text();
  const nav = document.createElement('nav');
  nav.id = 'nav';
  nav.innerHTML = html;

  // 1) Identify the nav slots by content (order-independent).
  tagNavSections(nav);

  // 2) Logo: force our repo asset and guarantee its container is the brand slot,
  //    so the CSS that sizes/positions the logo actually matches. The DITA nav
  //    ships a bare <img> (no <picture>), so match the <img> directly.
  const brandImg = nav.querySelector('.nav-brand img, img');
  if (brandImg) {
    brandImg.src = '/blocks/header/logo.svg';
    brandImg.removeAttribute('srcset');
    brandImg.setAttribute('alt', 'CompanyLogo');
    nav.querySelectorAll('picture source').forEach((s) => s.remove());

    // Ensure the logo's own container carries .nav-brand even if tagging missed it.
    const brandContainer = brandImg.closest('.nav-brand') || brandImg.closest('div') || brandImg.parentElement;
    if (brandContainer) {
      brandContainer.classList.add('nav-brand');
      // Add the brand label once, right after the logo.
      if (!brandContainer.querySelector('.brand-text')) {
        const label = document.createElement('span');
        label.className = 'brand-text';
        label.textContent = 'Vishabh Docs';
        (brandImg.closest('picture') || brandImg).insertAdjacentElement('afterend', label);
      }
    }
  }

  // 3) Wire up sections (dropdowns), if any.
  const navSections = nav.querySelector('.nav-sections');
  if (navSections) {
    navSections.querySelectorAll(':scope > ul > li').forEach((navSection) => {
      if (navSection.querySelector('ul')) navSection.classList.add('nav-drop');
      navSection.addEventListener('click', () => {
        if (isDesktop.matches) {
          const expanded = navSection.getAttribute('aria-expanded') === 'true';
          toggleAllNavSections(navSections);
          navSection.setAttribute('aria-expanded', expanded ? 'false' : 'true');
        }
      });
    });
  }

  // 4) Mobile "Table of content" toggle.
  const tocButton = nav.querySelector('.nav-toc-btn');
  const tocAnchor = tocButton ? tocButton.querySelector('a') : null;
  if (tocAnchor) {
    tocAnchor.addEventListener('click', (evt) => {
      evt.preventDefault();
      toggleMenu(nav, navSections);
    });
  }

  // 5) Hamburger for mobile.
  const hamburger = document.createElement('div');
  hamburger.classList.add('nav-hamburger');
  hamburger.innerHTML = `<button type="button" aria-controls="nav" aria-label="Open navigation">
      <span class="nav-hamburger-icon"></span>
    </button>`;
  nav.prepend(hamburger);
  nav.setAttribute('aria-expanded', 'false');
  toggleMenu(nav, navSections, isDesktop.matches);
  isDesktop.addEventListener('change', () => toggleMenu(nav, navSections, isDesktop.matches));

  decorateIcons(nav);
  const navWrapper = document.createElement('div');
  navWrapper.className = 'nav-wrapper';
  navWrapper.append(nav);
  block.append(navWrapper);
  migrateTree(isDesktop);
  isDesktop.addEventListener('change', () => migrateTree(isDesktop));
}
