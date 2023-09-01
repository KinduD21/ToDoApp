import { toggleSidebar } from "./sidebar";
import { openTModal } from "./modals.js";
const toggleSidebarBtn = document.querySelector("[data-action='toggleSidebar']");

const openTaskModalBtn = document.querySelector("[data-action='openTaskModal']");

// Toggle sidebar
toggleSidebarBtn.addEventListener("click", toggleSidebar);

// Open task modal
openTaskModalBtn.addEventListener("click", openTModal);