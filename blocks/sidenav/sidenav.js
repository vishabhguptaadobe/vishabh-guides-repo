import { migrateTree } from "../utils.js";
const treeData = [{"displayName":"Introduction","url":"","children":[{"displayName":"Intended use","url":"contents/topics/intended-use"},{"displayName":"General safety notices","url":"contents/topics/general-safety-notices"}]},{"displayName":"Description","url":"","children":[{"displayName":"Overview of components","url":"contents/topics/overview-of-components"},{"displayName":"Dimensions","url":"contents/topics/dimensions"},{"displayName":"Electrical diagrams","url":"contents/topics/electric-diagram"},{"displayName":"Electrical connections","url":"contents/topics/electric-connections"},{"displayName":"Pneumatic diagram","url":"contents/topics/pneumatic-diagram"},{"displayName":"Pneumatic connections","url":"contents/topics/pneumatic-connections"},{"displayName":"Technical data: stepper motor","url":"contents/topics/technical-data-stepper-motor"},{"displayName":"Technical data: RC servo","url":"contents/topics/technical-data-rc-servo"},{"displayName":"Technical data: piston rod cylinder","url":"contents/topics/technical-data-piston-rod-cylinder"},{"displayName":"Technical data: pneumatic gripper","url":"contents/topics/technical-data--pneumatic-gripper"}]},{"displayName":"Installation","url":"","children":[{"displayName":"Assembling the robot","url":"contents/topics/assembling-the-robot"},{"displayName":"Connecting the stepper motor","url":"contents/topics/connecting-the-stepper-motor"},{"displayName":"Connecting the RC servo","url":"contents/topics/connecting-the-rc-servo"},{"displayName":"Connecting the piston rod cylinder","url":"contents/topics/connecting-the-piston-rod-cylinder"},{"displayName":"Connecting the gripper","url":"contents/topics/connection-the-gripper"}]},{"displayName":"Commissioning","url":"","children":[{"displayName":"Operating principle","url":"contents/topics/operating-principle"},{"displayName":"Adjusting the speed of the piston rod cylinder","url":"contents/topics/adjusting-the-speed-of-the-piston-rod-cylinder"},{"displayName":"Adjusting the speed of the gripper","url":"contents/topics/adjusting-the-speed-of-the-gripper"},{"displayName":"Adjusting the end positions of the piston rod cylinder","url":"contents/topics/adjusting-the-end-positions-of-the-piston-rod-cylinder"},{"displayName":"Setting a reference position for the stepper motor","url":"contents/topics/setting-a-reference-position-for-the-stepper-motor"}]},{"displayName":"Maintenance","url":"","children":[{"displayName":"Inspecting the electrical equipment","url":"contents/topics/inspecting-the-electrical-equipment"},{"displayName":"Inspecting the pneumatic equipment","url":"contents/topics/inspecting-the-pneumatic-equipment"},{"displayName":"Cleaning the robot","url":"contents/topics/cleaning-the-roboter"}]},{"displayName":"Troubleshooting","url":"","children":[{"displayName":"Too much noise during operation","url":"contents/topics/too-much-noise-during-operation"},{"displayName":"Pneumatic actuators do not move","url":"contents/topics/pneumatic-actuators-do-not-move"},{"displayName":"Electrical actuators do not move","url":"contents/topics/electrical-actuators-do-not-move"}]},{"displayName":"Glossary","url":"","children":[{"displayName":"Air service unit","url":"contents/glossentries/air-service-unit"},{"displayName":"Directional control valve","url":"contents/glossentries/directional-control-valve"},{"displayName":"Dovetail slide","url":"contents/glossentries/dovetail-slide"},{"displayName":"End-position cushioning","url":"contents/glossentries/end-position-cushioning"},{"displayName":"Leadscrew","url":"contents/glossentries/leadscrew"},{"displayName":"Limit switch","url":"contents/glossentries/limit-switch"},{"displayName":"Pneumatic silencer","url":"contents/glossentries/pneumatic-silencer"},{"displayName":"Piston rod cylinder","url":"contents/glossentries/piston-rod-cylinder"},{"displayName":"Pneumatic proximity sensor","url":"contents/glossentries/pneumatic-proximity-sensor"},{"displayName":"Programmable logic controller","url":"contents/glossentries/programmable-logic-controller"},{"displayName":"RC servo","url":"contents/glossentries/rc-servo"},{"displayName":"Stepper motor","url":"contents/glossentries/stepper-motor"},{"displayName":"Throttle-check non-return valve","url":"contents/glossentries/throttle-check-non-return-valve"}]}]
const mapTitle = "Electro-pneumatic gantry robot"
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