import { setActiveType, renderPokemons } from "./ui.js";
import { fetchPokemonsByType } from "./data.js";
import { showMoreTypes, removeMoreTypes } from "./ui.js";

const buttonToShowMoreTypes = document.querySelector(".show-more-types");
const buttons = document.querySelectorAll(".type-btn");
let currentType = "all";

buttonToShowMoreTypes.addEventListener("click", () => {
    if (!buttonToShowMoreTypes.classList.contains("expanded")) {
        showMoreTypes();
        buttonToShowMoreTypes.classList.add("expanded");

        const moreTypeButtons = document.querySelectorAll(".type-btn");
        moreTypeButtons.forEach(btn => {
            btn.addEventListener("click", async () => {
                const type = btn.dataset.type;
                if (type === currentType) return;

                currentType = type;
                await updatePokemons(type);
            });
        });

    } else {
        removeMoreTypes();
        buttonToShowMoreTypes.classList.remove("expanded");
    }
});

buttons.forEach(btn => {
    btn.addEventListener("click", async () => {
        const type = btn.dataset.type;
        if (type === currentType) return;

        currentType = type;
        await updatePokemons(type);
    });
});

async function updatePokemons(type) {
    setActiveType(type);
    const pokemons = await fetchPokemonsByType(type);
    renderPokemons(pokemons);
}

updatePokemons(currentType);