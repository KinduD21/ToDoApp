import { addTaskModal } from "./modal.js";
import { renderTasks } from "./tasks.js";
import { getProjects } from "./projects.js";

const projectsList = document.querySelector("#projects-list");
const addProjectInput = document.querySelector("#project_name");
const addProjectModal = document.querySelector(".add-project-modal");
const modalOverlay = document.querySelector(".modal-overlay");
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

  // addProjectModal.classList.remove("visible");
  // modalOverlay.classList.remove("visible");
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

// Add Task functions

function taskCreatedState() {
  stateContainer.innerHTML = "";

  addTaskModal.classList.remove("visible");
  modalOverlay.classList.remove("visible");
}

// Editor initial markup function

function editorInitialState() {
  // inboxProjectsBtn.classList.add("selected");
  editorHeading.textContent = "Inbox";
  stateContainer.innerHTML = emptyStateEditor;
}

// NOTE: obj === project object / task object
function renderEditorContent(obj) {
  const isTask = Boolean(obj.projectId);

  if (!isTask) {
    const project = obj;
    const hasTasks = Boolean(project.tasks.length);
    const addTaskBtn = document.querySelectorAll("[data-action='addTask']");
    
    if (!hasTasks) {
      addTaskBtn.forEach((btn) => btn.dataset.tasksAmount = 0);
      projectEmptyState(project.id);
    } else {
      addTaskBtn.forEach((btn) => btn.dataset.tasksAmount = project.tasks.length + 1);
      projectHasTasksState(project.id);
    }
  } else {
    const task = obj;
    projectHasTasksState(task.projectId);
  }
}

// array === [projects]/[tasks]
// renderEditorContent(array) -> 3 cases -> projectCreatedState / projectSelectedState / ProjectDeletedState
// const isTask = array.find((obj) => Boolean(obj.projectId)) -> true/false
// if(!isTask) ->
// if(!array.hasTasks()) -> projectEmptyState
// else -> projectHasTasksState

// ProjectDeletedState -> project removed
//

// if(isTask) ->
// taskCreatedState -> add task / removed all tasks on existing task
//
// taskDeletedState -> task removed
//

export {
  inboxProjectsBtn,
  editorInitialState,
  projectDeletedState,
  renderEditorContent,
};
