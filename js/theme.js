const body = document.body;
const logo = document.querySelector("#logo");
const icon = document.querySelector(".theme-toggle-btn i");

export function switchTheme() {
    body.classList.toggle("dark");

    if (body.classList.contains("dark")) {
        localStorage.setItem("theme", "dark");
        logo.src = "assets/images/logo-for-dark-mode.png";
        icon.className = "fas fa-sun";
    } else {
        localStorage.setItem("theme", "light");
        logo.src = "assets/images/logo.png";
        icon.className = "fa-regular fa-moon";
    }
}

export function initTheme() {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
        body.classList.add("dark");
        logo.src = "assets/images/logo-for-dark-mode.png";
        icon.className = "fas fa-sun";
    }
}