import { supabase } from "./supabase";

let projects = [{ title: "Inbox", selected: true, id: 1 }];
let tasks = [];

let selectedProjectId = 1;

export function useProjects() {
  const getAllProjects = async () => {
    const { data, error } = await supabase.from('projects').select();

    if(error) {
      console.error(error.message);
    }

    return data;
  };

  const addProject = (project) => {
    projects.forEach((p) => (p.selected = false));
    projects.push(project);
  };

  const getSelectedProject = () => {
    return projects.find((project) => project.selected);
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
    tasks = tasks.filter((task) => task.projectId !== projectId);
    projects = projects.filter((project) => project.id !== projectId);
  };

  return {
    getAllProjects,
    addProject,
    removeProject,
    getSelectedProjectId,
    getSelectedProject,
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

  const getProjectTasks = (projectId) => {
    return tasks.filter((task) => task.projectId === projectId);
  };

  const removeTask = (taskId) => {
    tasks = tasks.filter((task) => task.id !== taskId);
  };

  return { getAllTasks, addTask, removeTask, getProjectTasks };
}
