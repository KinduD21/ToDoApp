import { renderTasks } from "./tasks.js";
import { getProjects } from "./projects.js";

const projectsList = document.querySelector("#projects-list");
const editor = document.querySelector(".editor");
const stateContainer = editor.querySelector(".state-container");
const editorHeading = editor.querySelector("h2");
const inboxProjectsBtn = document
  .querySelector("aside")
  .querySelector(".sidebar-button");

const emptyStateEditor = `
  <img src="/inbox-empty-state.png" alt="Task list is empty" />
  <h4>All clear</h4>
  <p>
    Looks like everything's organized in the right place.
  </p>
`;

stateContainer.insertAdjacentHTML("beforeend", emptyStateEditor);

const emptyProjectStateEditor = `
  <img src="/project-empty-state.png" alt="Task list is empty" />
  <h4>Keep your tasks organized in projects.</h4>
  <p>
  Group your tasks by goal or area of your life.
  </p>
`;

inboxProjectsBtn.addEventListener("click", () => editorInitialState);

// Add Project functions
function projectEmptyState(projectId) {
  renderTasks([]);

  const projects = getProjects();
  const selectedProject = projects.find((p) => p.id === Number(projectId));

  editorHeading.innerHTML = selectedProject.title;
  stateContainer.innerHTML = emptyProjectStateEditor;
}

function projectHasTasksState(projectId) {
  renderTasks([]);

  const projects = getProjects();
  const selectedProject = projects.find((p) => p.id === Number(projectId));

  renderTasks(selectedProject.tasks);

  editorHeading.innerHTML = selectedProject.title;
  stateContainer.innerHTML = "";
}

function projectDeletedState() {
  projectsList.lastElementChild
    .querySelector(".sidebar-button")
    .classList.add("selected");
  editorHeading.innerHTML = projectsList.lastElementChild.querySelector(
    ".sidebar-button .project-name"
  ).innerHTML;
}

// Editor initial markup function

function editorInitialState() {
  // inboxProjectsBtn.classList.add("selected");
  renderTasks([]);
  editorHeading.textContent = "Inbox";
  stateContainer.innerHTML = emptyStateEditor;
}

// NOTE: obj === project object / task object
function renderEditorContent(obj) {
  if (obj === "inbox") {
    return editorInitialState();
  }

  const isTask = Boolean(obj.projectId);

  if (!isTask) {
    const project = obj;
    const hasTasks = Boolean(project.tasks.length);
    const addTaskBtn = document.querySelectorAll("[data-action='addTask']");

    if (!hasTasks) {
      addTaskBtn.forEach((btn) => (btn.dataset.tasksAmount = 0));
      projectEmptyState(project.id);
    } else {
      addTaskBtn.forEach(
        (btn) => (btn.dataset.tasksAmount = project.tasks.length)
      );
      projectHasTasksState(project.id);
    }
  } else {
    const task = obj;
    projectHasTasksState(task.projectId);
  }
}

export { inboxProjectsBtn, projectDeletedState, renderEditorContent };
