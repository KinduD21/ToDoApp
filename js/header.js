import { toggleSidebar, clearAllFunction } from "./sidebar.js";
import { assistOpenTaskModal } from "./modals.js";

const toggleSidebarBtn = document.querySelector(
  "[data-action='toggleSidebar']"
);

const openTaskModalBtn = document.querySelector(
  "[data-action='openTaskModal']"
);

const clearAllBtn = document.querySelector("[data-action='clearAll']");

// Toggle sidebar
toggleSidebarBtn.addEventListener("click", toggleSidebar);

// Open task modal
openTaskModalBtn.addEventListener("click", assistOpenTaskModal);

// Clear all button

clearAllBtn.addEventListener("click", clearAllFunction);
