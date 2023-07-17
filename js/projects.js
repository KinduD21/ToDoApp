import { deleteIconSvg } from "./deleteIconSvg.js";

const projects = [];
const editor = document.querySelector(".editor");
const editorHeading = editor.querySelector("h2");
const editorImage = editor.querySelector("img");
const editorStateHeading = editor.querySelector(".empty-state-heading");
const editorStateBody = editor.querySelector(".empty-state-body");
const projectsList = document.querySelector("#projects-list");
const addProjectModal = document.querySelector(".add-project-modal");
const addProjectInput = document.querySelector("#project_name");
const addProjectInnerBtn = addProjectModal.querySelector("button[disabled]");
const addProjectOuterBtn = document.querySelector(".add-project-button");
const modalOverlay = document.querySelector(".modal-overlay");
const projectsListContainer = document.querySelector(
  ".projects-list-container"
);
const inboxProjectsBtn = document
  .querySelector("aside")
  .querySelector(".sidebar-button");
const sidebarProjectsCollapseBtn = document.querySelector(
  ".sidebar-projects-button"
);
const sidebarArrowIcon = document.querySelector(
  "svg.sidebar-projects-arrow-icon"
);

addProjectInput.addEventListener("keyup", () => {
  if (addProjectInput.value.trim() === "") {
    addProjectInnerBtn.disabled = true;
  } else {
    addProjectInnerBtn.disabled = false;
  }
});

addProjectOuterBtn.addEventListener("click", () => {
  modalOverlay.classList.add("visible");
  addProjectModal.classList.add("visible");
  addProjectInput.value = "";
  addProjectInnerBtn.disabled = true;
});

sidebarProjectsCollapseBtn.addEventListener("click", () => {
  if (sidebarProjectsCollapseBtn.classList.contains("expanded")) {
    sidebarProjectsCollapseBtn.classList.remove("expanded");
    projectsListContainer.classList.remove("expanded");
    sidebarArrowIcon.classList.remove("expanded");
  } else {
    sidebarProjectsCollapseBtn.classList.add("expanded");
    projectsListContainer.classList.add("expanded");
    sidebarArrowIcon.classList.add("expanded");
  }
});

inboxProjectsBtn.addEventListener("click", () => {
  inboxProjectsBtn.classList.add("selected");
  editorHeading.textContent = "Inbox";
  editorImage.src = "./images/inbox-empty-state.png";
  editorStateHeading.textContent = "All clear";
  editorStateBody.textContent =
    "Looks like everything's organized in the right place.";

  // let selectedBtn = projectsList.querySelector(".selected");
  // if (selectedBtn) {
  //   selectedBtn.style.background = "#fafafa";
  // } else return;
});

addProjectInnerBtn.addEventListener("click", () => {
  inboxProjectsBtn.classList.remove("selected");
  const projectsListLiElementsBtns =
    projectsList.querySelectorAll(".sidebar-button");

  projectsListLiElementsBtns.forEach((projectsListLiElementsBtn) => {
    projectsListLiElementsBtn.classList.remove("selected");
    projects.forEach((project) => (project.selected = false));
  });

  const project = {
    title: addProjectInput.value,
    selected: true,
    id: projects.length + 1,
  };

  const projectItemHtml = `
  <li data-id = ${project.id}>
  <button class="sidebar-button ${project.selected ? "selected" : ""}">
    <svg class="project-icon" viewBox="0 0 24 24">
      <path
        d="M12 7a5 5 0 110 10 5 5 0 010-10z"
        fill="currentColor"
      ></path>
    </svg>
    <span class="project-name">${project.title}</span>
    ${deleteIconSvg}
  </button>
</li>
`;

  projects.push(project);

  projectsList.insertAdjacentHTML("beforeend", projectItemHtml);

  editorHeading.innerHTML = addProjectInput.value;
  editorImage.src = "./images/project-empty-state.png";
  editorStateHeading.innerHTML = "Keep your tasks organized in projects";
  editorStateBody.innerHTML = "Group your tasks by goal or area of your life.";
  addProjectModal.classList.remove("visible");
  modalOverlay.classList.remove("visible");

  let selectedBtn = projectsList.querySelector(".selected");

  selectedBtn.addEventListener("click", () => {
    // inboxProjectsBtn.classList.remove("selected");
    // selectedBtn.style.background = "#eeeeee";
    const projectBtn = projectsList.querySelector(".selected");
    const projectId = Number(projectBtn.parentElement.dataset.id);

    projectBtn.classList.remove("selected");
    projects.find(
      (projectObject) => projectObject.id === projectId
    ).selected = false;

    selectedBtn.classList.add("selected");
    const newProjectId = Number(selectedBtn.parentElement.dataset.id);
    projects.find(
      (projectObject) => projectObject.id === newProjectId
    ).selected = true;
    editorHeading.textContent = selectedBtn.textContent;
    editorImage.src = "./images/project-empty-state.png";
    editorStateHeading.innerHTML = "Keep your tasks organized in projects";
    editorStateBody.innerHTML =
      "Group your tasks by goal or area of your life.";
  });

  selectedBtn
    .querySelector("svg.delete-project-icon")
    .addEventListener("click", (event) => {
      event.stopPropagation();
      if (!selectedBtn) return;

      const projectLiElement = event.target.closest("li");
      const projectId = Number(projectLiElement.dataset.id);

      const projectIndex = projects.findIndex(
        (projectObject) => projectObject.id === projectId
      );

      if (projectIndex !== -1) {
        projects.splice(projectIndex, 1);
        projectLiElement.remove();

        if (!projectsList.lastElementChild) {
          inboxProjectsBtn.classList.add("selected");
          editorHeading.textContent = "Inbox";
          editorImage.src = "./images/inbox-empty-state.png";
          editorStateHeading.textContent = "All clear";
          editorStateBody.textContent =
            "Looks like everything's organized in the right place.";
        } else {
          projectsList.lastElementChild
            .querySelector(".sidebar-button")
            .classList.add("selected");
          editorHeading.textContent =
            projectsList.lastElementChild.querySelector(
              ".sidebar-button"
            ).textContent;
        }
      }
    });
});
