const addTaskModal = document.querySelector(".add-task-modal");
const addTaskBtns = document.querySelectorAll("#add-task-button");
const modalOverlay = document.querySelector(".modal-overlay");
const cancelBtns = document.querySelectorAll(".cancel-button");
const addProjectOuterBtn = document.querySelector(".add-project-button");
const addProjectModal = document.querySelector(".add-project-modal");
const addProjectInput = document.querySelector("#project_name");
const addProjectInnerBtn = addProjectModal.querySelector("button[disabled]");

addTaskBtns.forEach((addTaskBtn) => {
  addTaskBtn.addEventListener("click", () => {
    modalOverlay.classList.add("visible");
    addTaskModal.classList.add("visible");
  });
});

modalOverlay.addEventListener("click", (event) => {
  if (event.target.classList.contains("modal-overlay")) {
    event.target.classList.remove("visible");
    event.target.querySelector(".visible").classList.remove("visible");
  }
});

cancelBtns.forEach((cancelBtn) => {
  cancelBtn.addEventListener("click", () => {
    modalOverlay.classList.remove("visible");
    cancelBtn.closest(".visible").classList.remove("visible");
  });
});

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

export { addProjectInnerBtn };
