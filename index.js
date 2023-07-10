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
const projectsListContainer = document.querySelector(
  ".projects-list-container"
);
const sidebarProjectsArrowIcon = document.querySelector(
  ".sidebar-projects-arrow-icon"
);

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

sidebarProjectsArrowIcon.addEventListener("click", () => {
  if (sidebarProjectsArrowIcon.classList.contains("expanded")) {
    sidebarProjectsArrowIcon.classList.remove("expanded");
    projectsListContainer.classList.remove("expanded");
  } else {
    sidebarProjectsArrowIcon.classList.add("expanded");
    projectsListContainer.classList.add("expanded");
  }
});

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
  let clonedLiElementBtns = projectsList.querySelectorAll(".sidebar-button");
  let clonedLiElementBtn = clonedLiElement.querySelector(".sidebar-button");
  let selectedBtn = null;
  clonedLiElement.style.display = "flex";
  clonedLiElementBtns.forEach((clonedLiElementBtn) => {
    clonedLiElementBtn.classList.remove("selected");
  });
  clonedLiElementBtn.classList.add("selected");
  selectedBtn = clonedLiElementBtn;

  let editorHeading = editor.querySelector("h2");
  editorHeading.innerHTML = addProjectInput.value;
  let editorImage = editor.querySelector("img");
  editorImage.src = "./images/project-empty-state.png";
  let editorStateHeading = editor.querySelector(".empty-state-heading");
  let editorStateBody = editor.querySelector(".empty-state-body");
  editorStateHeading.innerHTML = "Keep your tasks organized in projects";
  editorStateBody.innerHTML = "Group your tasks by goal or area of your life.";
  addProjectInput.value = "";
  addProjectInnerBtn.disabled = true;
  addProjectModal.classList.remove("visible");
  modalOverlay.classList.remove("visible");

  clonedLiElementBtns.forEach((clonedLiElementBtn) => {
    clonedLiElementBtn.addEventListener("click", () => {
      clonedLiElementBtn.classList.remove("selected");
      if (selectedBtn) {
        selectedBtn.classList.remove("selected");
      }
      clonedLiElementBtn.classList.add("selected");
      editorHeading.innerHTML = clonedLiElementBtn.textContent;
      selectedBtn = clonedLiElementBtn;
    });
  });

  let deleteProjectBtns = clonedLiElement.querySelectorAll(
    "svg.delete-project-icon"
  );

  deleteProjectBtns.forEach((deleteProjectBtn) => {
    deleteProjectBtn.addEventListener("click", () => {
      deleteProjectBtn.closest("li").remove();
      editorHeading.innerHTML = "Inbox"; // rewrite code, if there's more than just "Inbox" folder
      editorStateHeading.innerHTML = "All clear";
      editorStateBody.innerHTML =
        "Looks like everything's organized in the right place.";
      editorImage.src = "./images/inbox-empty-state.png";
    });
  });
});
