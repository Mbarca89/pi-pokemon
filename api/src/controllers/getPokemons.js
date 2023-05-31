const axios = require('axios');
const {API_URL} = process.env
const { Type, Pokemon } = require('../db')
const apiPokemonsMocked = require('./pokemonData.json')

let apiPokes = []
let nextUrl = API_URL

const getPokemonsFromApi = async () => {

  try {
    const { data } = await axios(API_URL)
    if (!data) throw Error('Error en la API');
    const count = data.count

    if (apiPokes.length === count) {
      console.log('ya estaban cargados')
      return apiPokes;
    }

  } catch (error) {
    return error.message
  }

  
  try {
    
      const { data } = await axios(`${nextUrl}?limit=20`);
      if (!data) throw Error('Error en la API');

      const promises = data.results.map(async (result) => {
        try {
          const { data: pokemonData } = await axios(result.url);
          const type1 = pokemonData.types[0] && await Type.findOne({ where: { name: pokemonData.types[0].type.name } });
          const type2 = pokemonData.types[1] && await Type.findOne({ where: { name: pokemonData.types[1].type.name } });
          const pokemonResult = {
            pokeId: pokemonData.id,
            name: pokemonData.name,
            image: pokemonData.sprites.other['official-artwork'].front_default,
            hp: pokemonData.stats[0].base_stat,
            attack: pokemonData.stats[1].base_stat,
            defense: pokemonData.stats[2].base_stat,
            speed: pokemonData.stats[5].base_stat,
            height: pokemonData.height,
            weight: pokemonData.weight,
            type: {
              type1: type1,
              type2: type2
            }
          }
          return pokemonResult;
        } catch (error) {
          return error.message
        }
      });
      const pokemonsData = await Promise.all(promises);
      apiPokes.push(...pokemonsData)

      nextUrl = data.next
    
    console.log(`Pokemones Obtenidos de la API con exito!`)
    apiCount = 1
    return apiPokes
  } catch (error) {
    return error
  }
};


const getPokemonsFromDb = async () => {
  try {
    const data = await Pokemon.findAll({
      attributes: ['pokeId', 'name', 'image', 'hp', 'attack', 'defense', 'speed', 'height', 'weight', 'isInDb', 'userId'],
      where: { isInDb: true },
      include: [
        {
          model: Type,
          as: 'types',
          attributes: ['name'],
          through: { attributes: {} },
        },
      ],

    });

    console.log('Pokemons obtenidos de la BD con exito!')
    return data.map(pokemon => {
      const { types, ...otherAttributes } = pokemon.get();
      const typeNames = types.map(type => type.name);
      return {
        ...otherAttributes,
        type: { type1: { name: typeNames[0] }, type2: { name: typeNames[1] } }
      }
    })

  } catch (error) {
    return error.message
  }
}

const getPokemons = async (req, res) => {
  try {
    // const pokemonsApi = await getPokemonsFromApi()
    const pokemonsDb = await getPokemonsFromDb()
    // const allPokemons = [...pokemonsApi, ...pokemonsDb]
    const allPokemons = [...apiPokemonsMocked, ...pokemonsDb]
    console.log(`se cargaron ${allPokemons.length} Pokemons en total!`)
    res.status(200).json(allPokemons)

  } catch (error) {
    res.status(400).send(error.message)
  }
}

module.exports = { getPokemons };
