import { createTask } from "../tasks";
import { formattedCurrentDate } from "../utils.js";

const taskModal = document.querySelector(".add-task-modal");
const taskModalForm = taskModal.querySelector("#add-task-form");
const taskModalCreate = taskModal.querySelector("[data-action='create']");
const taskModalInputName = taskModal.querySelector("#taskName");
const taskModalInputDescription = taskModal.querySelector("#taskDescription");
const taskModalInputDate = taskModal.querySelector("#taskDate");
taskModalInputDate.min = formattedCurrentDate; // set date input "min" - today's date
const taskModalProject = taskModal.querySelector("#taskProject");
const taskModalPriority = taskModal.querySelector("#taskPriority");

const priorityDropdownMenu = taskModal.querySelector(".dropdown-menu");
const dropdownItems = taskModal.querySelectorAll(".dropdown-item");
const selectedPriority = taskModal.querySelector(
  ".add-task-modal__dropdown svg"
);

taskModalInputName.addEventListener("input", () => {
  if (taskModalInputName.value) {
    taskModalCreate.disabled = false;
  } else {
    taskModalCreate.disabled = true;
  }
});

taskModalForm.addEventListener("submit", (event) => {
  event.preventDefault();

  createTask(event.target.elements);
  closeTaskModal(event);
});

function openTaskModal(modalOverlay) {
  modalOverlay.classList.add("visible");
  taskModal.classList.add("visible");
}

function closeTaskModal(event) {
  const modalOverlay = event.target.closest(".modal-overlay");

  modalOverlay.classList.remove("visible");
  taskModal.classList.remove("visible");
  clearTaskModal();
}

function clearTaskModal() {
  taskModalInputName.value = "";
  taskModalInputDescription.value = "";
  taskModalInputDate.valueAsDate = new Date();
  taskModalInputDate.min = formattedCurrentDate;
  taskModalCreate.disabled = true;
  priorityDropdownMenu.classList.remove("show");
  selectedPriority.dataset.priority = "";
  selectedPriority.querySelector("path").setAttribute("fill-rule", "evenodd");
}

taskModalPriority.addEventListener("click", openPriorityMenu);

function openPriorityMenu() {
  priorityDropdownMenu.classList.toggle("show");
}

dropdownItems.forEach((dropdownItem) => {
  dropdownItem.addEventListener("click", () => {
    selectedPriority.dataset.priority = dropdownItem.dataset.priority;
    selectedPriority.querySelector("path").setAttribute("fill-rule", "odd");
    priorityDropdownMenu.classList.remove("show");
  });
});

export { openTaskModal, closeTaskModal };
