import { deleteIconSvg } from "./deleteIconSvg.js";
import {
  inboxProjectsBtn,
  projectDeletedState,
  renderEditorContent,
} from "./editorMarkup.js";
import { addProjectInnerBtn, addProjectInput, closeModal } from "./modal.js";

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
  sidebarProjectsCollapseBtn.classList.toggle("expanded");
  projectsListContainer.classList.toggle("expanded");
  sidebarArrowIcon.classList.toggle("expanded");
});

let selectedBtn = projectsList.querySelector(".selected");

// const addProjectForm = document.querySelector("#add-project-form");

addProjectInnerBtn.addEventListener("click", createProject);

// addProjectForm.addEventListener("keydown", (event) => {
//   if (event.key === "Enter" && !addProjectInnerBtn.disabled) {
//     event.preventDefault();
//     createProject();
//     closeModal();
//   }
// });

function createProject() {
  inboxProjectsBtn.classList.remove("selected");
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
    tasks: [],
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

  selectedBtn = projectsList.querySelector(".selected");

  renderEditorContent(project);

  selectedBtn.addEventListener("click", selectProject);
  selectedBtn
    .querySelector("svg.delete-project-icon")
    .addEventListener("click", deleteProject);
}

function selectProject(event) {
  const oldSelectedProject = projects.find(
    (projectObject) => projectObject.selected
  );
  oldSelectedProject.selected = false;
  projectsList
    .querySelector(`[data-id='${oldSelectedProject.id}'] button`)
    .classList.remove("selected");

  const newProjectId = Number(event.currentTarget.parentElement.dataset.id);
  const newSelectedProject = projects.find(
    (projectObject) => projectObject.id === newProjectId
  );
  newSelectedProject.selected = true;
  event.currentTarget.classList.add("selected");

  renderEditorContent(newSelectedProject);
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
      // renderEditorContent("", projects, "projects");
    } else {
      projectDeletedState();
    }
  }
}

// similar "interface"/API
export function getProjects() {
  return projects;
}

export function addTaskToProject(task) {
  const project = projects.find((p) => p.id == task.projectId);
  if (project) {
    project.tasks.push(task);
  }
}
