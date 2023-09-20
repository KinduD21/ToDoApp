import { createProject } from "../projects.js";

const projectModal = document.querySelector(".add-project-modal");
const projectModalForm = projectModal.querySelector("form");
const projectModalCreate = projectModal.querySelector("[data-action='create']");
const projectModalInputName = projectModal.querySelector("#projectName");

projectModalInputName.addEventListener("input", () => {
  if (projectModalInputName.value) {
    projectModalCreate.disabled = false;
  } else {
    projectModalCreate.disabled = true;
  }
});

projectModalForm.addEventListener("submit", (event) => {
  event.preventDefault();

  createProject(event.target.elements.projectName.value);
  closeProjectModal(event);
});

const openProjectModal = function (modalOverlay) {
  modalOverlay.classList.add("visible");
  projectModal.classList.add("visible");
};

function closeProjectModal(event) {
  const modalOverlay = event.target.closest('.modal-overlay');

  modalOverlay.classList.remove("visible");
  projectModal.classList.remove("visible");
  clearProjectModal();
}

function clearProjectModal() {
  projectModalInputName.value = "";
  projectModalCreate.disabled = true;
};

export { openProjectModal, closeProjectModal }