import { deleteIconSvg } from "./deleteIconSvg.js";
import {
  projectCreatedState,
  projectDeletedState,
  projectSelectedState,
  editorInitialState,
} from "./editorMarkup.js";
import "./modal.js";
import { addProjectInnerBtn, addProjectInput } from "./modal.js";

const projects = [];
const projectsList = document.querySelector("#projects-list");
const projectsListContainer = document.querySelector(
  ".projects-list-container"
);

const sidebarProjectsCollapseBtn = document.querySelector(
  ".sidebar-projects-button"
);
const sidebarArrowIcon = document.querySelector(
  "svg.sidebar-projects-arrow-icon"
);

sidebarProjectsCollapseBtn.addEventListener("click", () => {
  if (sidebarProjectsCollapseBtn.classList.contains("expanded")) {
    sidebarProjectsCollapseBtn.classList.remove("expanded");
    projectsListContainer.classList.remove("expanded");
    sidebarArrowIcon.classList.remove("expanded");
  } else {
    sidebarProjectsCollapseBtn.classList.add("expanded");
    projectsListContainer.classList.add("expanded");
    sidebarArrowIcon.classList.add("expanded");
  }
});

let selectedBtn = projectsList.querySelector(".selected");

addProjectInnerBtn.addEventListener("click", createProject);

// function addProjectButtonClickListeners() {
//   const projectButtons = projectsList.querySelectorAll(".sidebar-button");
// projectButtons.forEach((button) => {
//     button.addEventListener("click", selectProject);
//     button
//       .querySelector("svg.delete-project-icon")
//       .addEventListener("click", deleteProject);
//   });
// }

function createProject() {
  const projectsListLiElementsBtns =
    projectsList.querySelectorAll(".sidebar-button");

  projectsListLiElementsBtns.forEach((projectsListLiElementsBtn) => {
    projectsListLiElementsBtn.classList.remove("selected");
    projects.forEach((project) => (project.selected = false));
  });

  const project = {
    title: addProjectInput.value,
    selected: true,
    id: projects.length + 1,
  };

  const projectItemHtml = `
  <li data-id = ${project.id}>
  <button class="sidebar-button ${project.selected ? "selected" : ""}">
    <svg class="project-icon" viewBox="0 0 24 24">
      <path
        d="M12 7a5 5 0 110 10 5 5 0 010-10z"
        fill="currentColor"
      ></path>
    </svg>
    <span class="project-name">${project.title}</span>
    ${deleteIconSvg}
  </button>
</li>
`;

  projects.push(project);

  projectsList.insertAdjacentHTML("beforeend", projectItemHtml);

  // addProjectButtonClickListeners();

  selectedBtn = projectsList.querySelector(".selected");

  projectCreatedState();

  selectedBtn.addEventListener("click", selectProject);
  selectedBtn
    .querySelector("svg.delete-project-icon")
    .addEventListener("click", deleteProject);
}

function selectProject(event) {
  const projectBtn = projectsList.querySelector(".selected");
  const projectId = Number(projectBtn.parentElement.dataset.id);

  projectBtn.classList.remove("selected");
  projects.find(
    (projectObject) => projectObject.id === projectId
  ).selected = false;

  event.target.closest(".sidebar-button").classList.add("selected");

  selectedBtn.classList.add("selected");

  const newProjectId = Number(selectedBtn.parentElement.dataset.id);
  projects.find(
    (projectObject) => projectObject.id === newProjectId
  ).selected = true;
  projectSelectedState();
  console.log(projects);
}

function deleteProject(event) {
  event.stopPropagation();
  if (!selectedBtn) return;

  const projectLiElement = event.target.closest("li");
  const projectId = Number(projectLiElement.dataset.id);

  const projectIndex = projects.findIndex(
    (projectObject) => projectObject.id === projectId
  );

  if (projectIndex !== -1) {
    projects.splice(projectIndex, 1);
    projectLiElement.remove();

    if (!projectsList.lastElementChild) {
      editorInitialState();
    } else {
      projectDeletedState();
    }
  }
}
