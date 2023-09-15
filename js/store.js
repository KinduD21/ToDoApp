let projects = [{ title: "Inbox", selected: true, id: 1, tasks: [] }];
let selectedProjectId = 1;

export function useProjects() {
  const getAllProjects = () => {
    return projects.map((project) => project);
  };

  const addProject = (project) => {
    projects.forEach((p) => (p.selected = false));
    projects.push(project);
    console.log(projects, "create project");
  };

  const getSelectedProjectId = () => {
    return selectedProjectId;
  };

  const setSelectedProjectId = (projectId) => {
    projects.forEach((p) => (p.selected = false));
    selectedProjectId = projectId;
    projects.find((p) => p.id === projectId).selected = true;

    console.log(projects, "select project");

    // projects.find(
    //   (project) => project.id === selectedProjectId
    // ).selected = false;

    // selectedProjectId = projectId;

    // projects.find(
    //   (project) => project.id === selectedProjectId
    // ).selected = true;
  };

  const removeProject = (projectId) => {
    let selectedProject = projects.find((p) => p.id === projectId);

    projects = projects.filter((project) => project.id !== projectId);
    
    if ((selectedProject.selected = false)) {
      setSelectedProjectId(projects[projects.length - 1].id);
    } else {
      setSelectedProjectId(projects[0].id);
    }

    // const projectIndex = projects.findIndex((project) => project.id === projectId);
    // console.log( projectIndex );

    // projects.splice(projectIndex, 1);
    // console.log( !projects.some(p => p.selected) );

    // if (!projects.some((p) => p.selected)) {
    //   selectedProjectId = projects.length;
    // }
  };

  return {
    getAllProjects,
    addProject,
    removeProject,
    getSelectedProjectId,
    setSelectedProjectId,
  };
}
