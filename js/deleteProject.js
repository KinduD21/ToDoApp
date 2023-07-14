const editor = document.querySelector(".editor");
const editorHeading = editor.querySelector("h2");
const editorImage = editor.querySelector("img");
const editorStateHeading = editor.querySelector(".empty-state-heading");
const editorStateBody = editor.querySelector(".empty-state-body");

export function deleteProject(event) {
  event.stopPropagation();
  editorHeading.textContent = "Inbox";
  editorStateHeading.textContent = "All clear";
  editorStateBody.textContent =
    "Looks like everything's organized in the right place.";
  editorImage.src = "./images/inbox-empty-state.png";
  event.target.closest("li").remove();
}
