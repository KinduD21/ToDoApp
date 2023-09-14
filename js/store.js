let projects = [{ title: "Inbox", selected: true, id: 1, tasks: [] }];
let selectedProjectId = 1;

export function useProjects() {
  const getAllProjects = () => {
    return projects.map((project) => project);
  };

  const addProject = (project) => {
    projects.push(project);
  }

  const getSelectedProjectId = () => {
    return selectedProjectId;
  }

  const setSelectedProjectId = (projectId) => {
    const id = projectId || projects.length;
    console.log( selectedProjectId );

    projects.find((project) => project.id === selectedProjectId).selected = false;
    selectedProjectId = id;
    projects.find((project) => project.id === selectedProjectId).selected = true;
  }

  const removeProject = (projectId) => {

    projects = projects.filter((project) => project.id !== projectId);
    // const projectIndex = projects.findIndex((project) => project.id === projectId);
    // console.log( projectIndex );

    // projects.splice(projectIndex, 1);
    console.log( !projects.some(p => p.selected) );

    if(!projects.some(p => p.selected)) {
      selectedProjectId = projects.length;
    }
  }

  return {
    getAllProjects,
    addProject,
    removeProject,
    getSelectedProjectId,
    setSelectedProjectId
  }
};