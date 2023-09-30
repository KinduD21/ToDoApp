import { assistOpenProjectModal } from "./modals.js";
import { useProjects, useTasks } from "./store.js";
import { createTaskItemHTML } from "./tasks.js";
import { renderTasks, clearTasksHTML, editor } from "./editor.js";

const {
  getAllProjects,
  getSelectedProjectId,
  setSelectedProjectId,
  removeProject,
} = useProjects();

const { getAllTasks } = useTasks();

const editorStateContainer = editor.querySelector(".state-container");
const editorHeading = editor.querySelector("h2");

const sidebar = document.querySelector("#sidebar");
const sidebarOverlay = document.querySelector(".sidebar-overlay");
const openProjectModalBtn = document.querySelector(
  "[data-action='openProjectModal']"
);

const sidebarProjectsList = sidebar.querySelector("#projectsList");

editorState(getSelectedProjectId());

sidebar.addEventListener("click", (event) => {
  const button = event.target.closest("button.sidebar-button");

  if (!button) return;

  editorHeading.innerHTML = button.querySelector("span").innerHTML;

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

  editorHeading.innerHTML = sidebar.querySelector(
    `li[data-id="${selectedProjectId}"] > button > span`
  ).innerHTML;

  editorStateContainer.innerHTML = "";

  let filteredTasks = [];
  if (selectedProjectId === 1) {
    filteredTasks = getAllTasks();
  } else {
    filteredTasks = getAllTasks().filter(
      (t) => t.projectId === selectedProjectId
    );
  }
  clearTasksHTML();
  filteredTasks.forEach((t) => {
    const taskTemplate = createTaskItemHTML(t);
    renderTasks(taskTemplate);
  });
  if (filteredTasks.length === 0) {
    editorState(selectedProjectId);
  }
}

function removeProjectHTML(projectId) {
  const projectLiElement = sidebar.querySelector(`li[data-id="${projectId}"]`);
  projectLiElement.remove();
}

function editorState(projectId) {
  if (projectId === 1)
    editorStateContainer.innerHTML = `
    <img src="/inbox-empty-state.png" alt="Task list is empty" />
    <h4>All clear</h4>
    <p>
    Looks like everything's organized in the right place.
    </p>
    `;
  else
    editorStateContainer.innerHTML = `
  <img src="/project-empty-state.png" alt="Task list is empty" />
  <h4>Keep your tasks organized in projects.</h4>
  <p>
  Group your tasks by goal or area of your life.
  </p>
  `;
}

// Open project modal
openProjectModalBtn.addEventListener("click", assistOpenProjectModal);

export {
  toggleSidebar,
  renderProjects,
  unselectProject,
  selectProject,
  editorStateContainer,
  editorState,
};
