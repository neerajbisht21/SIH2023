// static/script.js
document.addEventListener("DOMContentLoaded", function () {
    const menuIcon = document.getElementById("menu-icon");
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


// Get dialog box and teacher info elements
const dialogBox = document.getElementById("dialog-box");
const dialogText = document.getElementById("dialog-text");
const collegeInfo = document.getElementById("college-info");
const collegeName = document.getElementById("college-name");
const collegeDescription = document.getElementById("college-description");
const collegeRating = document.getElementById("college-rating");

// Get all result items and add hover event listeners
const resultItems = document.querySelectorAll(".result-item");
resultItems.forEach((item) => {
    item.addEventListener("mouseover", () => {
        // Get the college's name from the hovered result item
        const collegeNameText = item.getAttribute("data-college-name");
        const college = college.find((t) => t.name === collegeNameText);

        if (college) {
            // Populate the collage information
            Name.textContent = collage.name;
            teacherDescription.textContent = teacher.description;
            teacherRating.textContent = `Rating: ${teacher.rating}`;
            
            // Position the teacher info near the result item
            const rect = item.getBoundingClientRect();
            teacherInfo.style.top = rect.bottom + "px";
            teacherInfo.style.left = rect.left + "px";
            teacherInfo.style.display = "block"; // Show the teacher info
        }
    });

    item.addEventListener("mouseout", () => {
        // Hide the teacher info when the mouse leaves the result item
        teacherInfo.style.display = "none";
    });
});