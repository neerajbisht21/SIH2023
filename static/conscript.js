// static/script.js
document.addEventListener("DOMContentLoaded", function () {
    const menuIcon = document.getElementById("hamburger-icon");
    const sidebar = document.getElementById("sidebar");

    // Toggle the sidebar when the menu icon is clicked
    menuIcon.addEventListener("click", function () {
        sidebar.classList.toggle("active");
    });

    // Close the sidebar when clicking outside of it
    document.addEventListener("click", function (event) {
        if (!sidebar.contains(event.target) && !menuIcon.contains(event.target) && sidebar.classList.contains("active")) {
            sidebar.classList.remove("active");
        }
    });
});
