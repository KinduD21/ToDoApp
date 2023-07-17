import "./projects.js";
import "./tasks.js";
import "./sidebar.js";
import { modalOverlay } from "./tasks.js";

const cancelBtns = document.querySelectorAll(".cancel-button");

modalOverlay.addEventListener("click", (event) => {
  if (event.target.classList.contains("modal-overlay")) {
    event.target.classList.remove("visible");
    event.target.querySelector(".visible").classList.remove("visible");
  }
});

cancelBtns.forEach((cancelBtn) => {
  cancelBtn.addEventListener("click", () => {
    modalOverlay.classList.remove("visible");
    cancelBtn.closest(".visible").classList.remove("visible");
  });
});
