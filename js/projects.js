import { deleteIconSvg } from "./deleteIconSvg.js";
import {
  renderProjects,
  selectProject,
  unselectProject,
} from "./sidebar.js";
import { useProjects } from "./store.js";

const { addProject, setSelectedProjectId } = useProjects();

function createProject(projectTitle) {
  const project = {
    title: projectTitle,
    selected: true,
    id: Math.floor(Math.random() * 100),
  };

  addProject(project);

  const projectItemHTML = createProjectItemHTML(project);

  setSelectedProjectId(project.id);
  unselectProject();
  renderProjects(projectItemHTML);
  selectProject();
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

export {  createProjectItemHTML, createProject };
