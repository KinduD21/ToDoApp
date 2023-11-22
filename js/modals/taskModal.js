import { useProjects } from "../store.js";
import { createTask } from "../tasks.js";
import { formattedCurrentDate } from "../utils.js";

const { getAllProjects } = useProjects();
const taskModal = document.querySelector(".add-task-modal");
const taskModalForm = taskModal.querySelector("#add-task-form");
const taskModalCreate = taskModal.querySelector("[data-action='create']");
const taskModalInputName = taskModal.querySelector("#taskName");
const taskModalInputDescription = taskModal.querySelector("#taskDescription");
const taskModalInputDate = taskModal.querySelector("#taskDate");
taskModalInputDate.min = formattedCurrentDate; // set date input "min" - today's date
taskModalInputDate.valueAsDate = new Date();
const taskModalProject = taskModal.querySelector("#taskProject");
const taskModalPriority = taskModal.querySelector("#taskPriority");

const priorityDropdownMenu = taskModal.querySelector(".dropdown-menu");
const dropdownItems = taskModal.querySelectorAll(".dropdown-item");
const selectedPriority = taskModal.querySelector(
  ".add-task-modal__dropdown"
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

async function openTaskModal(modalOverlay) {
  const projects = await getAllProjects();
  const inboxOption = new Option ("Inbox", 1, true, true);
  taskModalProject.add(inboxOption);
  projects.forEach((project) => {
    const option = new Option(project.title, project.id, project.selected, project.selected);
    taskModalProject.add(option)
  });
  modalOverlay.classList.add("visible");
  taskModal.classList.add("visible");
}

function closeTaskModal(event) {
  const modalOverlay = event.target.closest(".modal-overlay");
  Array.from(taskModalProject.options).forEach(option => option.remove());

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
