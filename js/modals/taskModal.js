const taskModal = document.querySelector(".add-task-modal");
const taskModalCreate = taskModal.querySelector("[data-action='create']");
const taskModalNameInput = taskModal.querySelector("#taskName");
const taskModalDescriptionInput = taskModal.querySelector("#taskDescription");
const taskModalDateInput = taskModal.querySelector("#taskDate");
const taskModalProject = taskModal.querySelector("#taskProject");
const taskModalPriority = taskModal.querySelector("#taskPriority");

// TODO: extract to helper/util
const currentDate = new Date();
const formattedCurrentDate = `${currentDate.getFullYear()}-${(
  currentDate.getMonth() + 1
)
  .toString()
  .padStart(2, "0")}-${currentDate.getDate().toString().padStart(2, "0")}`;
// const priorityDropdownMenu = addTaskModal.querySelector(".dropdown-menu");
// const dropdownItems = addTaskModal.querySelectorAll(".dropdown-item");
// const selectedPriority = addTaskModal.querySelector(".dropdown svg");

function openTaskModal(modalOverlay) {
  modalOverlay.classList.add("visible");
  taskModal.classList.add("visible");
};

function closeTaskModal(event) {
  const modalOverlay = event.target.closest('.modal-overlay');

  modalOverlay.classList.remove("visible");
  taskModal.classList.remove("visible");
  clearTaskModal();
}

function clearTaskModal() {
  taskModalNameInput.value = "";
  taskModalDateInput.valueAsDate = new Date();
  taskModalDateInput.min = formattedCurrentDate;
  taskModalCreate.disabled = true;
  // priorityDropdownMenu.classList.remove("show");
  // selectedPriority.dataset.priority = "";
  // selectedPriority.querySelector("path").setAttribute("fill-rule", "evenodd");
};

export { openTaskModal, closeTaskModal }