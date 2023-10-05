import { assistOpenProjectModal } from "./modals.js";
import { useProjects, useTasks } from "./store.js";
import { createTaskItemHTML } from "./tasks.js";
import {
  renderTasks,
  clearTasksHTML,
  clearEditorStateContainer,
  editorState,
} from "./editor.js";

const {
  getAllProjects,
  getSelectedProjectId,
  setSelectedProjectId,
  removeProject,
} = useProjects();

const { getAllTasks, getProjectTasks } = useTasks();

const sidebar = document.querySelector("#sidebar");
const sidebarOverlay = document.querySelector(".sidebar-overlay");
const openProjectModalBtn = document.querySelector(
  "[data-action='openProjectModal']"
);

const sidebarProjectsList = sidebar.querySelector("#projectsList");
const sidebarProjectsListContainer = document.querySelector(
  ".projects-list-container"
);
const sidebarProjectsCollapseBtn = document.querySelector(
  ".sidebar-projects-button"
);
const sidebarArrowIcon = document.querySelector(
  "svg.sidebar-projects-arrow-icon"
);

editorState(getSelectedProjectId());

sidebarProjectsCollapseBtn.addEventListener("click", () => {
  sidebarProjectsCollapseBtn.classList.toggle("expanded");
  sidebarProjectsListContainer.classList.toggle("expanded");
  sidebarArrowIcon.classList.toggle("expanded");
});

sidebar.addEventListener("click", (event) => {
  const button = event.target.closest("button.sidebar-button");

  if (!button) return;

  editorState();

  const projectId = Number(button.parentElement.dataset.id);

  const svgEl = event.target.closest("svg");
  if (svgEl?.classList.contains("delete-project-icon")) {
    const projects = getAllProjects();
    const removedProject = projects.find((p) => p.id === projectId);

    if (!removedProject.selected) {
      if (projects[0].selected) {
        setSelectedProjectId(projects[0].id);
      }
    } else if (removedProject === projects[projects.length - 1]) {
      setSelectedProjectId(projects[projects.length - 2].id);
    } else {
      setSelectedProjectId(projects[projects.indexOf(removedProject) + 1].id);
    }

    removeProject(projectId);
    removeProjectHTML(projectId);

    selectProject();
  } else {
    setSelectedProjectId(projectId);
    unselectProject();
    selectProject();
  }
});

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

function unselectProject() {
  sidebar.querySelector(".selected").classList.remove("selected");
}

function selectProject() {
  const selectedProjectId = getSelectedProjectId();
  sidebar
    .querySelector(`li[data-id="${selectedProjectId}"] > button`)
    .classList.add("selected");

  clearEditorStateContainer();
  editorState(selectedProjectId);

  let filteredTasks = [];
  if (selectedProjectId === 1) {
    filteredTasks = getAllTasks();
  } else {
    filteredTasks = getProjectTasks(selectedProjectId);
  }
  clearTasksHTML();
  filteredTasks.forEach((t) => {
    const taskTemplate = createTaskItemHTML(t);
    renderTasks(taskTemplate);
  });
}

function removeProjectHTML(projectId) {
  const projectLiElement = sidebar.querySelector(`li[data-id="${projectId}"]`);
  projectLiElement.remove();
}

// Open project modal
openProjectModalBtn.addEventListener("click", assistOpenProjectModal);

export {
  toggleSidebar,
  renderProjects,
  unselectProject,
  selectProject,
  editorState,
};
