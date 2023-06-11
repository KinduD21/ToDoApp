const hideMenuBtn = document.querySelector("#hide-menu-button");
const editor = document.querySelector(".editor");
const sidebar = document.querySelector("aside");
const sidebarOverlay = document.querySelector(".sidebar-overlay");

hideMenuBtn.addEventListener("click", () => {
  if (sidebar.classList.contains("isSidebarVisible")) {
    sidebar.classList.remove("isSidebarVisible");
    sidebarOverlay.classList.remove("isSidebarOverlayVisible");
  } else {
    sidebar.classList.add("isSidebarVisible");
    sidebarOverlay.classList.add("isSidebarOverlayVisible");
  }
});

window.onclick = function (event) {
  if (
    event.target == sidebarOverlay &&
    sidebarOverlay.classList.contains("isSidebarOverlayVisible")
  ) {
    sidebar.classList.remove("isSidebarVisible");
    sidebarOverlay.classList.remove("isSidebarOverlayVisible");
  }
};
