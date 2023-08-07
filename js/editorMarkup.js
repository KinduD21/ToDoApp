import { addTaskModal } from "./modal.js";
import { tasks } from "./tasks.js";

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

function projectCreatedState() {
  editorHeading.innerHTML = addProjectInput.value;
  stateContainer.innerHTML = emptyProjectStateEditor;

  addProjectModal.classList.remove("visible");
  modalOverlay.classList.remove("visible");
}

function projectSelectedState(tasks) {
  if (tasks && tasks.length) {
    renderTasks(tasks);
  } else {
    editorHeading.innerHTML = projectsList.querySelector(
      ".selected .project-name"
    ).innerHTML;
    stateContainer.innerHTML = emptyProjectStateEditor;
  }
}

// TODO: what happens when project was deleted. (tasks dependency)
function projectDeletedState() {
  projectsList.lastElementChild
    .querySelector(".sidebar-button")
    .classList.add("selected");
  editorHeading.innerHTML = projectsList.lastElementChild.querySelector(
    ".sidebar-button .project-name"
  ).innerHTML;
}

// Add Task functions
const renderTasks = (tasks) => {
  stateContainer.innerHTML = tasks;
}; // HTML markup for tasks which are in array

function taskCreatedState() {
  // const tasksToShow = tasks.filter((t) => t.projectId === projectId);

  // renderTasks(tasksToShow);
  stateContainer.innerHTML = "";

  addTaskModal.classList.remove("visible");
  modalOverlay.classList.remove("visible");
}

// Editor initial markup function

function editorInitialState() {
  inboxProjectsBtn.classList.add("selected");
  editorHeading.textContent = "Inbox";
  stateContainer.innerHTML = emptyStateEditor;
}

// NOTE: maybe this one can be the only function (entry point) for all cases
function renderEditorContent(projectId) {
  // find tasks
  const tasksToShow = tasks.filter((t) => t.projectId === projectId);
  if (tasksToShow && tasksToShow.length) {
    console.log("works");
  } else {
    projectSelectedState(tasksToShow);
  }
}

export {
  inboxProjectsBtn,
  projectCreatedState,
  editorInitialState,
  projectSelectedState,
  projectDeletedState,
  taskCreatedState,
  renderEditorContent,
};
