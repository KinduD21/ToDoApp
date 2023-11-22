import {
  clearEditorStateContainer,
  renderTasks,
  editorState,
} from "./editor.js";
import { useProjects, useTasks } from "./store.js";
import { formatDate } from "./utils.js";

const { addTask } = useTasks();
const { getSelectedProjectId } = useProjects();

async function createTask(taskModalForm) {
  const { taskName, taskDescription, taskDate, taskPriority } = taskModalForm;

  const task = await addTask({
    title: taskName.value,
    description: taskDescription.value,
    date: new Date(taskDate.value),
    priority: Number(taskPriority.dataset.priority),
    projectId: Number(taskModalForm.taskProject.value),
  });
  if ((await getSelectedProjectId()) === task.projectId) {
    clearEditorStateContainer();
  }

  if (taskDate.value.trim() === "") {
    task.date = "";
  }

  const taskItemHTML = createTaskItemHTML(task);
  renderTasks(taskItemHTML);
  editorState(task.projectId);
}

export function createTaskItemHTML(taskObj) {
  const { id, title, description, date, priority, projectId } = taskObj;
  return {
    template: `
    <li class="task-button" data-id = ${id}>
      <div class="task-button-top">
        <div class="task-button-top-left">
          <button class="task-button-checkbox-button" data-priority= ${priority}>
              <svg class="task-button-checkbox-icon">
                <path
                  fill="currentColor"
                  d="M11.23 13.7l-2.15-2a.55.55 0 0 0-.74-.01l.03-.03a.46.46 0 0 0 0 .68L11.24 15l5.4-5.01a.45.45 0 0 0 0-.68l.02.03a.55.55 0 0 0-.73 0l-4.7 4.35z"
                ></path>
              </svg>
            </button>
            <p class="task-button-task-name">${title}</p>
          </div>
          <div class="task-button-top-right"></div>
        </div>
        <div class="task-button-description" style=${
          description === "" ? "display:none" : ""
        }>
          <p class="task-button-description-text">${description}</p>
        </div>
        <div class="task-button-due-date" style=${
          date === "" ? "display:none" : ""
        }>
          <div class="task-button-due-date-left">
            <svg viewBox="0 0 12 12" fill="none" class="calendar-icon">
              <path
                fill="currentColor"
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M9.5 1h-7A1.5 1.5 0 001 2.5v7A1.5 1.5 0 002.5 11h7A1.5 1.5 0 0011 9.5v-7A1.5 1.5 0 009.5 1zM2 2.5a.5.5 0 01.5-.5h7a.5.5 0 01.5.5v7a.5.5 0 01-.5.5h-7a.5.5 0 01-.5-.5v-7zM8.75 8a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM3.5 4a.5.5 0 000 1h5a.5.5 0 000-1h-5z"
              ></path>
            </svg>
            <p class="task-button-due-date-text">${
              date === "" ? "" : formatDate(date)
            }</p>
          </div>
        </div>
    </li>
  `,
    projectId,
  };
}

export { createTask };
