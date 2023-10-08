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

    if(event.target.querySelector(".visible").classList.contains("add-task-modal")) {
      closeTaskModal(event);
    } else {
      closeProjectModal(event);
    }
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
