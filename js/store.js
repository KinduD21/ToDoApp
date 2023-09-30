let projects = [{ title: "Inbox", selected: true, id: 1}];
let tasks = [];

let selectedProjectId = 1;

export function useProjects() {
  const getAllProjects = () => {
    return projects.map((project) => project);
  };

  const addProject = (project) => {
    projects.forEach((p) => (p.selected = false));
    projects.push(project);
  };

  const getSelectedProjectId = () => {
    return selectedProjectId;
  };

  const setSelectedProjectId = (projectId) => {
    projects.forEach((p) => (p.selected = false));
    selectedProjectId = projectId;
    projects.find((p) => p.id === projectId).selected = true;
  };

  const removeProject = (projectId) => {
    projects = projects.filter((project) => project.id !== projectId);
  };

  return {
    getAllProjects,
    addProject,
    removeProject,
    getSelectedProjectId,
    setSelectedProjectId,
  };
}

export function useTasks() {
  const getAllTasks = () => {
    return tasks.map((task) => task);
  };

  const addTask = (task) => {
    tasks.push(task);
  };

  const removeTask = (taskId) => {
    tasks = tasks.filter((task) => task.id !== taskId);
  };

  return { getAllTasks, addTask, removeTask };
}