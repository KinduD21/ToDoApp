const projectsList = document.querySelector("#projects-list");
const addProjectInput = document.querySelector("#project_name");
const addProjectModal = document.querySelector(".add-project-modal");
const modalOverlay = document.querySelector(".modal-overlay");
const editor = document.querySelector(".editor");
const editorHeading = editor.querySelector("h2");
const editorImage = editor.querySelector("img");
const editorStateHeading = editor.querySelector(".empty-state-heading");
const editorStateBody = editor.querySelector(".empty-state-body");
const inboxProjectsBtn = document
  .querySelector("aside")
  .querySelector(".sidebar-button");

inboxProjectsBtn.addEventListener("click", () => {
  inboxProjectsBtn.classList.add("selected");
  editorHeading.textContent = "Inbox";
  editorImage.src = "./images/inbox-empty-state.png";
  editorStateHeading.textContent = "All clear";
  editorStateBody.textContent =
    "Looks like everything's organized in the right place.";
});

function projectCreatedState() {
  editorHeading.innerHTML = addProjectInput.value;
  editorImage.src = "./images/project-empty-state.png";
  editorStateHeading.innerHTML = "Keep your tasks organized in projects";
  editorStateBody.innerHTML = "Group your tasks by goal or area of your life.";
  addProjectModal.classList.remove("visible");
  modalOverlay.classList.remove("visible");
}

function editorInitialState() {
  //   inboxProjectsBtn.classList.add("selected");
  editorHeading.textContent = "Inbox";
  editorImage.src = "./images/inbox-empty-state.png";
  editorStateHeading.textContent = "All clear";
  editorStateBody.textContent =
    "Looks like everything's organized in the right place.";
}

function projectSelectedState() {
  editorHeading.textContent =
    projectsList.querySelector(".selected").textContent;
  editorImage.src = "./images/project-empty-state.png";
  editorStateHeading.innerHTML = "Keep your tasks organized in projects";
  editorStateBody.innerHTML = "Group your tasks by goal or area of your life.";
}

function projectDeletedState() {
  projectsList.lastElementChild
    .querySelector(".sidebar-button")
    .classList.add("selected");
  editorHeading.textContent =
    projectsList.lastElementChild.querySelector(".sidebar-button").textContent;
}

export {
  projectCreatedState,
  editorInitialState,
  projectSelectedState,
  projectDeletedState,
};
