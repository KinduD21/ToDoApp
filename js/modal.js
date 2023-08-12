const addTaskModal = document.querySelector(".add-task-modal");
const addTaskBtns = document.querySelectorAll("[data-action='addTask']");
const modalOverlay = document.querySelector(".modal-overlay");
const cancelBtns = document.querySelectorAll(".cancel-button");
const addProjectOuterBtn = document.querySelector(".add-project-button");
const addProjectModal = document.querySelector(".add-project-modal");
const addProjectInput = document.querySelector("#project_name");
const addProjectInnerBtn = addProjectModal.querySelector("button[disabled]");
const addTaskInnerBtn = addTaskModal.querySelector("button[disabled]");
const taskNameInput = addTaskModal.querySelector("#task-name-input");
const taskDescriptionInput = addTaskModal.querySelector(
  "#task-description-input"
);
const dueDateInput = addTaskModal.querySelector(".due-date-picker");
const currentDate = new Date();
const formattedCurrentDate = `${currentDate.getFullYear()}-${(
  currentDate.getMonth() + 1
)
  .toString()
  .padStart(2, "0")}-${currentDate.getDate().toString().padStart(2, "0")}`;
const priorityBtn = addTaskModal.querySelector("[data-bs-toggle='dropdown']");
const priorityDropdownMenu = addTaskModal.querySelector(".dropdown-menu");
const dropdownItems = addTaskModal.querySelectorAll(".dropdown-item");
const selectedPriority = addTaskModal.querySelector(".dropdown svg");

// Modal windows' overlay

modalOverlay.addEventListener("click", (event) => {
  if (event.target.classList.contains("modal-overlay")) {
    event.target.classList.remove("visible");
    event.target.querySelector(".visible").classList.remove("visible");
  }
});

// Add task modal

addTaskBtns.forEach((addTaskBtn) => {
  addTaskBtn.addEventListener("click", () => {
    modalOverlay.classList.add("visible");
    addTaskModal.classList.add("visible");
    taskNameInput.value = "";
    taskDescriptionInput.value = "";
    dueDateInput.valueAsDate = new Date();
    dueDateInput.min = formattedCurrentDate;
    addTaskInnerBtn.disabled = true;
    priorityDropdownMenu.classList.remove("show");
    selectedPriority.dataset.priority = "";
    selectedPriority.querySelector("path").setAttribute("fill-rule", "evenodd");
  });
});

taskNameInput.addEventListener("keyup", () => {
  if (taskNameInput.value.trim() === "") {
    addTaskInnerBtn.disabled = true;
  } else {
    addTaskInnerBtn.disabled = false;
  }
});

priorityBtn.addEventListener("click", () => {
  if (priorityDropdownMenu.classList.contains("show")) {
    priorityDropdownMenu.classList.remove("show");
  } else {
    priorityDropdownMenu.classList.add("show");
  }
});

dropdownItems.forEach((dropdownItem) => {
  dropdownItem.addEventListener("click", () => {
    priorityDropdownMenu.classList.remove("show");
    selectedPriority.dataset.priority = dropdownItem.dataset.priority;
    selectedPriority.querySelector("path").setAttribute("fill-rule", "odd");
  });
});

// Add project modal

addProjectOuterBtn.addEventListener("click", () => {
  modalOverlay.classList.add("visible");
  addProjectModal.classList.add("visible");
  addProjectInput.value = "";
  addProjectInnerBtn.disabled = true;
});

addProjectInput.addEventListener("keyup", () => {
  if (addProjectInput.value.trim() === "") {
    addProjectInnerBtn.disabled = true;
  } else {
    addProjectInnerBtn.disabled = false;
  }
});

// Modal windows' cancel buttons

cancelBtns.forEach((cancelBtn) => {
  cancelBtn.addEventListener("click", () => {
    modalOverlay.classList.remove("visible");
    cancelBtn.closest(".visible").classList.remove("visible");
  });
});

export {
  addProjectInnerBtn,
  addTaskInnerBtn,
  taskNameInput,
  taskDescriptionInput,
  dueDateInput,
  addTaskModal,
  addProjectInput,
  selectedPriority,
};
