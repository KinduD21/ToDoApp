import { supabase } from "./supabase";

export let projects = [{ title: "Inbox", selected: true, id: 1 }];

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
    const { data } = await supabase
      .from("projects")
      .select()
      .eq("selected", true);
    if (data.length === 0) {
      return 1;
    } else {
      return data[0];
    }
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
    const { tasks } = await supabase
      .from("tasks")
      .delete()
      .eq("projectId", projectId);

    const { projects } = await supabase
      .from("projects")
      .delete()
      .eq("id", projectId);
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
  const getAllTasks = async () => {
    const { data } = await supabase.from("tasks").select();

    return data;
  };

  const addTask = async (task) => {
    const { data } = await supabase
      .from("tasks")
      .insert({
        title: task.title,
        description: task.description,
        date: task.date,
        priority: task.priority,
        projectId: task.projectId,
      })
      .select();

    return data[0];
  };

  const getProjectTasks = async (projectId) => {
    const { data } = await supabase
      .from("tasks")
      .select()
      .eq("projectId", projectId);
    return data;
  };

  const removeTask = async (taskId) => {
    const { data } = await supabase.from("tasks").delete().eq("id", taskId);
  };

  return { getAllTasks, addTask, removeTask, getProjectTasks };
}
