export async function fetchPokemonsByType(type) {
  let url = `https://pokeapi.co/api/v2/type/${type}`;

  const response = await fetch(url);
  const data = await response.json();

  const basicsPokemons =  data.pokemon.map(p => p.pokemon);
  const detailedPokemos = await Promise.all(
    basicsPokemons.map(pokemon => fetchPokemonDetails(pokemon.url))
  );

  return detailedPokemos;
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
