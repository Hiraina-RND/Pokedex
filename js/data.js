export async function fetchPokemonsByType(type) {
  let url;

  if (type === "all") {
    url = "https://pokeapi.co/api/v2/pokemon?limit=100";
  } else {
    url = `https://pokeapi.co/api/v2/type/${type}`;
  }

  const response = await fetch(url);
  const data = await response.json();

  const basicsPokemons =  normalizePokemons(data, type);
  const detailedPokemos = await Promise.all(
    basicsPokemons.map(pokemon => fetchPokemonDetails(pokemon.url))
  );

  return detailedPokemos;
}

function normalizePokemons(data, type) {
  if (type === "all") {
    return data.results;
  }

  return data.pokemon.map(p => p.pokemon);
}

async function fetchPokemonDetails(pokemonUrl) {
  const response = await fetch(pokemonUrl);
  const data = await response.json();

  return {
    id : data.id,
    name : data.name,
    image : data.sprites.other["official-artwork"].front_default,
    types : data.types.map(t => t.type.name)
  }
}
