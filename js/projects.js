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
const modalOverlay = document.querySelector(".modal-overlay");
const projectsListContainer = document.querySelector(
  ".projects-list-container"
);
// better to rename - collapse/expand etc
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

  const selectedBtn = projectsList.querySelector(".selected");
  selectedBtn.addEventListener("click", (event) => {
    // event.target.classList.add()
    // selectedBtn / event.currentTarget /  event.target.closest('button')
    // if(selectedBtn.classList.contains('selected')) return
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
    console.log(projects);
    editorHeading.textContent = projectsListLiElementsBtn.textContent;
    editorImage.src = "./images/project-empty-state.png";
    editorStateHeading.innerHTML = "Keep your tasks organized in projects";
    editorStateBody.innerHTML =
      "Group your tasks by goal or area of your life.";
  });

  let deleteProjectBtns = projectsList.querySelectorAll(
    "svg.delete-project-icon"
  );

  deleteProjectBtns.forEach((deleteProjectBtn) => {
    deleteProjectBtn.addEventListener("click", (event) => {
      event.stopPropagation();
      editorHeading.textContent = "Inbox";
      editorStateHeading.textContent = "All clear";
      editorStateBody.textContent =
        "Looks like everything's organized in the right place.";
      editorImage.src = "./images/inbox-empty-state.png";
      event.target.closest("li").remove();
    });
  });
});