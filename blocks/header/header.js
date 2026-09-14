import { getMetadata, decorateIcons } from '../../scripts/aem.js';
import { migrateTree } from '../utils.js';

// media query match that indicates mobile/tablet width
const isDesktop = window.matchMedia('(min-width: 900px)');

function closeOnEscape(e) {
  if (e.code === 'Escape') {
    const nav = document.getElementById('nav');
    const navSections = nav.querySelector('.nav-sections');
    const navSectionExpanded = navSections.querySelector('[aria-expanded="true"]');
    if (navSectionExpanded && isDesktop.matches) {
      // eslint-disable-next-line no-use-before-define
      toggleAllNavSections(navSections);
      navSectionExpanded.focus();
    } else if (!isDesktop.matches) {
      // eslint-disable-next-line no-use-before-define
      toggleMenu(nav, navSections);
      nav.querySelector('button').focus();
    }
  }
}

function openOnKeydown(e) {
  const focused = document.activeElement;
  const isNavDrop = focused.className === 'nav-drop';
  if (isNavDrop && (e.code === 'Enter' || e.code === 'Space')) {
    const dropExpanded = focused.getAttribute('aria-expanded') === 'true';
    // eslint-disable-next-line no-use-before-define
    toggleAllNavSections(focused.closest('.nav-sections'));
    focused.setAttribute('aria-expanded', dropExpanded ? 'false' : 'true');
  }
}

function focusNavSection() {
  document.activeElement.addEventListener('keydown', openOnKeydown);
}

/**
 * Toggles all nav sections
 * @param {Element} sections The container element
 * @param {Boolean} expanded Whether the element should be expanded or collapsed
 */
function toggleAllNavSections(sections, expanded = false) {
  sections.querySelectorAll('.nav-sections > ul > li').forEach((section) => {
    section.setAttribute('aria-expanded', expanded);
  });
}

function toggleMenu(nav, navSections, forceExpanded = null) {
  const expanded = forceExpanded !== null ? !forceExpanded : nav.getAttribute('aria-expanded') === 'true';
  const button = nav.querySelector('.nav-hamburger button');
  document.body.style.overflowY = (expanded || isDesktop.matches) ? '' : 'hidden';
  nav.setAttribute('aria-expanded', expanded ? 'false' : 'true');
  toggleAllNavSections(navSections, expanded || isDesktop.matches ? 'false' : 'true');
  button.setAttribute('aria-label', expanded ? 'Open navigation' : 'Close navigation');
  // enable nav dropdown keyboard accessibility
  const navDrops = navSections.querySelectorAll('.nav-drop');
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
  // enable menu collapse on escape keypress
  if (!expanded || isDesktop.matches) {
    // collapse menu on escape press
    window.addEventListener('keydown', closeOnEscape);
  } else {
    window.removeEventListener('keydown', closeOnEscape);
  }
}

/**
 * decorates the header, mainly the nav
 * @param {Element} block The header block element
 */
/**Decorate old code13 Sep

export default async function decorate(block) {
  // fetch nav content
  const navMeta = getMetadata('nav');
  const navPath = navMeta ? new URL(navMeta).pathname : '/nav';
  const resp = await fetch(`${navPath}.plain.html`);

  if (resp.ok) {
    const html = await resp.text();

    // decorate nav DOM
    const nav = document.createElement('nav');
    nav.id = 'nav';
    nav.innerHTML = html;

    const classes = ['brand', 'sections', 'tools', 'toc-btn'];
    classes.forEach((c, i) => {
      const section = nav.children[i];
      if (section) section.classList.add(`nav-${c}`);
    });

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

    // toc button for mobile toc view
    const button = nav.querySelector('.nav-toc-btn');
const a_tag = button ? button.querySelector('a') : null;
if (a_tag) {
  a_tag.addEventListener('click', (evt) => {
    evt.preventDefault();
    toggleMenu(nav, navSections);
  });
}
    


    // hamburger for mobile
    const hamburger = document.createElement('div');
    hamburger.classList.add('nav-hamburger');
    hamburger.innerHTML = `<button type="button" aria-controls="nav" aria-label="Open navigation">
        <span class="nav-hamburger-icon"></span>
      </button>`;
    nav.prepend(hamburger);
    nav.setAttribute('aria-expanded', 'false');
    // prevent mobile nav behavior on window resize
    toggleMenu(nav, navSections, isDesktop.matches);
    isDesktop.addEventListener('change', () => toggleMenu(nav, navSections, isDesktop.matches));

    decorateIcons(nav);
    const navWrapper = document.createElement('div');
    navWrapper.className = 'nav-wrapper';
    navWrapper.append(nav);
    block.append(navWrapper);
    migrateTree(isDesktop)
    isDesktop.addEventListener('change', () => migrateTree(isDesktop));
  }
}
**
Belore is new Decorate code- 14 Sep
**/

export default async function decorate(block) {
  // fetch nav content
  const navMeta = getMetadata('nav');
  const navPath = navMeta ? new URL(navMeta).pathname : '/nav';
  const resp = await fetch(`${navPath}.plain.html`);

  if (!resp.ok) return;

  const html = await resp.text();

  const nav = document.createElement('nav');
  nav.id = 'nav';
  nav.innerHTML = html;

  // The AEM Guides nav fragment has a sidenav block, a "main" block
  // (logo + title + links + toc button) and a minitoc block, in no fixed
  // order. Detect each by content instead of by position.
  [...nav.children].forEach((section) => {
    if (section.querySelector('.sidenav')) {
      section.classList.add('nav-sidenav');
    } else if (section.querySelector('.minitoc')) {
      section.classList.add('nav-minitoc');
    } else {
      section.classList.add('nav-main');
    }
  });

  const mainSection = nav.querySelector('.nav-main');
  if (mainSection) {
    // logo
    const logoPara = mainSection.querySelector('picture')?.closest('p');
    if (logoPara) logoPara.classList.add('nav-brand');

    // title (kept as .nav-sections so the toggle logic still works)
    const title = mainSection.querySelector('#title, h3');
if (title) {
  const sectionsWrap = document.createElement('div');
  sectionsWrap.classList.add('nav-sections');
  title.replaceWith(sectionsWrap);
  sectionsWrap.append(title);   // h3 now lives *inside* .nav-sections
}

    // action links + toc button -> nav-tools
    const tools = document.createElement('div');
    tools.classList.add('nav-tools');
    mainSection.querySelectorAll(':scope > p').forEach((p) => {
      if (p.querySelector('picture')) return;          // skip logo
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

  // ensure .nav-sections always exists so the toggle logic never crashes
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

  // toc button for mobile toc view
  const button = nav.querySelector('.nav-toc-btn');
  const aTag = button ? button.querySelector('a') : null;
  if (aTag) {
    aTag.addEventListener('click', (evt) => {
      evt.preventDefault();
      toggleMenu(nav, navSections);
    });
  }

  // hamburger for mobile
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
