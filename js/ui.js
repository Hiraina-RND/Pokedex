const createElement = (tag, options = {}) => {
  const element = document.createElement(tag);

  if (options.className) element.className = options.className;
  if (options.text) element.textContent = options.text;
  if (options.id) element.id = options.id;

  return element;
};

const createTypeButton = (liClassName = "", iconClassName = "", typeName = "", dataType = "") => {
  const li = createElement("li", { className: liClassName });
  const button = document.createElement("button");
  button.classList.add("type-btn");
  button.dataset.type = dataType;
  const icon = createElement("i", { className: iconClassName });
  const span = createElement("span", { text: typeName });

  button.append(icon, span);
  li.appendChild(button);

  return li;
};

const MORE_TYPES = [
  ["ice-type", "fa-solid fa-snowflake", "Ice", "ice"],
  ["poison-type", "fa-solid fa-flask", "Poison", "poison"],
  ["ground-type", "fa-solid fa-mountain", "Ground", "ground"],
  ["psychic-type", "fa-solid fa-eye", "Psychic", "psychic"],
  ["bug-type", "fa-solid fa-bug", "Bug", "bug"],
  ["rock-type", "fa-solid fa-gem", "Rock", "rock"],
  ["ghost-type", "fa-solid fa-ghost", "Ghost", "ghost"],
  ["dark-type", "fa-solid fa-moon", "Dark", "dark"],
  ["steel-type", "fa-solid fa-shield", "Steel", "steel"],
  ["fairy-type", "fa-solid fa-wand-sparkles", "Fairy", "fairy"],
  ["dragon-type", "fa-solid fa-dragon", "Dragon", "dragon"],
  ["fighting-type", "fa-solid fa-hand-fist", "Fighting", "fighting"],
  ["flying-type", "fa-solid fa-feather", "Flying", "flying"],
];

export const showMoreTypes = () => {
  const listContainer = document.querySelector(".type-list");

  MORE_TYPES.forEach(([className, icon, label, dataType]) => {
    listContainer.append(
      createTypeButton(className, icon, label, dataType)
    );
  });
};

export const removeMoreTypes = () => {
  const listContainer = document.querySelector(".type-list");

  MORE_TYPES.forEach(([className]) => {
    const element = listContainer.querySelector(`.${className}`);
    if (element) element.remove();
  });
};

export function setActiveType(type) {
  const buttons = document.querySelectorAll(".type-btn");
  buttons.forEach(btn => {
    if (btn.dataset.type === type) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });
}

export function renderPokemons(pokemons) {
  const container = document.querySelector(".pokemon-container");
  container.innerHTML = "";

  pokemons.forEach(pokemon => {
    const card = document.createElement("div");
    card.className = "pokemon-card";

    const pokemonId = document.createElement("span");
    pokemonId.className = "pokemon-id";
    pokemonId.textContent = `#${pokemon.id}`;

    const img = document.createElement("img");
    img.src = pokemon.image;
    img.alt = pokemon.name;

    const name = document.createElement("h3");
    name.textContent = pokemon.name;

    const types = document.createElement("div");
    types.className = "pokemon-types";

    pokemon.types.forEach(type => {
      const span = document.createElement("span");
      span.className = `type ${type}`;
      span.textContent = type;
      types.appendChild(span);
    });

    card.append(pokemonId, img, name, types);
    container.appendChild(card);
  });
}

export function renderRandomPokemon(pokemon) {
  const container = document.querySelector(".radom-pokemon-display");
  container.innerHTML = "";

  const MAX_STAT_VALUE = 255;

  const card = document.createElement("div");
  card.className = "pokemon-card hero";

  const img = document.createElement("img");
  img.src = pokemon.image;
  img.alt = pokemon.name;

  const info = document.createElement("div");
  info.className = "pokemon-info";

  const name = document.createElement("h2");
  name.textContent = `${pokemon.name} (#${pokemon.id})`;

  const types = document.createElement("div");
  types.className = "pokemon-types";

  pokemon.types.forEach(type => {
    const span = document.createElement("span");
    span.className = `type ${type}`;
    span.textContent = type;
    types.appendChild(span);
  });

  const stats = document.createElement("div");
  stats.className = "pokemon-stats";

  pokemon.stats.forEach(stat => {
    const statRow = document.createElement("div");
    statRow.className = "stat-row";

    const label = document.createElement("span");
    label.className = "stat-label";
    label.textContent = stat.name;

    const barContainer = document.createElement("div");
    barContainer.className = "stat-bar";

    const barFill = document.createElement("div");
    barFill.className = "stat-bar-fill";

    const percentage = Math.min(
      (stat.value / MAX_STAT_VALUE) * 100,
      100
    );
    barFill.style.width = `${percentage}%`;

    const value = document.createElement("span");
    value.className = "stat-value";
    value.textContent = stat.value;

    barContainer.appendChild(barFill);
    statRow.append(label, barContainer, value);
    stats.appendChild(statRow);
  });

  const abilities = document.createElement("p");
  abilities.className = "pokemon-abilities";

  const abilitiesLabel = document.createElement("span");
  abilitiesLabel.className = "abilities-label";
  abilitiesLabel.textContent = "Abilities : ";

  const abilitiesText = document.createTextNode(pokemon.abilities.join(", "));

  abilities.append(abilitiesLabel, abilitiesText);


  info.append(name, types, stats, abilities);
  card.append(img, info);
  container.appendChild(card);
}

const aside = document.querySelector("#aside");
const btnToShowAside = document.querySelector(".btn-to-show-aside");

export function toggleAside() {
  const isVisible = aside.classList.toggle("visible");
  btnToShowAside.classList.toggle("movedRight", isVisible);
}

export function hideAside() {
  aside.classList.remove("visible");
  btnToShowAside.classList.remove("movedRight");
}

export function scrollIntoPokemonList() {
  const pokemonList = document.querySelector(".pokemon-container");
  pokemonList.scrollIntoView({ behavior: "smooth" });
}

export function clearSearchInput() {
  const searchInput = document.querySelector('#search-input');
  searchInput.value = '';
}