const sidebar = document.querySelector("aside");
const sidebarOverlay = document.querySelector(".sidebar-overlay");

sidebarOverlay.addEventListener("click", () => {
  sidebarOverlay.classList.remove("visible");
  sidebar.classList.remove("visible");
});

const toggleSidebar = function() {
  if (sidebar.classList.contains("visible")) {
    sidebar.classList.remove("visible");
    sidebarOverlay.classList.remove("visible");
  } else {
    sidebar.classList.add("visible");
    sidebarOverlay.classList.add("visible");
  }
};

export { toggleSidebar };