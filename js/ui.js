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
