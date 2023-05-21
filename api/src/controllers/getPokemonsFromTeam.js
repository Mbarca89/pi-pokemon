const { Team, Type } = require('../db')

const getPokemonsFromTeam = async (req, res) => {
  try {
    const { teamId } = req.query
    if (!teamId) throw Error('Falta la Id del equipo!')
    const team = await Team.findByPk(teamId)
    if (!team) throw Error('Equipo no encontrado')
    const pokemons = await team.getPokemons({
      include: [
        {
          model: Type,
          as: 'types',
          attributes: ['name'],
        },
      ],
    })
    const results = pokemons.map(pokemon => {
      const { types, ...otherAttributes } = pokemon.get();
      let typeNames = []
      if(pokemon.types[1]){
        if (pokemon.types[0].pokemon_type.createdAt > pokemon.types[1].pokemon_type.createdAt) typeNames = [types[1].name, types[0].name];
        else typeNames = [types[0].name, types[1].name];
      }else typeNames = [types[0].name]
      return {
        ...otherAttributes,
        type: { type1: { name: typeNames[0] }, type2: { name: typeNames[1] } }
      }
    })
    res.status(200).json(results)

  } catch (error) {
    res.status(400).send(error.message)
  }
}

module.exports = { getPokemonsFromTeam }