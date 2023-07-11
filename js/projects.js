const projects = [];
const editor = document.querySelector(".editor");
const editorHeading = editor.querySelector("h2");
const editorImage = editor.querySelector("img");
const editorStateHeading = editor.querySelector(".empty-state-heading");
const editorStateBody = editor.querySelector(".empty-state-body");
const projectsList = document.querySelector("#projects-list");
const projectsListLiElement = document.querySelector("#projects-list li");
// TODO: use only what projects need (not modal for ex)
const addProjectModal = document.querySelector(".add-project-modal");
const addProjectInput = document.querySelector("#project_name");
const modalOverlay = document.querySelector(".modal-overlay");

let addProjectInnerBtn = addProjectModal.querySelector("button[disabled]"); // optimize? 100 modalok?)))
const projectsListContainer = document.querySelector(
  ".projects-list-container"
);
const sidebarProjectsArrowIcon = document.querySelector(
  ".sidebar-projects-arrow-icon"
);

// module modal
// let open = false
// export function modalProjects() {
//     createProject
// }

// export function modalTasks() {
//   createProject
// }

// //module project
// import { modalProjects } from './modal'
// modalProject('projects')

// //module tasks
// import { modaltasks } from './modal'
// modalTasks('tasks')

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

  projects.push(project);

  // forEach - remove selected.true

  // project.selected = true

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
      <svg class="delete-project-icon">
        <g fill="none" fill-rule="evenodd">
          <path d="M0 0h24v24H0z"></path>
          <rect x="5" y="6" fill="currentColor" rx=".5"></rect>
          <path
            fill="currentColor"
            d="M10 9h1v8h-1V9zm3 0h1v8h-1V9z"
          ></path>
          <path
            stroke="currentColor"
            d="M17.5 6.5h-11V18A1.5 1.5 0 0 0 8 19.5h8a1.5 1.5 0 0 0 1.5-1.5V6.5zm-9 0h7V5A1.5 1.5 0 0 0 14 3.5h-4A1.5 1.5 0 0 0 8.5 5v1.5z"
          ></path>
        </g>
      </svg>
    </button>
  </li>
  `; // import SVG from separate modules

  projectsList.insertAdjacentHTML("beforeend", projectItemHtml);

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
});
