import { setActiveType, renderPokemons, showMoreTypes, removeMoreTypes, toggleAside, hideAside, renderRandomPokemon, scrollIntoPokemonList, clearSearchInput, removeTypeBtnStyle, updateFavoriteButton } from "./ui.js";
import { fetchPokemonsByType, fetchRandomPokemon, searchPokemonByName, fetchAllPokemons, toggleFavorite, isFavorite, getFavorites, findPokemonById } from "./data.js";
import { switchTheme, initTheme } from "./theme.js";

let currentType = "normal";
let isResultesBysearch = false;
let isAllResult = false;
let isFavoritesResult = false;
const buttonToShowMoreTypes = document.querySelector(".show-more-types");

function handleTypeClick(btn) {
    btn.addEventListener("click", async () => {
        scrollIntoPokemonList();
        const type = btn.dataset.type;
        if (type === currentType
            && isResultesBysearch === false
            && isAllResult === false
            && isFavoritesResult == false) return;

        hideAside();
        currentType = type;
        await updatePokemons(type);
    });
}

function initTypeButtons() {
    const typeButtons = document.querySelectorAll(".type-btn");
    typeButtons.forEach(btn => handleTypeClick(btn));
}

async function updatePokemons(type) {
    isResultesBysearch = false;
    isFavoritesResult = false;
    isAllResult = false;
    setActiveType(type);
    const pokemons = await fetchPokemonsByType(type);
    renderPokemons(pokemons);
}

async function showRandomPokemonOnLoad() {
    const randomPokemon = await fetchRandomPokemon();
    renderRandomPokemon(randomPokemon);
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

const themeToggleBtn = document.querySelector(".theme-toggle-btn");
themeToggleBtn.addEventListener("click", () => {
    switchTheme();
});

const searchInput = document.querySelector("#search-input");
searchInput.addEventListener("keydown", async (event) => {
    event.stopPropagation();
    if (event.key !== "Enter") return;

    scrollIntoPokemonList();
    const inputValue = searchInput.value.trim();
    clearSearchInput();
    if (inputValue.length === 0) {
        isResultesBysearch = false;
        await updatePokemons(currentType);
        return;
    }

    isResultesBysearch = true;
    removeTypeBtnStyle();
    const pokemons = await searchPokemonByName(inputValue);
    renderPokemons(pokemons);
});

const allPokemonBtn = document.querySelector(".all-pokemons-btn")
allPokemonBtn.addEventListener("click", async (event) => {
    event.stopPropagation();

    isAllResult = true;
    removeTypeBtnStyle();
    scrollIntoPokemonList();
    const pokemons = await fetchAllPokemons();
    renderPokemons(pokemons);
})

document.addEventListener("click", (e) => {
    if (e.target.classList.contains("favorite-icon")) {
        const card = e.target.closest(".pokemon-card");
        const id = Number(card.dataset.id);

        toggleFavorite(id);

        const isFav = isFavorite(id);
        updateFavoriteButton(e.target, isFav);
    }
})

const favoriteBtn = document.querySelector(".favorites-pokemons-btn");
favoriteBtn.addEventListener("click", async (e) => {
    e.stopPropagation();
    isFavoritesResult = true;
    scrollIntoPokemonList();
    removeTypeBtnStyle();

    const favoriteIds = getFavorites();
    const allFavoritePokemons = await Promise.all(
        favoriteIds.map(id => findPokemonById(id))
    );

    renderPokemons(allFavoritePokemons);
})


initTheme();
showRandomPokemonOnLoad();
initTypeButtons();
updatePokemons(currentType);