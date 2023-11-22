import { assistOpenProjectModal } from "./modals.js";
import { useProjects, useTasks, projects } from "./store.js";
import { createTaskItemHTML } from "./tasks.js";
import { createProjectItemHTML } from "./projects.js";
import {
  renderTasks,
  clearTasksHTML,
  clearEditorStateContainer,
  editorState,
} from "./editor.js";
import { supabase } from "./supabase.js";

const {
  getAllProjects,
  getSelectedProjectId,
  setSelectedProjectId,
  removeProject,
} = useProjects();

const { getAllTasks, getProjectTasks } = useTasks();

const sidebar = document.querySelector("#sidebar");
const sidebarOverlay = document.querySelector(".sidebar-overlay");
const openProjectModalBtn = document.querySelector(
  "[data-action='openProjectModal']"
);

const sidebarProjectsList = sidebar.querySelector("#projectsList");
const sidebarProjectsListContainer = document.querySelector(
  ".projects-list-container"
);
const sidebarProjectsCollapseBtn = document.querySelector(
  ".sidebar-projects-button"
);
const sidebarArrowIcon = document.querySelector(
  "svg.sidebar-projects-arrow-icon"
);

// Call editorState function onload

editorState(await getSelectedProjectId());

// Check if other projects exist, if so - set "Inbox" selected to false

const projectsData = await getAllProjects();

if (projectsData.length) {
  projects[0].selected = false;
  sidebar
    .querySelector(`li[data-id="1"] > button`)
    .classList.remove("selected");
}

projectsData.forEach((projectObj) => {
  const projectItemHTML = createProjectItemHTML(projectObj);
  renderProjects(projectItemHTML);
});

sidebarProjectsCollapseBtn.addEventListener("click", () => {
  sidebarProjectsCollapseBtn.classList.toggle("expanded");
  sidebarProjectsListContainer.classList.toggle("expanded");
  sidebarArrowIcon.classList.toggle("expanded");
});

sidebar.addEventListener("click", async (event) => {
  const button = event.target.closest("button.sidebar-button");

  if (!button) return;

  const projectId = Number(button.parentElement.dataset.id);

  const svgEl = event.target.closest("svg");
  if (svgEl?.classList.contains("delete-project-icon")) {
    const supabaseProjects = await getAllProjects();
    const removedProject = supabaseProjects.find((p) => p.id === projectId);

    if (!removedProject.selected) {
      if (projects[0].selected) {
        projects[0].selected = true;
      }
    } else if (
      removedProject === supabaseProjects[supabaseProjects.length - 1]
    ) {
      if (supabaseProjects.length === 1) {
        projects[0].selected = true;
      } else {
        await setSelectedProjectId(
          supabaseProjects[supabaseProjects.length - 2].id
        );
      }
    } else {
      await setSelectedProjectId(
        supabaseProjects[supabaseProjects.indexOf(removedProject) + 1].id
      );
    }

    await removeProject(projectId);
    removeProjectHTML(projectId);
    clearEditorStateContainer();
    await editorState(projectId);
    selectProject();
  } else {
    await setSelectedProjectId(projectId);
    unselectProject();
    await editorState(projectId);
    selectProject();
  }
});

sidebarOverlay.addEventListener("click", () => {
  sidebarOverlay.classList.remove("visible");
  sidebar.classList.remove("visible");
});

const toggleSidebar = function () {
  sidebar.classList.toggle("visible");
  sidebarOverlay.classList.toggle("visible");
};

function renderProjects(projectTemplate) {
  sidebarProjectsList.insertAdjacentHTML("beforeend", projectTemplate);
}

function unselectProject() {
  sidebar
    .querySelectorAll(".selected")
    .forEach((el) => el.classList.remove("selected"));
}

async function selectProject() {
  const id = await getSelectedProjectId();
  sidebar
    .querySelector(`li[data-id="${id}"] > button`)
    .classList.add("selected");

  clearEditorStateContainer();

  let filteredTasks = [];

  const tasksToFilter = async (projectId) => {
    const { data } = await supabase
      .from("tasks")
      .select()
      .eq("projectId", projectId);

    return data;
  };
  await tasksToFilter(id);

  if (id === 1) {
    filteredTasks = await getAllTasks();
  } else {
    filteredTasks = await getProjectTasks(id);
  }
  clearTasksHTML();
  filteredTasks.forEach((t) => {
    const taskTemplate = createTaskItemHTML(t);
    renderTasks(taskTemplate);
  });
  await editorState(id);
}

function removeProjectHTML(projectId) {
  const projectLiElement = sidebar.querySelector(`li[data-id="${projectId}"]`);
  projectLiElement.remove();
}

// Open project modal
openProjectModalBtn.addEventListener("click", assistOpenProjectModal);

export {
  toggleSidebar,
  renderProjects,
  unselectProject,
  selectProject,
  editorState,
};
