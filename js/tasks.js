// // import { renderEditorContent } from "./editor.js";
// import { addTaskToProject } from "./projects.js";
// import { useProjects } from "./store.js";

// const { getAllProjects } = useProjects();

// const addTaskBtn = document.querySelectorAll("[data-action='addTask']");
// const taskList = document.querySelector(".task-list");

// // addTaskInnerBtn.addEventListener("click", createTask);

// // TODO: not needed???
// // document.addEventListener("keydown", (event) => {
// //   if (event.key === "Enter" && !addTaskInnerBtn.disabled) {
// //     createTask();
// //     closeModal();
// //   }
// // });

// function createTask() {
//   const activeProject = document
//     .querySelector("aside .selected")
//     .closest("[data-id]");
//   const dueDateValue = dueDateInput.value.trim();

//   const task = {
//     title: taskNameInput.value,
//     description: taskDescriptionInput.value,
//     id: Number(addTaskBtn[0].dataset.tasksAmount) + 1,
//     date: new Date(dueDateValue),
//     priority: Number(selectedPriority.dataset.priority) || "",
//     projectId: Number(activeProject.dataset.id),
//   };

//   const projects = getAllProjects();
//   const project = projects.find((p) => task.projectId === p.id);

//   addTaskToProject(task);

//   addTaskBtn.forEach((btn) => (btn.dataset.tasksAmount = project.tasks.length)); // Update addTask btn dataset value

//   console.log(task);

//   renderEditorContent(task);
// }

// function renderTasks(filteredTasks) {
//   const tasksToRender = filteredTasks.map((task) => {
//     return `<li class="task-button" data-id = ${task.id}>
//       <div class="task-button-top">
//         <div class="task-button-top-left">
//           <button class="task-button-checkbox-button" data-priority= ${
//             task.priority
//           }>
//             <svg class="task-button-checkbox-icon project-icon">
//               <path
//                 fill="currentColor"
//                 d="M11.23 13.7l-2.15-2a.55.55 0 0 0-.74-.01l.03-.03a.46.46 0 0 0 0 .68L11.24 15l5.4-5.01a.45.45 0 0 0 0-.68l.02.03a.55.55 0 0 0-.73 0l-4.7 4.35z"
//               ></path>
//             </svg>
//           </button>
//           <p class="task-button-task-name">${task.title}</p>
//         </div>
//         <div class="task-button-top-right"></div>
//       </div>
//       <div class="task-button-description" style=${
//         task.description === "" ? "display:none" : ""
//       }>
//         <p class="task-button-description-text">${task.description}</p>
//       </div>
//       <div class="task-button-due-date">
//         <div class="task-button-due-date-left">
//           <svg viewBox="0 0 12 12" fill="none" class="calendar-icon">
//             <path
//               fill="currentColor"
//               fill-rule="evenodd"
//               clip-rule="evenodd"
//               d="M9.5 1h-7A1.5 1.5 0 001 2.5v7A1.5 1.5 0 002.5 11h7A1.5 1.5 0 0011 9.5v-7A1.5 1.5 0 009.5 1zM2 2.5a.5.5 0 01.5-.5h7a.5.5 0 01.5.5v7a.5.5 0 01-.5.5h-7a.5.5 0 01-.5-.5v-7zM8.75 8a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM3.5 4a.5.5 0 000 1h5a.5.5 0 000-1h-5z"
//             ></path>
//           </svg>
//           <p class="task-button-due-date-text">${formatDate(task.date)}</p>
//         </div>
//       </div>
//     </li>`;
//   });

//   taskList.innerHTML = "";
//   // console.log( tasksToRender, 'tasksToRender' );
//   // console.log( taskList, 'taskList' );

//   tasksToRender.forEach((taskTemplate) => {
//     taskList.insertAdjacentHTML("beforeend", taskTemplate);
//   });
// }

// taskList.addEventListener("click", function (event) {
//   const target = event.target;
//   if (target.classList.contains("task-button-checkbox-button")) {
//     const taskElement = target.closest("[data-id]");
//     if (taskElement) {
//       const taskId = parseInt(taskElement.dataset.id);
//       taskDelete(taskId);
//     }
//   }
// });

// function taskDelete(taskId) {
//   const projects = getAllProjects();
//   const project = projects.find((p) => p.selected === true);

//   if (project.id === 1) {
//     const foundProject = projects.find((p) =>
//       p.tasks.find((t) => p.id === t.projectId)
//     );
//     console.log(foundProject);

//     const taskIndex = foundProject.tasks.findIndex((t) => t.id === taskId);
//     foundProject.tasks.splice(taskIndex, 1);
//     // console.log(foundProject.tasks);
//   } else {
//     const taskIndex = project.tasks.findIndex((t) => t.id === taskId);
//     project.tasks.splice(taskIndex, 1);
//   }

//   renderEditorContent(project);
// }

// export { renderTasks };

import { renderTasks } from "./editor.js";
import { useProjects, useTasks } from "./store.js";
import { formatDate } from "./utils.js";

const { getSelectedProjectId } = useProjects();
const { getAllTasks, addTask } = useTasks();

function createTask(taskModalForm) {
  const task = {
    title: taskModalForm.taskName.value,
    description: taskModalForm.taskDescription.value,
    date: new Date(taskModalForm.taskDate.value.trim()),
    priority: Number(taskModalForm.taskPriority.children[0].dataset.priority),
    id: Math.floor(Math.random() * 100),
    projectId: getSelectedProjectId(),
  };
  
  if (taskModalForm.taskDate.value.trim() === "") {
    task.date = "";
  }

  addTask(task);

  const taskItemHTML = createTaskItemHTML(task);

  renderTasks(taskItemHTML);
}

function createTaskItemHTML(taskObj) {
  return `
    <li class="task-button" data-id = ${taskObj.id}>
      <div class="task-button-top">
        <div class="task-button-top-left">
          <button class="task-button-checkbox-button" data-priority= ${
            taskObj.priority
          }>
              <svg class="task-button-checkbox-icon project-icon">
                <path
                  fill="currentColor"
                  d="M11.23 13.7l-2.15-2a.55.55 0 0 0-.74-.01l.03-.03a.46.46 0 0 0 0 .68L11.24 15l5.4-5.01a.45.45 0 0 0 0-.68l.02.03a.55.55 0 0 0-.73 0l-4.7 4.35z"
                ></path>
              </svg>
            </button>
            <p class="task-button-task-name">${taskObj.title}</p>
          </div>
          <div class="task-button-top-right"></div>
        </div>
        <div class="task-button-description" style=${
          taskObj.description === "" ? "display:none" : ""
        }>
          <p class="task-button-description-text">${taskObj.description}</p>
        </div>
        <div class="task-button-due-date" style=${
          taskObj.date === "" ? "display:none" : ""
        }>
          <div class="task-button-due-date-left">
            <svg viewBox="0 0 12 12" fill="none" class="calendar-icon">
              <path
                fill="currentColor"
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M9.5 1h-7A1.5 1.5 0 001 2.5v7A1.5 1.5 0 002.5 11h7A1.5 1.5 0 0011 9.5v-7A1.5 1.5 0 009.5 1zM2 2.5a.5.5 0 01.5-.5h7a.5.5 0 01.5.5v7a.5.5 0 01-.5.5h-7a.5.5 0 01-.5-.5v-7zM8.75 8a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM3.5 4a.5.5 0 000 1h5a.5.5 0 000-1h-5z"
              ></path>
            </svg>
            <p class="task-button-due-date-text">${
              taskObj.date === "" ? "" : formatDate(taskObj.date)
            }</p>
          </div>
        </div>
    </li>
  `;
}

export { createTask };
