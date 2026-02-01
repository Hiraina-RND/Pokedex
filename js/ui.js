const createElement = (tag, options = {}) => {
    const element = document.createElement(tag);

    if (options.className) element.className = options.className;
    if (options.text) element.textContent = options.text;
    if (options.id) element.id = options.id;

    return element;
};

const createTypeButton = (liClassName = "", iconClassName = "", typeName = "") => {
    const li = createElement("li", { className: liClassName });
    const button = document.createElement("button");
    const icon = createElement("i", { className: iconClassName });
    const span = createElement("span", { text: typeName });

    button.append(icon, span);
    li.appendChild(button);

    return li;
};

const MORE_TYPES = [
    ["ice-type", "fa-solid fa-snowflake", "Ice"],
    ["poison-type", "fa-solid fa-flask", "Poison"],
    ["ground-type", "fa-solid fa-mountain", "Ground"],
    ["psychic-type", "fa-solid fa-eye", "Psychic"],
    ["bug-type", "fa-solid fa-bug", "Bug"],
    ["rock-type", "fa-solid fa-gem", "Rock"],
    ["ghost-type", "fa-solid fa-ghost", "Ghost"],
    ["dark-type", "fa-solid fa-moon", "Dark"],
    ["steel-type", "fa-solid fa-shield", "Steel"],
    ["fairy-type", "fa-solid fa-wand-sparkles", "Fairy"],
    ["dragon-type", "fa-solid fa-dragon", "Dragon"]
];

export const showMoreTypes = () => {
    const listContainer = document.querySelector(".type-list");

    MORE_TYPES.forEach(([className, icon, label]) => {
        listContainer.append(
            createTypeButton(className, icon, label)
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
