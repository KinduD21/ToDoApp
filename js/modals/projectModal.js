const projectModal = document.querySelector(".add-project-modal");
const projectModalCreate = projectModal.querySelector("[data-action='create']");
const projectModalCancel = projectModal.querySelector("[data-action='cancel']");
const projectModalInputName = projectModal.querySelector("#projectName");


const openProjectModal = function (modalOverlay) {
  modalOverlay.classList.add("visible");
  projectModal.classList.add("visible");
};

function closeProjectModal(event) {
  const modalOverlay = event.target.closest('.modal-overlay');

  modalOverlay.classList.remove("visible");
  projectModal.classList.remove("visible");
}

export { openProjectModal, closeProjectModal }