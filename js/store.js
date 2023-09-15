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
  };

  const removeProject = (projectId) => {
    let removedProject = projects.find((p) => p.id === projectId);

    projects = projects.filter((project) => project.id !== projectId);

    if ((removedProject.selected === false)) {
      if (projects[0].selected === true) {
        setSelectedProjectId(projects[0].id);
      }
    } else {
      setSelectedProjectId(projects[projects.length - 1].id);
    }
  };

  return {
    getAllProjects,
    addProject,
    removeProject,
    getSelectedProjectId,
    setSelectedProjectId,
  };
}
