const body = document.querySelector("body");
const hideMenuBtn = document.querySelector("#hide-menu-button");
const editor = document.querySelector(".editor");
const sidebar = document.querySelector("aside");
const sidebarOverlay = document.querySelector(".sidebar-overlay");
const addTaskBtns = document.querySelectorAll("#add-task-button");
const addTaskModalOverlay = document.querySelector(".add-task-modal-overlay");
const addTaskModal = document.querySelector(".add-task-modal");
const cancelBtn = document.querySelector(".cancel-button");

window.onclick = function (event) {
  if (
    event.target == sidebarOverlay &&
    sidebarOverlay.classList.contains("isSidebarOverlayVisible")
  ) {
    sidebar.classList.remove("isSidebarVisible");
    sidebarOverlay.classList.remove("isSidebarOverlayVisible");
  }
}; // Дописать функцию для addTaskModalOverlay, проблема с условием if???

hideMenuBtn.addEventListener("click", () => {
  if (sidebar.classList.contains("isSidebarVisible")) {
    sidebar.classList.remove("isSidebarVisible");
    sidebarOverlay.classList.remove("isSidebarOverlayVisible");
  } else {
    sidebar.classList.add("isSidebarVisible");
    sidebarOverlay.classList.add("isSidebarOverlayVisible");
  }
});

addTaskBtns.forEach((addTaskBtn) => {
  addTaskBtn.addEventListener("click", () => {
    addTaskModalOverlay.classList.add("visible");
    addTaskModal.classList.add("visible");
  });
});

cancelBtn.addEventListener("click", () => {
  addTaskModalOverlay.classList.remove("visible");
  addTaskModal.classList.remove("visible");
});
