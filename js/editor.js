// import { renderTasks } from "./tasks.js";
import { assistOpenTaskModal } from "./modals.js";
import { useProjects } from "./store.js";

const { getAllProjects } = useProjects();

const editor = document.querySelector(".editor");
const stateContainer = editor.querySelector(".state-container");
const editorHeading = editor.querySelector("h2");
const openTaskModalBtn = editor.querySelector("[data-action='openTaskModal']");

// Open task modal
openTaskModalBtn.addEventListener("click", assistOpenTaskModal);

const emptyStateEditor = `
  <img src="/inbox-empty-state.png" alt="Task list is empty" />
  <h4>All clear</h4>
  <p>
    Looks like everything's organized in the right place.
  </p>
`;

const emptyProjectStateEditor = `
  <img src="/project-empty-state.png" alt="Task list is empty" />
  <h4>Keep your tasks organized in projects.</h4>
  <p>
  Group your tasks by goal or area of your life.
  </p>
`;

// Add Project functions
function projectEmptyState(projectId) {
  renderTasks([]);

  const projects = getAllProjects();
  const selectedProject = projects.find((p) => p.id === Number(projectId));

  editorHeading.innerHTML = selectedProject.title;
  stateContainer.innerHTML =
    projectId === 1 ? emptyStateEditor : emptyProjectStateEditor;
}

function projectHasTasksState(projectId) {
  renderTasks([]);

  const projects = getAllProjects();
  const selectedProject = projects.find((p) => p.id === Number(projectId));

  if (projectId === 1) {
    let allTasks = projects.map((p) => p.tasks);
    allTasks = allTasks.flat();
    //allTasks = [ [{}, {}] ] - ...allTasks = [{}, {}]
    //allTasks = { id: 1, title: 'name' } - { ...allTasks } =
    // const obj = {id: 1, title: 'asdsadsa'};
    // const arrayTest = [];
    // console.log( arrayTest );

    // const allTasksTest =  [1,2,3,4,5,6]; //
    // const test = allTasksTest;
    // const a = [1,2,3,4,5,6]
    // const b = [...a] // {} - reference

    // console.log( a );
    renderTasks(allTasks); // [[{}, {}]] - [{}, {}]
  } else {
    renderTasks(selectedProject.tasks);
  }

  editorHeading.innerHTML = selectedProject.title;
  stateContainer.innerHTML = "";
}

// NOTE: obj === project object / task object
function renderEditorContent(obj) {
  const isTask = Boolean(obj.projectId);

  if (!isTask) {
    const project = { ...obj };

    if (project.id === 1) {
      const hasTasks = Boolean(project.tasks.length);
      const otherProjectsHasTasks = Boolean(
        getAllProjects().find((p) => p.tasks.length)
      );
      const addTaskBtn = document.querySelectorAll("[data-action='addTask']");

      if (!hasTasks && !otherProjectsHasTasks) {
        addTaskBtn.forEach((btn) => (btn.dataset.tasksAmount = 0));
        projectEmptyState(project.id);
      } else {
        addTaskBtn.forEach(
          (btn) => (btn.dataset.tasksAmount = project.tasks.length)
        );
        projectHasTasksState(project.id);
      }

      return;
    }

    const hasTasks = Boolean(project.tasks.length);
    const addTaskBtn = document.querySelectorAll("[data-action='addTask']");

    if (!hasTasks) {
      addTaskBtn.forEach((btn) => (btn.dataset.tasksAmount = 0));
      projectEmptyState(project.id);
    } else {
      addTaskBtn.forEach(
        (btn) => (btn.dataset.tasksAmount = project.tasks.length)
      );
      projectHasTasksState(project.id);
    }
  } else {
    const task = obj;
    projectHasTasksState(task.projectId);
  }
}

export { renderEditorContent };
