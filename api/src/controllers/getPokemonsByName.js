const axios = require('axios');
const {API_URL} = process.env
const { Type, Pokemon } = require('../db')

const getPokemonsByNameApi = async (name) => {
  try {
    const { data } = await axios(`${API_URL}/${name}`)
    if (!data) throw Error('Pokemon no encontrado en API')
    const type1 = data.types[0] && await Type.findOne({ where: { name: data.types[0].type.name } })
    const type2 = data.types[1] && await Type.findOne({ where: { name: data.types[1].type.name } })
    const pokemon = {
      pokeId: data.id,
      name: data.name,
      image: data.sprites.other['official-artwork'].front_default,
      hp: data.stats[0].base_stat,
      attack: data.stats[1].base_stat,
      defense: data.stats[2].base_stat,
      speed: data.stats[5].base_stat,
      height: data.height,
      weight: data.weight,
      type: {
        type1: type1,
        type2: type2
      }
    }
    return pokemon
  } catch (error) {
    return ({ message: error.message })
  }
}

const getPokemonsByNameDb = async (name) => {
  try {
    const data = await Pokemon.findOne({
      attributes: ['pokeId', 'name', 'image', 'hp', 'attack', 'defense', 'speed', 'height', 'weight'],
      where: { name: name },
      include: [
        {
          model: Type,
          as: 'types',
          attributes: ['name'],
          through: { attributes: {} },
        },
      ],

    });
    if (!data) throw Error('Pokemon no encontrado en DB')
    const { types, ...otherAttributes } = data.get();
    const typeNames = types.map(type => type.name);
    return {
      ...otherAttributes,
      type: { type1: { name: typeNames[0] }, type2: { name: typeNames[1] } }
    }
  } catch (error) {
    return error.message
  }
}


const getPokemonsByName = async (req, res) => {
  try {
    const { name } = req.query
    nameOk = name.toLowerCase()
    const foundInDb = await getPokemonsByNameDb(nameOk)
    const foundInApi = await getPokemonsByNameApi(nameOk)
    if (!foundInDb.pokeId && !foundInApi.pokeId) throw Error('Pokemon no encontrado!')
    if (foundInDb.pokeId) return res.status(200).json(foundInDb)
    if (foundInApi.pokeId) return res.status(200).json(foundInApi)
  } catch (error) {
    return res.status(404).send(error.message)
  }

}

// const getPokemonsByName = async (req,res) => {
//     try {
//         const {name} = req.query
//         const {data} = await axios(`${URL}/${name}`)
//         if(!data) throw Error ('Pokemon no encontrado')
//         const type1 = data.types[0] && await Type.findOne({where: {name: data.types[0].type.name}})
//         const type2 = data.types[1] && await Type.findOne({where: {name: data.types[1].type.name}})
//         const pokemon = {
//             pokeId: data.id,
//             name: data.name,
//             image: data.sprites.other['official-artwork'].front_default,
//             hp:data.stats[0].base_stat,
//             attack:data.stats[1].base_stat,
//             defense:data.stats[2].base_stat,
//             speed:data.stats[5].base_stat,
//             height: data.height,
//             weight: data.weight,
//             type:{
//                 1: type1,
//                 2: type2
//             }
//         }
//         return res.status(200).json(pokemon)
//     } catch (error) {
//         return res.status(404).json({message: error.message})
//     }
// }


module.exports = { getPokemonsByName }