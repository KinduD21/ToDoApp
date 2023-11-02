import { cs } from "date-fns/locale";
import { supabase } from "./supabase";

export let projects = [{ title: "Inbox", selected: true, id: 1 }];

// const isInboxIncluded = async () => {
//   const { data, error } = await supabase
//     .from("projects")
//     .select()
//     .eq("title", "Inbox");

//   if (error) {
//     console.error("An error occurred:", error);
//   } else if (data && data.length === 0) {
//     const { data: insertedData, error: insertError } = await supabase
//       .from("projects")
//       .insert([{ title: "Inbox", selected: true }]);
//   }
// };

// isInboxIncluded();

let tasks = [];

export function useProjects() {
  const getAllProjects = async () => {
    const { data, error } = await supabase.from("projects").select();

    if (error) {
      console.error(error.message);
    }

    return data;
  };

  const addProject = async (project) => {
    const { data, error } = await supabase
      .from("projects")
      .insert({ title: project.title, selected: true })
      .select();

    if (error) {
      console.error("Error inserting project:", error);
    } else {
      return data[0];
    }
  };

  const getSelectedProject = async () => {
    const { data, error } = await supabase
      .from("projects")
      .select()
      .eq("selected", true);
    if (error) {
      throw error;
    }
    return data[0];
  };

  const getSelectedProjectId = async () => {
    const { data } = await supabase
      .from("projects")
      .select()
      .eq("selected", true);
    if (data.length === 0) {
      return 1;
    } else {
      return data[0].id;
    }
  };

  const setSelectedProjectId = async (projectId) => {
    try {
      // Set "selected" to false for the previously selected project in the database.
      let selectedProjectId = await getSelectedProjectId();

      await supabase
        .from("projects")
        .update({ selected: false })
        .eq("id", selectedProjectId);

      // Set "selected" to true for the newly selected project.
      const { error } = await supabase
        .from("projects")
        .update({ selected: true })
        .eq("id", projectId);

      if (error) {
        throw error;
      }

      projects[0].selected = false;
    } catch (error) {
      console.error("Error setting the selected project:", error);
    }
  };

  const removeProject = async (projectId) => {
    // tasks = tasks.filter((task) => task.projectId !== projectId);

    const { error } = await supabase
      .from("projects")
      .delete()
      .eq("id", projectId);

    if (error) {
      console.error("Error removing project:", error);
    }
  };

  return {
    getAllProjects,
    addProject,
    removeProject,
    getSelectedProject,
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

  const getProjectTasks = (projectId) => {
    return tasks.filter((task) => task.projectId === projectId);
  };

  const removeTask = (taskId) => {
    tasks = tasks.filter((task) => task.id !== taskId);
  };

  return { getAllTasks, addTask, removeTask, getProjectTasks };
}
