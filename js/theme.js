export function switchTheme() {
  const body = document.body;
  const logo = document.querySelector("#logo");
  body.classList.toggle("dark");

  if (body.classList.contains("dark")) {
    localStorage.setItem("theme", "dark");
    logo.src = "assets/images/logo-for-dark-mode.png";
  } else {
    localStorage.setItem("theme", "light");
    logo.src = "assets/images/logo.png";
  }
}

export function initTheme() {
  const body = document.body;
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "dark") {
    body.classList.add("dark");
    logo.src = "assets/images/logo-for-dark-mode.png";
  }
}