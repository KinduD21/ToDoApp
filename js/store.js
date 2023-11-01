import { cs } from "date-fns/locale";
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

export function useProjects() {
  const getAllProjects = async () => {
    const { data, error } = await supabase.from("projects").select();

    if (error) {
      console.error(error.message);
    }

    return data;
  };

  const addProject = async (project) => {
    // Insert the project into the Supabase "projects" table
    const { data, error } = await supabase
      .from("projects")
      .insert({ title: project.title, selected: true })
      .select();

    if (error) {
      console.error("Error inserting project:", error);
      // Handle the insert error as needed.
    } else {
      return data[0];
    }
  };

  // getSelectedProject()
  //   .then((selectedProject) => {
  //     console.log(selectedProject);
  //   })
  //   .catch((error) => {
  //     console.error("Error:", error);
  //   });

  const getSelectedProject = async () => {
    try {
      // const { data, error } = await supabase
      //   .from("projects")
      //   .select()
      //   .eq("selected", true);
      // if (error) {
      //   throw error;
      // }
      // return data;
    } catch (error) {
      console.error("Error getting the selected project:", error);
      return null; // You can choose how to handle the error, returning null in this case.
    }
  };

  const getSelectedProjectId = async () => {
    const { data } = await supabase
      .from("projects")
      .select()
      .eq("selected", true);
    console.log(data[0].id);
    return data[0].id;
  };

  const setSelectedProjectId = async (projectId) => {
    try {
      // Set "selected" to false for the previously selected project in the database.
      await supabase
        .from("projects")
        .update({ selected: false })
        .eq("selected", true);

      // Set "selected" to true for the newly selected project.
      const { error } = await supabase
        .from("projects")
        .update({ selected: true })
        .eq("id", projectId);

      if (error) {
        throw error;
      }

      projects[0].selected = false;

      // Update the selectedProjectId.
      // selectedProjectId = projectId;
      // console.log(selectedProjectId);
    } catch (error) {
      console.error("Error setting the selected project:", error);
    }
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
