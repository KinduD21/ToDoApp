import { taskCreatedState, editorInitialState } from "./editorMarkup.js";
import {
  addTaskInnerBtn,
  taskNameInput,
  taskDescriptionInput,
  dueDateInput,
} from "./modal.js";

const tasks = [];
const taskList = document.querySelector(".task-list");

addTaskInnerBtn.addEventListener("click", createTask);

function createTask() {
  const task = {
    title: taskNameInput.value,
    description: taskDescriptionInput.value,
    id: tasks.length + 1,
    isDate: false, // it works, but is it needed?
  };

  const dueDateValue = dueDateInput.value.trim();
  let formattedDueDate = "";

  if (dueDateValue) {
    const dueDate = new Date(dueDateValue);
    formattedDueDate = formatDate(dueDate);
    task.isDate = true; // it works, but is it needed?
  }

  const taskItemHtml = `<li class="task-button" data-id = ${task.id}>
    <div class="task-button-top">
      <div class="task-button-top-left">
        <button class="task-button-checkbox-button">
          <svg class="task-button-checkbox-icon project-icon">
            <path
              fill="currentColor"
              d="M11.23 13.7l-2.15-2a.55.55 0 0 0-.74-.01l.03-.03a.46.46 0 0 0 0 .68L11.24 15l5.4-5.01a.45.45 0 0 0 0-.68l.02.03a.55.55 0 0 0-.73 0l-4.7 4.35z"
            ></path>
          </svg>
        </button>
        <p class="task-button-task-name">${task.title}</p>
      </div>
      <div class="task-button-top-right"></div>
    </div>
    <div class="task-button-description" style=${
      taskDescriptionInput.value === "" ? "display:none" : ""
    }>
      <p class="task-button-description-text">${task.description}</p>
    </div>
    <div class="task-button-due-date" style=${
      dueDateValue === "" ? "display:none" : ""
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
        <p class="task-button-due-date-text">${formattedDueDate}</p>
      </div>
    </div>
  </li>`;

  tasks.push(task);

  taskList.insertAdjacentHTML("beforeend", taskItemHtml);

  taskCreatedState();

  const taskBtnCheckboxBtns = taskList.querySelectorAll(
    ".task-button-checkbox-button"
  );

  taskBtnCheckboxBtns.forEach((taskBtnCheckboxBtn) => {
    taskBtnCheckboxBtn.addEventListener("click", taskDelete);
  });
}

function formatDate(date) {
  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = months[monthIndex];
  return `${day} ${month} ${year}`;
}

function taskDelete(event) {
  const taskLiElement = event.target.closest("li");
  const taskId = Number(taskLiElement.dataset.id);

  const taskIndex = tasks.findIndex((taskObject) => taskObject.id === taskId);

  if (taskIndex !== -1) {
    tasks.splice(taskIndex, 1);
    taskLiElement.remove();
    if (!taskList.lastElementChild) {
      editorInitialState();
    }
  }
}
