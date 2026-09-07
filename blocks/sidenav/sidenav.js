import { migrateTree } from "../utils.js";
const treeData = [{"displayName":"","url":"","children":[{"displayName":"Welcome","url":"contents/topics/welcome"},{"displayName":"Overview","url":"contents/topics/overview"},{"displayName":"Content","url":"contents/topics/content"}]},{"displayName":"","url":"","children":[{"displayName":"Getting Started","url":"contents/topics/getting-started"},{"displayName":"","url":"","children":[{"displayName":"Introduction","url":"contents/topics/introduction"},{"displayName":"Features","url":"contents/topics/supported-features"},{"displayName":"Support Widgets","url":"contents/topics/support-widgets"},{"displayName":"Built-in fonts","url":"contents/topics/built-in-fonts"},{"displayName":"Target","url":"contents/topics/target"}]},{"displayName":"","url":"","children":[{"displayName":"Installation","url":"contents/topics/installation"},{"displayName":"Hardware requirement for LVGL application","url":"contents/topics/hardware-requirement-for-lvgl-application"},{"displayName":"Windows 10","url":"contents/topics/windows-10"},{"displayName":"Ubuntu 22.04","url":"contents/topics/ubuntu-22-04"},{"displayName":"Offline template","url":"contents/topics/offline-template"},{"displayName":"MacOS","url":"contents/topics/macos"}]},{"displayName":"","url":"","children":[{"displayName":"Quick start","url":"contents/topics/quick-start"},{"displayName":"Create a project based on template","url":"contents/topics/create-a-project-based-on-template"},{"displayName":"Create a project based on local project","url":"contents/topics/create-a-project-based-on-local-project"},{"displayName":"Run simulator","url":"contents/topics/run-simulator"}]}]},{"displayName":"","url":"","children":[{"displayName":"IDE function","url":"contents/topics/ide-function"},{"displayName":"Project management","url":"contents/topics/project-management"}]},{"displayName":"","url":"","children":[{"displayName":"Widget details","url":"contents/topics/widget-details"},{"displayName":"Atrribute","url":"contents/topics/atrribute"}]},{"displayName":"","url":"","children":[{"displayName":"Development","url":"contents/topics/development"},{"displayName":"Debug project","url":"contents/topics/debug-project"}]},{"displayName":"","url":"","children":[{"displayName":"Tutorials","url":"contents/topics/tutorials"},{"displayName":"Interact with peripharals","url":"contents/topics/interact-with-peripharals"}]},{"displayName":"","url":"","children":[{"displayName":"Miscellaneous","url":"contents/topics/miscellaneous"},{"displayName":"Frequently Asked Questions (FAQs)","url":"contents/topics/frequently-asked-questions--faqs-"}]},{"displayName":"Note about the source code in the document","url":"contents/topics/note-about-the-source-code-in-the-document"},{"displayName":"Revision history","url":"contents/topics/revision-history"},{"displayName":"Legal information","url":"contents/topics/legal-information"}]
const mapTitle = "NXP GuiGuider 1.10.0"
const isDesktop = window.matchMedia("(min-width: 900px)");

function expandHeirarchy(element, root) {
  if (element === root) return;
  let parent = element.parentElement;
  parent.classList.remove("closed");
  expandHeirarchy(parent, root);
}

function expandSelection(parent) {
  let queryString = window.location.search;
  let params = new URLSearchParams(queryString);
  let id = params.get("expand");
  let element = document.getElementById(`sidenav-li-${id}`);
  if (!element) return;
  element.classList.add("selected");
  expandHeirarchy(element, parent);
  element.scrollIntoView();
}

function scrollSidenavSelectionToView() {
  const element = document.querySelector('.sidenav-list-item.selected')
  const sidenavContainer = document.getElementsByClassName("sidenav-container")[0];
  if(!element) return
  if (element.offsetTop < sidenavContainer.scrollTop || element.offsetTop + element.offsetHeight > sidenavContainer.scrollTop + sidenavContainer.clientHeight) {
    sidenavContainer.scrollTo({
      top: Math.max(element.offsetTop - 110, 0),
      behavior: 'smooth'
    });
  }
}



function addResizeBar() {
  const sidenavContainer = document.getElementsByClassName("sidenav-container")[0];
  const div = document.createElement("div");
  div.classList.add('sidenav-resize-bar');
  let isResizing = false
  div.addEventListener('mousedown', (evt) => {
    isResizing = true
    document.addEventListener('mousemove', function (event) {
      if (isResizing) {
        let newWidth = event.pageX - sidenavContainer.offsetLeft;
        sidenavContainer.style.width = `${newWidth}px`;
      }
    })
  })
  document.addEventListener('mouseup', function () {
    if (isResizing) {
      isResizing = false;
    }
  })
  sidenavContainer.insertAdjacentElement("afterend", div)
}

function addExpandCollapseButton() {
  const divWrapper = document.createElement("div");
  divWrapper.classList.add('title-close-wrapper')
  const titleSpan = document.createElement("span");
  titleSpan.classList.add('title-span')
  titleSpan.textContent = mapTitle
  const span = document.createElement("span");
  span.classList.add('sidenav-expand-collapse')
  span.classList.add('open')
  const sidenavContainer = document.getElementsByClassName("sidenav-container")[0];
  span.addEventListener('click', () => {
    const isOpen = span.classList.contains('open')
    const sidenavResizer = document.getElementsByClassName("sidenav-resize-bar")[0];
    if(!isOpen) {
      sidenavContainer.classList.remove('collapse-width')
      sidenavResizer.classList.remove('force-hide')
    } else {
      sidenavContainer.classList.add('collapse-width')
      sidenavResizer.classList.add('force-hide')
    }
    span.classList.toggle("open");
  })
  divWrapper.append(titleSpan)
  divWrapper.append(span)
  sidenavContainer.prepend(divWrapper)
}

function generateId(prefix, suffix) {
  if(prefix) {
      return `${prefix}-${suffix}`
  }
  return `${suffix}`
}


window.addEventListener('aem-app-ready', () => {
  scrollSidenavSelectionToView()
})


function createTree(parent, data, prefix, level) {
  const ul = document.createElement("ul");
  ul.classList.add("tree");
  parent.appendChild(ul);
  data.forEach((item, idx) => {
    const li = document.createElement("li");
    const newPrefix = generateId(prefix, level)
    const _id = generateId(newPrefix, idx);
    li.setAttribute("id", `sidenav-li-${_id}`);
    ul.appendChild(li);
    const anchor = document.createElement("a");
    const span = document.createElement("span");
    span.classList.add("chevron-icon-span");
    anchor.textContent = item.displayName;
    anchor.setAttribute("data-li-id", _id);
    anchor.setAttribute("title", item.displayName);
    anchor.setAttribute("aria-label", item.displayName);
    const siteURL =
      window.location.protocol +
      "//" +
      window.location.hostname +
      (window.location.port ? ":" + window.location.port : "");
    if (item.url) {
      let navURL = new URL(item.url, siteURL).href;
      anchor.setAttribute("href", navURL);
      anchor.addEventListener("click", (event) => {
        event.preventDefault();
        onClick(anchor.getAttribute("data-li-id"), navURL);
      });
    }
    li.classList.add("sidenav-list-item");
    li.classList.add("closed");
    if (item.children) {
      li.classList.add("has-children");
      const wrapperSpan = document.createElement("span");
      wrapperSpan.classList.add("chevron-text-wrapper");
      wrapperSpan.appendChild(span);
      wrapperSpan.appendChild(anchor);
      li.appendChild(wrapperSpan);
      createTree(li, item.children, newPrefix, idx);
    } else {
      li.appendChild(anchor);
    }
  });
}

function onClick(id, navURL) {
  const url = new URL(navURL);
  url.searchParams.set("expand", id); // set the query parameter
  window.location.href = url.toString(); // navigate
}

// Get the treeview element and create the tree
const treeview = document.getElementsByClassName("sidenav")[0];
addExpandCollapseButton();
createTree(treeview, treeData, '', '');
migrateTree(isDesktop);
addResizeBar(treeview);
isDesktop.addEventListener("change", () => migrateTree(isDesktop));
expandSelection(treeview);

// Add click event listener to each span element
treeview.querySelectorAll("span").forEach((span) => {
  span.addEventListener("click", (event) => {
    // Toggle the "closed" class on the parent li element
    event.currentTarget.parentNode.classList.toggle("closed");
  });
});