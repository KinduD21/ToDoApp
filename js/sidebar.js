import { assistOpenProjectModal } from "./modals.js";

const sidebar = document.querySelector("aside");
const sidebarOverlay = document.querySelector(".sidebar-overlay");
const openProjectModalBtn = document.querySelector(
  "[data-action='openProjectModal']"
);

const sidebarProjectsList = sidebar.querySelector("#projectsList");
const sidebarProjectsBtns = sidebar.querySelectorAll("li[data-id] > button");

// Listen to clicks on Inbox button
function addListenerForInbox(oldProjectObj, newProjectObj) {
  sidebarProjectsBtns[0].addEventListener("click", (event) => {
    sidebarProjectsBtns.forEach((btn) => btn.classList.remove("selected"));
    // currentTarget = button
    // target = <button class="sidebar-button selected"><span>Inbox</span></button>
    event.target.classList.add("selected");
  });
}

// event bubling
// event delegation

function addListenersForProject(oldProjectObj, newProjectObj) {
  const newProjectBtn = sidebar.querySelector(
    `li[data-id="${newProjectObj.id}"] > button`
  );

  newProjectBtn.addEventListener("click", () => {
    unselectProject(oldProjectObj);
    selectProject(newProjectObj);
  });
}

sidebarOverlay.addEventListener("click", () => {
  sidebarOverlay.classList.remove("visible");
  sidebar.classList.remove("visible");
});

const toggleSidebar = function () {
  sidebar.classList.toggle("visible");
  sidebarOverlay.classList.toggle("visible");
};

function renderProjects(projectTemplate) {
  sidebarProjectsList.insertAdjacentHTML("beforeend", projectTemplate);
}

function unselectProject(oldProjectObj) {
  sidebar.querySelector(".selected").classList.remove("selected");
  oldProjectObj.selected = false;
}

function selectProject(newProjectObj) {
  sidebar
    .querySelector(`li[data-id="${newProjectObj.id}"] > button`)
    .classList.add("selected");
  newProjectObj.selected = true;
}

// Open project modal
openProjectModalBtn.addEventListener("click", assistOpenProjectModal);

export {
  toggleSidebar,
  renderProjects,
  unselectProject,
  selectProject,
  addListenersForProject,
  addListenerForInbox
};
