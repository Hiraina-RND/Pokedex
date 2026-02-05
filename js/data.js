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


export async function fetchRandomPokemon() {
  const randomId = Math.floor(Math.random() * 898) + 1;
  const url = `https://pokeapi.co/api/v2/pokemon/${randomId}`;

  const response = await fetch(url);
  const data = await response.json();

  return {
    id: data.id,
    name: data.name,
    image: data.sprites.other["official-artwork"].front_default,
    types: data.types.map(t => t.type.name),
    height: data.height,
    weight: data.weight,
    abilities: data.abilities.map(a => a.ability.name),
    stats: data.stats.map(s => ({ name: s.stat.name, value: s.base_stat }))
  };
}

let cachedPokemons = [];
export async function fetchAllPokemons() {
  if (cachedPokemons.length > 0) return cachedPokemons;

  const url = `https://pokeapi.co/api/v2/pokemon?limit=898`;
  const response = await fetch(url);
  const data = await response.json();

  const detailedPokemons = await Promise.all(
    data.results.map(pokemon => fetchPokemonDetails(pokemon.url))
  );

  cachedPokemons = detailedPokemons;

  return cachedPokemons;
}

export async function searchPokemonByName(name) {
  const pokemons = await fetchAllPokemons();
  return pokemons.filter(pokemon =>
    pokemon.name.toLowerCase().includes(name.toLowerCase())
  );
}