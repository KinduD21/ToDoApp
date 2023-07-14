import "./projects.js";

const hideMenuBtn = document.querySelector("#hide-menu-button");
const sidebar = document.querySelector("aside");
const sidebarOverlay = document.querySelector(".sidebar-overlay");
const addTaskBtns = document.querySelectorAll("#add-task-button");
const addProjectOuterBtn = document.querySelector(".add-project-button");
const modalOverlay = document.querySelector(".modal-overlay");
const addTaskModal = document.querySelector(".add-task-modal");
const addProjectModal = document.querySelector(".add-project-modal");
const addProjectInput = document.querySelector("#project_name");
const cancelBtns = document.querySelectorAll(".cancel-button");

let addProjectInnerBtn = addProjectModal.querySelector("button[disabled]"); // optimize? 100 modalok?)))

modalOverlay.addEventListener("click", (event) => {
  if (event.target.classList.contains("modal-overlay")) {
    event.target.classList.remove("visible");
    event.target.querySelector(".visible").classList.remove("visible");
  }
});

sidebarOverlay.addEventListener("click", () => {
  sidebarOverlay.classList.remove("visible");
  sidebar.classList.remove("visible");
});

hideMenuBtn.addEventListener("click", () => {
  if (sidebar.classList.contains("visible")) {
    sidebar.classList.remove("visible");
    sidebarOverlay.classList.remove("visible");
  } else {
    sidebar.classList.add("visible");
    sidebarOverlay.classList.add("visible");
  }
});

addTaskBtns.forEach((addTaskBtn) => {
  addTaskBtn.addEventListener("click", () => {
    modalOverlay.classList.add("visible");
    addTaskModal.classList.add("visible");
  });
});

addProjectOuterBtn.addEventListener("click", () => {
  modalOverlay.classList.add("visible");
  addProjectModal.classList.add("visible");
  addProjectInput.value = "";
  addProjectInnerBtn.disabled = true;
});

cancelBtns.forEach((cancelBtn) => {
  cancelBtn.addEventListener("click", () => {
    modalOverlay.classList.remove("visible");
    cancelBtn.closest(".visible").classList.remove("visible");
  });
});
