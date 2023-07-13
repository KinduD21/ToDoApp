import { deleteIconSvg } from "./deleteIconSvg.js";

const projects = [];
const editor = document.querySelector(".editor");
const editorHeading = editor.querySelector("h2");
const editorImage = editor.querySelector("img");
const editorStateHeading = editor.querySelector(".empty-state-heading");
const editorStateBody = editor.querySelector(".empty-state-body");
const projectsList = document.querySelector("#projects-list");
// TODO: use only what projects need (not modal for ex)
const addProjectModal = document.querySelector(".add-project-modal");
const addProjectInput = document.querySelector("#project_name");
const modalOverlay = document.querySelector(".modal-overlay");
const projectsListContainer = document.querySelector(
  ".projects-list-container"
);
const sidebarProjectsArrowIcon = document.querySelector(
  ".sidebar-projects-arrow-icon"
);

let addProjectInnerBtn = addProjectModal.querySelector("button[disabled]"); // optimize? 100 modalok?)))

sidebarProjectsArrowIcon.addEventListener("click", () => {
  if (sidebarProjectsArrowIcon.classList.contains("expanded")) {
    sidebarProjectsArrowIcon.classList.remove("expanded");
    projectsListContainer.classList.remove("expanded");
  } else {
    sidebarProjectsArrowIcon.classList.add("expanded");
    projectsListContainer.classList.add("expanded");
  }
});

addProjectInput.addEventListener("keyup", () => {
  if (addProjectInput.value.trim() === "") {
    addProjectInnerBtn.disabled = true;
  } else {
    addProjectInnerBtn.disabled = false;
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

  const projectsListLiElements = document.querySelectorAll("#projects-list li");
  const projectsListLiElementsBtns =
    projectsList.querySelectorAll(".sidebar-button");

  // console.log(projectsListLiElementsBtns);
  projectsListLiElementsBtns.forEach((projectsListLiElementsBtn) => {
    projectsListLiElementsBtn.classList.remove("selected");
  });

  // forEach - remove selected.true

  // project.selected = true
  // let selectedBtn = null;
  // selectedBtn = projectsListLiElements;
});

// let projectsListLiSpanElement = document.querySelector("span.project-name");
// projectsListLiSpanElement.textContent = project.title;
// let clonedLiElement = projectsListLiElement.cloneNode(true);
// projectsList.appendChild(clonedLiElement);
// let clonedLiElementBtns = projectsList.querySelectorAll(".sidebar-button");
// let clonedLiElementBtn = clonedLiElement.querySelector(".sidebar-button");
// let selectedBtn = null;
// clonedLiElement.style.display = "flex";
// clonedLiElementBtns.forEach((clonedLiElementBtn) => {
//   clonedLiElementBtn.classList.remove("selected");
// });
// clonedLiElementBtn.classList.add("selected");
// selectedBtn = clonedLiElementBtn;

// editorHeading.innerHTML = addProjectInput.value;
// editorImage.src = "./images/project-empty-state.png";
// editorStateHeading.innerHTML = "Keep your tasks organized in projects";
// editorStateBody.innerHTML = "Group your tasks by goal or area of your life.";
// addProjectModal.classList.remove("visible");
// modalOverlay.classList.remove("visible");

// clonedLiElementBtns.forEach((clonedLiElementBtn) => {
//   clonedLiElementBtn.addEventListener("click", () => {
//     clonedLiElementBtn.classList.remove("selected");
//     if (selectedBtn) {
//       selectedBtn.classList.remove("selected");
//     }
//     clonedLiElementBtn.classList.add("selected");
//     editorHeading.textContent = clonedLiElementBtn.textContent;
//     selectedBtn = clonedLiElementBtn;
//   });
// });

// let deleteProjectBtns = clonedLiElement.querySelectorAll(
//   "svg.delete-project-icon"
// );

// deleteProjectBtns.forEach((deleteProjectBtn) => {
//   deleteProjectBtn.addEventListener("click", (event) => {
//     event.stopPropagation();
//     editorHeading.textContent = "Inbox"; // rewrite code, if there's more than just "Inbox" folder
//     editorStateHeading.textContent = "All clear";
//     editorStateBody.textContent =
//       "Looks like everything's organized in the right place.";
//     editorImage.src = "./images/inbox-empty-state.png";
//     deleteProjectBtn.closest("li").remove();
//   });
// });
