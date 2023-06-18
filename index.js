const body = document.querySelector("body");
const hideMenuBtn = document.querySelector("#hide-menu-button");
const editor = document.querySelector(".editor");
const sidebar = document.querySelector("aside");
const sidebarOverlay = document.querySelector(".sidebar-overlay");
const addTaskBtns = document.querySelectorAll("#add-task-button");
const addProjectBtn = document.querySelector(".add-project-button");
const modalOverlay = document.querySelector(".modal-overlay");
const addTaskModal = document.querySelector(".add-task-modal");
const addProjectModal = document.querySelector(".add-project-modal");
const cancelBtns = document.querySelectorAll(".cancel-button");

modalOverlay.addEventListener("click", (event) => {
  event.target.classList.remove("visible");
  event.target.querySelector(".visible").classList.remove("visible");
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

addProjectBtn.addEventListener("click", () => {
  modalOverlay.classList.add("visible");
  addProjectModal.classList.add("visible");
});

cancelBtns.forEach((cancelBtn) => {
  cancelBtn.addEventListener("click", () => {
    modalOverlay.classList.remove("visible");
    cancelBtn.closest(".visible").classList.remove("visible");
  });
});
