import { deleteIconSvg } from "./deleteIconSvg.js";
import { renderProjects, selectProject, unselectProject } from "./sidebar.js";
import { useProjects } from "./store.js";
// import { renderEditorContent } from "./editor.js";

const { getAllProjects, addProject, setSelectedProjectId } = useProjects();

function createProject(projectTitle) {
  const projects = getAllProjects();
  // inboxProjectsBtn.classList.remove("selected");
  // const projectsListLiElementsBtns =
  //   projectsList.querySelectorAll(".sidebar-button");

  // projectsListLiElementsBtns.forEach((projectsListLiElementsBtn) => {
  //   projectsListLiElementsBtn.classList.remove("selected");
  // });

  // projects.forEach((project) => (project.selected = false));

  const project = {
    title: projectTitle,
    selected: true,
    id: Math.floor(Math.random() * 100),
    tasks: [],
  };

  addProject(project);
  
  const projectItemHTML = createProjectItemHTML(project);
  
  setSelectedProjectId(project.id);
  unselectProject();
  renderProjects(projectItemHTML);
  selectProject();

  // projectsList.insertAdjacentHTML("beforeend", projectItemHtml);

  // selectedBtn = projectsList.querySelector(".selected");

  // renderEditorContent(project);

  //   if (project.id !== 1) {
  //     selectedBtn.addEventListener("click", selectProject);
  //   }
  //   selectedBtn
  //     .querySelector("svg.delete-project-icon")
  //     .addEventListener("click", deleteProject);
}

function createProjectItemHTML(projectObj) {
  return `
    <li data-id = ${projectObj.id}>
    <button class="sidebar-button ${projectObj.selected ? "selected" : ""}">
      <svg class="project-icon" viewBox="0 0 24 24">
        <path
          d="M12 7a5 5 0 110 10 5 5 0 010-10z"
          fill="currentColor"
        ></path>
      </svg>
      <span class="project-name">${projectObj.title}</span>
      ${deleteIconSvg}
    </button>
  </li>
  `;
}

// const aside = document.querySelector("aside");
// const projectsList = document.querySelector("#projects-list");
// const projectsListContainer = document.querySelector(
//   ".projects-list-container"
// );

// const sidebarProjectsCollapseBtn = document.querySelector(
//   ".sidebar-projects-button"
// );
// const sidebarArrowIcon = document.querySelector(
//   "svg.sidebar-projects-arrow-icon"
// );
// const inboxProjectsBtn = document
//   .querySelector("aside")
//   .querySelector(".sidebar-button");

// sidebarProjectsCollapseBtn.addEventListener("click", () => {
//   sidebarProjectsCollapseBtn.classList.toggle("expanded");
//   projectsListContainer.classList.toggle("expanded");
//   sidebarArrowIcon.classList.toggle("expanded");
// });

// inboxProjectsBtn.addEventListener("click", selectProject);

// // renderEditorContent(projects[0]); // Inbox

// let selectedBtn = projectsList.querySelector(".selected");

// // const addProjectForm = document.querySelector("#add-project-form");

// // addProjectInnerBtn.addEventListener("click", createProject);

// // addProjectForm.addEventListener("keydown", (event) => {
// //   if (event.key === "Enter" && !addProjectInnerBtn.disabled) {
// //     event.preventDefault();
// //     createProject();
// //     closeModal();
// //   }
// // });

// function selectProject(event) {
//   const oldSelectedProject = projects.find(
//     (projectObject) => projectObject.selected
//   );
//   oldSelectedProject.selected = false;

//   aside
//     .querySelector(`[data-id='${oldSelectedProject.id}'] button`)
//     .classList.remove("selected");

//   const newProjectId = Number(event.currentTarget.parentElement.dataset.id);
//   const newSelectedProject = projects.find(
//     (projectObject) => projectObject.id === newProjectId
//   );
//   newSelectedProject.selected = true;
//   event.currentTarget.classList.add("selected");

//   // renderEditorContent(newSelectedProject);
// }

// function deleteProject(event) {
//   event.stopPropagation();
//   if (!selectedBtn) return;

//   projectsList.querySelectorAll(".sidebar-button").forEach((btn) => {
//     btn.classList.remove("selected");
//   });

//   const projectLiElement = event.target.closest("li");
//   const projectId = Number(projectLiElement.dataset.id);

//   const projectIndex = projects.findIndex(
//     (projectObject) => projectObject.id === projectId
//   );

//   projects.splice(projectIndex, 1);
//   projectLiElement.remove();

//   inboxProjectsBtn.classList.add("selected");
//   projects[0].selected = true;
//   // renderEditorContent(projects[0]);
// }

export function addTaskToProject(task) {
  // const project = projects.find((p) => p.id == task.projectId);
  // if (project) {
  //   project.tasks.push(task);
  // }
}

export { getAllProjects, createProject };
