
const darkModeToggle = document.getElementById("dark-mode-toggle");


let isDarkMode = true;


darkModeToggle.addEventListener("click", function () {

    if (isDarkMode) {

        document.body.style.backgroundColor = "#f0f0f0"; 
        const sections = document.querySelectorAll("section");
        const h2 = document.getElementById("title");
        sections.forEach(function (section) {
            section.style.backgroundColor = "#fff"; 
            section.style.color = "#333"; 
            h2.style.color = "#333";
            
        });

        darkModeToggle.textContent = "Dark Mode";
    } else {

        document.body.style.backgroundColor = "#000"; 
        const sections = document.querySelectorAll("section");
        const h2 = document.getElementById("title");
        sections.forEach(function (section) {
            section.style.backgroundColor = "#333"; 
            section.style.color = "#fff"; 
            h2.style.color = "#fff";
            
        });

        darkModeToggle.textContent = "Light Mode";
    }

    isDarkMode = !isDarkMode;
});