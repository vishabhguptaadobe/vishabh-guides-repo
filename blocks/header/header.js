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
 * Build the header slots from the actual DITA nav fragment.
 * The fragment ships as three top-level <div>s:
 *   1) a wrapper containing .sidenav   (left TOC placeholder)
 *   2) one combined content div: <p><img></p>, <p>Contact us</p>, <p>Sign up</p>,
 *      and a .header-button-group holding the mobile "Table of content" button
 *   3) a wrapper containing .minitoc   (right "in this article" placeholder)
 * So we can't tag whole divs — we pull the pieces out of the content div and
 * place them into real brand / tools / toc-btn slots. Content-driven, so it
 * survives Guides republishes.
 * @param {Element} nav The <nav> element
 */
function tagNavSections(nav) {
  // hide the sidenav / minitoc placeholders (migrateTree relocates their contents)
  nav.querySelectorAll(':scope > div').forEach((div) => {
    if (div.querySelector('.sidenav, .minitoc')) div.classList.add('nav-placeholder');
  });

  // the content div is the one holding the logo image
  const content = nav.querySelector(':scope > div:has(img, picture)')
    || [...nav.children].find((d) => d.querySelector('img, picture'));
  if (!content) return;
  content.classList.add('nav-brand');

  // move the mobile "Table of content" button group into its own slot
  const tocGroup = content.querySelector('.header-button-group');
  if (tocGroup) {
    tocGroup.classList.add('nav-toc-btn');
    nav.append(tocGroup);
  }

  // move the link paragraphs (Contact us / Sign up) into a tools slot,
  // leaving the logo paragraph behind in the brand slot
  const tools = document.createElement('div');
  tools.classList.add('nav-tools');
  content.querySelectorAll(':scope > p').forEach((p) => {
    if (p.querySelector('img, picture')) return;
    tools.append(p);
  });
  if (tools.children.length) nav.append(tools);
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

  // 1) Build brand / tools / toc-btn slots from the fragment.
  tagNavSections(nav);

  // migrateTree expects a .nav-sections container; add an empty one if absent.
  if (!nav.querySelector('.nav-sections')) {
    const emptySections = document.createElement('div');
    emptySections.classList.add('nav-sections');
    nav.append(emptySections);
  }

  // 2) Logo: force our repo asset (the DITA src often fails to resolve),
  //    and add the "Vishabh Docs" label beside it — once.
  const brandImg = nav.querySelector('.nav-brand img, img');
  if (brandImg) {
    brandImg.src = '/blocks/header/logo.svg';
    brandImg.removeAttribute('srcset');
    brandImg.setAttribute('alt', 'CompanyLogo');
    nav.querySelectorAll('picture source').forEach((s) => s.remove());

    const brandContainer = brandImg.closest('.nav-brand') || brandImg.closest('div') || brandImg.parentElement;
    if (brandContainer) {
      brandContainer.classList.add('nav-brand');
      if (!brandContainer.querySelector('.brand-text')) {
        const label = document.createElement('span');
        label.className = 'brand-text';
        label.textContent = 'Vishabh Docs';
        const anchor = brandImg.closest('p') || brandImg.closest('picture') || brandImg;
        anchor.insertAdjacentElement('afterend', label);
      }
    }
  }

  // 3) Section dropdowns (if the sections slot ever contains a menu).
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
