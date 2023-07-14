import { deleteIconSvg } from "./deleteIconSvg.js";
import { deleteProject } from "./deleteProject.js";

const projects = [];
const editor = document.querySelector(".editor");
const editorHeading = editor.querySelector("h2");
const editorImage = editor.querySelector("img");
const editorStateHeading = editor.querySelector(".empty-state-heading");
const editorStateBody = editor.querySelector(".empty-state-body");
const projectsList = document.querySelector("#projects-list");
const addProjectModal = document.querySelector(".add-project-modal");
const addProjectInput = document.querySelector("#project_name");
const modalOverlay = document.querySelector(".modal-overlay");
const projectsListContainer = document.querySelector(
  ".projects-list-container"
);
const sidebarProjectsBtn = document.querySelector(".sidebar-projects-button");
const sidebarArrowIcon = document.querySelector(
  "svg.sidebar-projects-arrow-icon"
);

let addProjectInnerBtn = addProjectModal.querySelector("button[disabled]");

addProjectInput.addEventListener("keyup", () => {
  if (addProjectInput.value.trim() === "") {
    addProjectInnerBtn.disabled = true;
  } else {
    addProjectInnerBtn.disabled = false;
  }
});

sidebarProjectsBtn.addEventListener("click", () => {
  if (sidebarProjectsBtn.classList.contains("expanded")) {
    sidebarProjectsBtn.classList.remove("expanded");
    projectsListContainer.classList.remove("expanded");
    sidebarArrowIcon.classList.remove("expanded");
  } else {
    sidebarProjectsBtn.classList.add("expanded");
    projectsListContainer.classList.add("expanded");
    sidebarArrowIcon.classList.add("expanded");
  }
});

addProjectInnerBtn.addEventListener("click", () => {
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

  const projectsListLiElementsBtns =
    projectsList.querySelectorAll(".sidebar-button");

  projectsListLiElementsBtns.forEach((projectsListLiElementsBtn) => {
    projectsListLiElementsBtn.classList.remove("selected");
    projects.forEach((project) => (project.selected = "false"));
  });

  let selectedBtn = null;

  projectsList.lastElementChild
    .querySelector(".sidebar-button")
    .classList.add("selected");
  const lastProject = projects[projects.length - 1];
  lastProject.selected = "true";
  // console.log(projects);

  editorHeading.innerHTML = addProjectInput.value;
  editorImage.src = "./images/project-empty-state.png";
  editorStateHeading.innerHTML = "Keep your tasks organized in projects";
  editorStateBody.innerHTML = "Group your tasks by goal or area of your life.";
  addProjectModal.classList.remove("visible");
  modalOverlay.classList.remove("visible");

  selectedBtn = projectsList.querySelector(".selected");

  projectsListLiElementsBtns.forEach((projectsListLiElementsBtn) => {
    projectsListLiElementsBtn.addEventListener("click", () => {
      projectsListLiElementsBtn.classList.remove("selected");
      projects.forEach((project) => (project.selected = "false"));
      if (selectedBtn) {
        selectedBtn.classList.remove("selected");
      }
      projectsListLiElementsBtn.classList.add("selected");
      const projectId =
        projectsListLiElementsBtn.parentNode.getAttribute("data-id");
      const selectedProject = projects.find(
        (p) => p.id === parseInt(projectId)
      );
      if (selectedProject) {
        project.selected = true;
      }
      console.log(selectedProject);

      editorHeading.textContent = projectsListLiElementsBtn.textContent;
      editorImage.src = "./images/project-empty-state.png";
      editorStateHeading.innerHTML = "Keep your tasks organized in projects";
      editorStateBody.innerHTML =
        "Group your tasks by goal or area of your life.";

      selectedBtn = projectsListLiElementsBtn;

      // console.log(projects);
    });
  });

  let deleteProjectBtns = projectsList.querySelectorAll(
    "svg.delete-project-icon"
  );

  deleteProjectBtns.forEach((deleteProjectBtn) => {
    deleteProjectBtn.addEventListener("click", deleteProject);
  });
});
