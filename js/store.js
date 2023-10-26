import { supabase } from "./supabase";

let projects = [{ title: "Inbox", selected: true, id: 1 }];

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

let selectedProjectId = 1;

export function useProjects() {
  const getAllProjects = async () => {
    const { data, error } = await supabase.from("projects").select();

    if (error) {
      console.error(error.message);
    }

    return data;
  };

  const addProject = (project) => {
    projects.forEach((p) => (p.selected = false));
    projects.push(project);

    const insertProjectToSupabase = async (project) => {
      // Insert the project into the Supabase "projects" table
      const { data, error } = await supabase
        .from("projects")
        .insert({ title: project.title, selected: true });

      if (error) {
        console.error("Error inserting project:", error);
        // Handle the insert error as needed.
      } else {
        console.log("Project inserted successfully:", data);
      }
    };

    insertProjectToSupabase(project);
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
    const removeProjectFromSupabase = async (projectId) => {
      const { error } = await supabase
        .from("projects")
        .delete()
        .eq("id", projectId);

      if (error) {
        console.error("Error removing project:", error);
        // Handle the insert error as needed.
      } else {
        console.log("Project removed successfully:", data);
      }
    };
    removeProjectFromSupabase(projectId);
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
