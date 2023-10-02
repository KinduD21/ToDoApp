import { assistOpenTaskModal } from "./modals.js";
import { useTasks, useProjects } from "./store.js";

const { removeTask, getProjectTasks } = useTasks();

const { getSelectedProjectId, getSelectedProject } = useProjects();

const editor = document.querySelector("#editor");
const editorStateContainer = editor.querySelector(".state-container");
const editorHeading = editor.querySelector("h2");
const openTaskModalBtn = editor.querySelector("[data-action='openTaskModal']");
const editorTasksList = editor.querySelector("#taskList");

// Open Task modal
openTaskModalBtn.addEventListener("click", assistOpenTaskModal);

function renderTasks(taskTemplate) {

  if(taskTemplate.projectId === getSelectedProjectId()) {
    editorTasksList.insertAdjacentHTML("beforeend", taskTemplate.template);
  }
}

function clearTasksHTML() {
  editorTasksList.innerHTML = "";
}

function removeTaskHTML(taskId) {
  const taskLiElement = editorTasksList.querySelector(
    `li[data-id="${taskId}"]`
  );
  taskLiElement.remove();
}

editorTasksList.addEventListener("click", (event) => {
  if (!event.target.classList.contains("task-button-checkbox-button")) return;
  const taskEl = event.target.closest("li[data-id]");
  const taskId = Number(taskEl.dataset.id);

  removeTask(taskId);
  removeTaskHTML(taskId);

  if (editorTasksList.children.length == 0) {
    editorState(getSelectedProjectId());
  }
});

function clearEditorStateContainer() {
  editorStateContainer.innerHTML = "";
}

function editorState(projectId) {
  const selectedProject = getSelectedProject();
  editorHeading.innerHTML = selectedProject.title;

  if(getProjectTasks(projectId).length) return;
  if (projectId === 1) {
    editorStateContainer.innerHTML = `
      <img src="/inbox-empty-state.png" alt="Task list is empty" />
      <h4>All clear</h4>
      <p>
      Looks like everything's organized in the right place.
      </p>
    `;
  } else {
    editorStateContainer.innerHTML = `
      <img src="/project-empty-state.png" alt="Task list is empty" />
      <h4>Keep your tasks organized in projects.</h4>
      <p>
      Group your tasks by goal or area of your life.
      </p>
    `;
  }
}

export { renderTasks, clearTasksHTML, clearEditorStateContainer, editorState };
