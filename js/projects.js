import { deleteIconSvg } from "./deleteIconSvg.js";
import { editorState, renderProjects, unselectProject } from "./sidebar.js";
import { useProjects } from "./store.js";
import { clearTasksHTML } from "./editor.js";

const { addProject, setSelectedProjectId } = useProjects();

async function createProject(projectTitle) {
  const project = await addProject({
    title: projectTitle,
    selected: true,
  });

  const projectItemHTML = createProjectItemHTML(project);

  await setSelectedProjectId(project.id);
  unselectProject();
  renderProjects(projectItemHTML);
  editorState(project.id, project.title);
  clearTasksHTML();
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

export { createProjectItemHTML, createProject };
