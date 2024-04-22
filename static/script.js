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

    // Get the search form and learning mode question elements
    const searchForm = document.getElementById("search-form");
    const learningModeQuestion = document.getElementById("learning-mode-question");
    const nextButton = document.getElementById("next-button");

    // Listen for the form submission event
    searchForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent the form from submitting

        // Hide the search form and show the learning mode question
        searchForm.style.display = "none";
        learningModeQuestion.style.display = "block";
    });

    // Handle the "Next" button click event
    nextButton.addEventListener("click", function () {
        // Get the selected learning mode
        const learningMode = document.getElementById("learning-mode").value;
        const expertiseLevel = document.getElementById("expertise-level").value;
        const lessonType = document.querySelector('input[name="lesson-type"]:checked').value;

        // Get the entered topic and convert it to lowercase
        const topic = document.getElementById("topic").value.toLowerCase();

        // Fetch the best teacher data based on topic and learning mode
        fetch(`/get_best_teacher?topic=${topic}&learning_mode=${learningMode}&expertise_level=${expertiseLevel}&lesson_type=${lessonType}`)
            .then((response) => response.json())
            .then((data) => {
                // Process the response data
                const bestTeachers = data.best_teachers;

                // Get the result display elements
                const result = document.getElementById("result");
                const topicHighlight = document.getElementById("topic-highlight");
                const learningModeHighlight = document.getElementById("learning-mode-highlight");
                const bestTeacher = document.getElementById("best-teacher");

                // Create a <ul> element to hold the list of best teachers
                const teacherList = document.createElement("ul");

                bestTeachers.forEach((teacher) => {
                    // Create a <li> element for each teacher
                    const teacherItem = document.createElement("li");
                    teacherItem.textContent = teacher;

                    // Add the tooltip (white rectangular box) containing the teacher's name
                    const tooltip = document.createElement("div");
                    tooltip.className = "tooltip";
                    tooltip.textContent = '------------------teacher_name--------------------------------teacher_description----------------------------------teacher_rating--------------------'; // content of the tooltip(white box)
                    teacherItem.appendChild(tooltip);

                    // Add a hover event to show/hide the tooltip
                    teacherItem.addEventListener("mouseenter", function () {
                        tooltip.style.display = "block";
                    });
                    teacherItem.addEventListener("mouseleave", function () {
                        tooltip.style.display = "none";
                    });

                    // Append the <li> to the <ul>
                    teacherList.appendChild(teacherItem);
                });

                // Clear previous content and append the <ul> to the result element
                bestTeacher.innerHTML = "";
                bestTeacher.appendChild(teacherList);

                // Update the result display with the list of best teachers or an error message
                if (topic && learningMode && bestTeachers.length === 0) {
                    bestTeacher.textContent = "No teachers found for this topic and learning mode.";
                }

                topicHighlight.textContent = topic;
                learningModeHighlight.textContent = learningMode;
                result.style.display = "block"; // Show the result
            })
            .catch((error) => {
                console.error("Error fetching teacher data:", error);
                // Handle the error as needed, e.g., display an error message
            });
    });
});
