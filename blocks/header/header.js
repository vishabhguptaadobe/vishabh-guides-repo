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

export default async function decorate(block) {
  const navMeta = getMetadata('nav');
  const navPath = navMeta ? new URL(navMeta).pathname : '/nav';
  const resp = await fetch(`${navPath}.plain.html`);
  if (!resp.ok) return;

  const html = await resp.text();
  const nav = document.createElement('nav');
  nav.id = 'nav';
  nav.innerHTML = html;

  // Content-aware section detection (works with the DITA-generated nav)
  [...nav.children].forEach((section) => {
    if (section.querySelector('.sidenav')) section.classList.add('nav-sidenav');
    else if (section.querySelector('.minitoc')) section.classList.add('nav-minitoc');
    else section.classList.add('nav-main');
  });

  const mainSection = nav.querySelector('.nav-main');
  if (mainSection) {
    const logoPara = mainSection.querySelector('picture')?.closest('p');
    if (logoPara) logoPara.classList.add('nav-brand');

    // wrap the h3 in a real .nav-sections container (migrateTree needs it)
    const title = mainSection.querySelector('#title, h3');
    if (title) {
      const sectionsWrap = document.createElement('div');
      sectionsWrap.classList.add('nav-sections');
      title.replaceWith(sectionsWrap);
      sectionsWrap.append(title);
    }

    const tools = document.createElement('div');
    tools.classList.add('nav-tools');
    mainSection.querySelectorAll(':scope > p').forEach((p) => {
      if (p.querySelector('picture')) return;
      if (p.closest('.header-button-group')) return;
      tools.append(p);
    });
    const btnGroup = mainSection.querySelector('.header-button-group');
    if (btnGroup) {
      btnGroup.classList.add('nav-toc-btn');
      tools.append(btnGroup);
    }
    mainSection.append(tools);
  }

  // Force the Adobe logo (survives every Guides republish)
  const brandImg = nav.querySelector('.nav-brand img, img');
  if (brandImg) {
    brandImg.src = '/blocks/header/adobe-red-logo.svg';
    brandImg.removeAttribute('srcset');
    brandImg.setAttribute('alt', 'Adobe');
    nav.querySelectorAll('picture source').forEach((s) => s.remove());
  }
  if (brandImg && !nav.querySelector('.nav-brand .brand-text')) {
    const label = document.createElement('span');
    label.className = 'brand-text';
    label.textContent = 'Vishabh Docs';
    const picture = brandImg.closest('picture') || brandImg;
    picture.insertAdjacentElement('afterend', label);
  }

  let navSections = nav.querySelector('.nav-sections');
  if (!navSections) {
    navSections = document.createElement('div');
    navSections.classList.add('nav-sections');
    (mainSection || nav).append(navSections);
  }

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

  const tocButton = nav.querySelector('.nav-toc-btn');
  const tocAnchor = tocButton ? tocButton.querySelector('a') : null;
  if (tocAnchor) {
    tocAnchor.addEventListener('click', (evt) => {
      evt.preventDefault();
      toggleMenu(nav, navSections);
    });
  }

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
