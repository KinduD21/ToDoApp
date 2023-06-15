const body = document.querySelector("body");
const hideMenuBtn = document.querySelector("#hide-menu-button");
const editor = document.querySelector(".editor");
const sidebar = document.querySelector("aside");
const sidebarOverlay = document.querySelector(".sidebar-overlay");
const addTaskBtns = document.querySelectorAll("#add-task-button");
const addTaskModalOverlay = document.querySelector(".add-task-modal-overlay");
const addTaskModal = document.querySelector(".add-task-modal");
const cancelBtns = document.querySelectorAll(".cancel-button");
const addProjectBtn = document.querySelector(".add-project-button");
const addProjectModalOverlay = document.querySelector(
  ".add-project-modal-overlay"
);
const addProjectModal = document.querySelector(".add-project-modal");

window.onclick = function (event) {
  if (
    event.target == sidebarOverlay &&
    sidebarOverlay.classList.contains("visible")
  ) {
    sidebar.classList.remove("visible");
    sidebarOverlay.classList.remove("visible");
  }
}; // Дописать функцию для addTaskModalOverlay, проблема с условием if???

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
    addTaskModalOverlay.classList.add("visible");
    addTaskModal.classList.add("visible");
  });
});

addProjectBtn.addEventListener("click", () => {
  addProjectModalOverlay.classList.add("visible");
  addProjectModal.classList.add("visible");
});

cancelBtns.forEach((cancelBtn) => {
  cancelBtn.addEventListener("click", () => {
    addTaskModalOverlay.classList.remove("visible");
    addTaskModal.classList.remove("visible");
    addProjectModalOverlay.classList.remove("visible");
    addProjectModal.classList.remove("visible");
  });
});
