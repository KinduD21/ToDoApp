import { openTaskModal, closeTaskModal } from "./modals/taskModal.js";
import { openProjectModal, closeProjectModal } from "./modals/projectModal.js";

// Modal windows' overlay
const modalOverlay = document.querySelector(".modal-overlay");

const modalTaskCancel = modalOverlay.querySelector(
  ".add-task-modal [data-action='cancel']"
);
const modalProjectCancel = modalOverlay.querySelector(
  ".add-project-modal [data-action='cancel']"
);
modalTaskCancel.addEventListener("click", closeTaskModal);
modalProjectCancel.addEventListener("click", closeProjectModal);

modalOverlay.addEventListener("click", (event) => {
  if (event.target.classList.contains("modal-overlay")) {
    event.target.classList.remove("visible");
    event.target.querySelector(".visible").classList.remove("visible");
  }
});

// Auxiliary functions, which allow to hand over "modalOverlay" to primary functions

function assistOpenTaskModal() {
  openTaskModal(modalOverlay);
}

function assistOpenProjectModal() {
  openProjectModal(modalOverlay);
}

export { assistOpenTaskModal, assistOpenProjectModal };

// TODO: where?
// document.addEventListener("keydown", (event) => {
//   if (event.key === "Escape") {
//     closeTaskModal() && closeProjectModal();
//   }
// });

// taskNameInput.addEventListener("keyup", () => {
//   if (taskNameInput.value.trim() === "") {
//     addTaskInnerBtn.disabled = true;
//   } else {
//     addTaskInnerBtn.disabled = false;
//   }
// });

// priorityBtn.addEventListener("click", () => {
//   priorityDropdownMenu.classList.toggle("show");
// });

// dropdownItems.forEach((dropdownItem) => {
//   dropdownItem.addEventListener("click", () => {
//     priorityDropdownMenu.classList.remove("show");
//     selectedPriority.dataset.priority = dropdownItem.dataset.priority;
//     selectedPriority.querySelector("path").setAttribute("fill-rule", "odd");
//   });
// });

// // Add project modal

// addProjectOuterBtn.addEventListener("click", () => {
//   modalOverlay.classList.add("visible");
//   addProjectModal.classList.add("visible");
//   addProjectInput.value = "";
//   addProjectInnerBtn.disabled = true;
// });

// addProjectInnerBtn.addEventListener("click", closeModal);

// addProjectInput.addEventListener("keyup", () => {
//   if (addProjectInput.value.trim() === "") {
//     addProjectInnerBtn.disabled = true;
//   } else {
//     addProjectInnerBtn.disabled = false;
//   }
// });

// // Modal windows' cancel buttons

// cancelBtns.forEach((cancelBtn) => {
//   cancelBtn.addEventListener("click", () => {
//     modalOverlay.classList.remove("visible");
//     cancelBtn.closest(".visible").classList.remove("visible");
//   });
// });
