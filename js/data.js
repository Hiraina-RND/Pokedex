export async function fetchPokemonsByType(type) {
  let url;

  if (type === "all") {
    url = "https://pokeapi.co/api/v2/pokemon?limit=50";
  } else {
    url = `https://pokeapi.co/api/v2/type/${type}`;
  }

  const response = await fetch(url);
  const data = await response.json();

  return normalizePokemons(data, type);
}

function normalizePokemons(data, type) {
  if (type === "all") {
    return data.results;
  }

  return data.pokemon.map(p => p.pokemon);
}
