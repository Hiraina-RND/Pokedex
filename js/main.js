import { showMoreTypes, removeMoreTypes } from "./ui.js";

const buttonToShowMoreTypes = document.querySelector(".show-more-types");
buttonToShowMoreTypes.addEventListener("click", () => {
    if (!buttonToShowMoreTypes.classList.contains("expanded")) {
        showMoreTypes();
        buttonToShowMoreTypes.classList.add("expanded")
    } else if (buttonToShowMoreTypes.classList.contains("expanded")) {
        removeMoreTypes();
        buttonToShowMoreTypes.classList.remove("expanded");
    }
});