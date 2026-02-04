import { setActiveType, renderPokemons, showMoreTypes, removeMoreTypes, toggleAside, hideAside } from "./ui.js";
import { fetchPokemonsByType } from "./data.js";

let currentType = "normal";
const buttonToShowMoreTypes = document.querySelector(".show-more-types");

function handleTypeClick(btn) {
    btn.addEventListener("click", async () => {
        const type = btn.dataset.type;
        if (type === currentType) return;

        currentType = type;
        await updatePokemons(type);
    });
}

function initTypeButtons() {
    const typeButtons = document.querySelectorAll(".type-btn");
    typeButtons.forEach(btn => handleTypeClick(btn));
}

async function updatePokemons(type) {
    setActiveType(type);
    const pokemons = await fetchPokemonsByType(type);
    renderPokemons(pokemons);
}

buttonToShowMoreTypes.addEventListener("click", () => {
    const isExpanded = buttonToShowMoreTypes.classList.contains("expanded");

    if (!isExpanded) {
        showMoreTypes();
        buttonToShowMoreTypes.classList.add("expanded");
        initTypeButtons();
    } else {
        removeMoreTypes();
        buttonToShowMoreTypes.classList.remove("expanded");
    }
});

const btnToShowAside = document.querySelector(".btn-to-show-aside");
btnToShowAside.addEventListener("click", (event) => {
    event.stopPropagation();
    toggleAside();
});

document.addEventListener("click", (event) => {
    if (!aside.contains(event.target)) {
        hideAside();
    }
});

const aside = document.querySelector("#aside");
aside.addEventListener("click", (event) => {
  event.stopPropagation();
});

initTypeButtons();
updatePokemons(currentType);