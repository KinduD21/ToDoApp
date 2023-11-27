import { assistOpenTaskModal } from "./modals.js";
import { useTasks, useProjects } from "./store.js";
import { createTaskItemHTML } from "./tasks.js";

const { removeTask, getProjectTasks, getAllTasks } = useTasks();

const { getSelectedProjectId, getAllProjects } = useProjects();

const editor = document.querySelector("#editor");
const editorStateContainer = editor.querySelector(".state-container");
const editorHeading = editor.querySelector("h2");
const openTaskModalBtn = editor.querySelector("[data-action='openTaskModal']");
const editorTasksList = editor.querySelector("#taskList");

// Open Task modal
openTaskModalBtn.addEventListener("click", assistOpenTaskModal);

const tasksData = await getAllTasks();

if (tasksData.length > 0) {
  clearEditorStateContainer();
} else {
  editorState(await getSelectedProjectId());
}

tasksData.forEach((taskObj) => {
  const taskItemHTML = createTaskItemHTML(taskObj);
  renderTasks(taskItemHTML);
});

// !!! PAY ATTENTION TO FIX IT
async function renderTasks(taskTemplate) {
  if (
    taskTemplate.projectId === (await getSelectedProjectId()) ||
    (await getSelectedProjectId()) === 1
  ) {
    editorTasksList.insertAdjacentHTML("beforeend", taskTemplate.template);
  }
}

function removeTaskHTML(taskId) {
  const taskLiElement = editorTasksList.querySelector(
    `li[data-id="${taskId}"]`
  );
  taskLiElement.remove();
}

editorTasksList.addEventListener("click", async (event) => {
  if (!event.target.classList.contains("task-button-checkbox-button")) return;
  const taskEl = event.target.closest("li[data-id]");
  const taskId = Number(taskEl.dataset.id);

  await removeTask(taskId);
  removeTaskHTML(taskId);
  editorState(await getSelectedProjectId());
});

function clearTasksHTML() {
  editorTasksList.innerHTML = "";
}

function clearEditorStateContainer() {
  editorStateContainer.innerHTML = "";
}

function editorHeadingFunction(newEditorHeading) {
  editorHeading.innerHTML = newEditorHeading;
}

function editorState(projectId) {
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

export {
  renderTasks,
  clearTasksHTML,
  clearEditorStateContainer,
  editorHeadingFunction,
  editorState,
  editorTasksList,
};
