const body = document.querySelector("body");
const hideMenuBtn = document.querySelector("#hide-menu-button");
const editor = document.querySelector(".editor");
const sidebar = document.querySelector("aside");
const sidebarOverlay = document.querySelector(".sidebar-overlay");
const addTaskBtns = document.querySelectorAll("#add-task-button");
const addProjectOuterBtn = document.querySelector(".add-project-button");
const modalOverlay = document.querySelector(".modal-overlay");
const addTaskModal = document.querySelector(".add-task-modal");
const addProjectModal = document.querySelector(".add-project-modal");
const addProjectInput = document.querySelector("#project_name");
const cancelBtns = document.querySelectorAll(".cancel-button");
const projectsList = document.querySelector("#projects-list");
const projectsListLiElement = document.querySelector("#projects-list li");

modalOverlay.addEventListener("click", (event) => {
  if (event.target.classList.contains("modal-overlay")) {
    event.target.classList.remove("visible");
    event.target.querySelector(".visible").classList.remove("visible");
  }
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

addProjectOuterBtn.addEventListener("click", () => {
  modalOverlay.classList.add("visible");
  addProjectModal.classList.add("visible");
});

cancelBtns.forEach((cancelBtn) => {
  cancelBtn.addEventListener("click", () => {
    modalOverlay.classList.remove("visible");
    cancelBtn.closest(".visible").classList.remove("visible");
  });
});

// Hometask

let addProjectInnerBtn = addProjectModal.querySelector("button[disabled]"); // optimize? 100 modalok?)))

addProjectInput.addEventListener("keyup", () => {
  if (addProjectInput.value.trim() === "") {
    addProjectInnerBtn.disabled = true;
  } else {
    addProjectInnerBtn.disabled = false;
  }
});

addProjectInnerBtn.addEventListener("click", () => {
  let projectsListLiSpanElement = document.querySelector("span.project-name");
  projectsListLiSpanElement.textContent = addProjectInput.value;
  let clonedLiElement = projectsListLiElement.cloneNode(true);
  projectsList.appendChild(clonedLiElement);
  clonedLiElement.style.display = "flex";

  let editorHeading = editor.querySelector("h2");
  editorHeading.innerHTML = addProjectInput.value;
  let editorImage = editor.querySelector("img");
  editorImage.src = "./images/project-empty-state.png";
  addProjectInput.value = "";
  addProjectInnerBtn.disabled = true;
  addProjectModal.classList.remove("visible");
  modalOverlay.classList.remove("visible");

  let deleteProjectBtns = clonedLiElement.querySelectorAll(
    "svg.delete-project-icon"
  );

  deleteProjectBtns.forEach((deleteProjectBtn) => {
    deleteProjectBtn.addEventListener("click", () => {
      deleteProjectBtn.closest("li").remove();
      editorHeading.innerHTML = "Inbox"; // rewrite code, if there's more than just "Inbox" folder
      editorImage.src = "./images/inbox-empty-state.png";
    });
  });
});
