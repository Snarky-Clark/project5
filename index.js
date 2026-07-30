const navLinks = document.querySelectorAll("nav a");
const sections = document.querySelectorAll("section");
const themeButton = document.querySelector(".thememaster");
const foodDrinkImage = document.querySelector("#food-drink-image");

function hideAllSections() {
    sections.forEach(function(section) {
        section.classList.add("hidden");
    });
}

function showSection(sectionId) {
    const selectedSection = document.querySelector(sectionId);

    if (selectedSection) {
        selectedSection.classList.remove("hidden");
    }
}

function turnOnTheme() {
    let themeLink = document.querySelector("#theme-stylesheet");

    if (!themeLink) {
        themeLink = document.createElement("link");
        themeLink.id = "theme-stylesheet";
        themeLink.rel = "stylesheet";
        themeLink.href = "theme.css";
        document.head.appendChild(themeLink);
    }

    if (foodDrinkImage) {
        foodDrinkImage.src = "bar.jpg";
        foodDrinkImage.alt = "image of a bar";
    }
}

function turnOffTheme() {
    const themeLink = document.querySelector("#theme-stylesheet");

    if (themeLink) {
        themeLink.remove();
    }
    if (foodDrinkImage) {
        foodDrinkImage.src = "kitchen2.jpg";
        foodDrinkImage.alt = "image of kitchen";
    }
}

hideAllSections();
showSection("#Intro");

navLinks.forEach(function(link) {
    link.addEventListener("click", function(event) {
        event.preventDefault();

        const sectionId = link.getAttribute("href");

        hideAllSections();
        showSection(sectionId);
    });
});

if (themeButton) {
    themeButton.addEventListener("click", function() {
        const themeLink = document.querySelector("#theme-stylesheet");

        if (themeLink) {
            console.log("Theme Master clicked: theme off");
            turnOffTheme();
        } else {
            console.log("Theme Master clicked: theme on");
            turnOnTheme();
        }
    });
}

