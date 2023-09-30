import { assistOpenTaskModal } from "./modals.js";
import { useTasks, useProjects } from "./store.js";
import { editorState } from "./sidebar.js";

const { removeTask } = useTasks();

const { getSelectedProjectId } = useProjects();

const editor = document.querySelector("#editor");
const openTaskModalBtn = editor.querySelector("[data-action='openTaskModal']");
const editorTasksList = editor.querySelector("#taskList");

// Open Task modal
openTaskModalBtn.addEventListener("click", assistOpenTaskModal);

function renderTasks(taskTemplate) {
  editorTasksList.insertAdjacentHTML("beforeend", taskTemplate);
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

export { renderTasks, clearTasksHTML, editor };
