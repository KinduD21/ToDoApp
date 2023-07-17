const addTaskModal = document.querySelector(".add-task-modal");
const addTaskBtns = document.querySelectorAll("#add-task-button");
const modalOverlay = document.querySelector(".modal-overlay");

addTaskBtns.forEach((addTaskBtn) => {
  addTaskBtn.addEventListener("click", () => {
    modalOverlay.classList.add("visible");
    addTaskModal.classList.add("visible");
  });
});

export { modalOverlay };
