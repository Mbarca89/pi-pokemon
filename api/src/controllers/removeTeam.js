const { Team, Pokemon, conn } = require('../db')

const removeTeam = async (req, res) => {
    try {
        const { pokeId, teamId } = req.body
        if (!pokeId) {
            return res.status(400).send({ message: 'ID vacio' })
        }
        if (!teamId) {
            return res.status(400).send({ message: 'Team ID vacio' })
        }
        const team = await Team.findByPk(teamId)
        if (!team) {
            return res.status(404).send('El equipo no existe');
        }
        const pokemon = await Pokemon.findOne({ where: { pokeId: pokeId } })
        if (!pokemon) {
            return res.status(400).send({ message: 'Ese Pokemon no existe!' })
        }
        const deleteCheck = await conn.models.pokemon_team.destroy({ where: { pokemonId: pokemon.id, teamId: teamId } })
        if (!deleteCheck) throw Error('El pokemon no esta en el equipo!')
        const otherTeamCheck = await conn.models.pokemon_team.findAll({ where: { pokemonId: pokemon.id } })
        if (otherTeamCheck.length === 0) {
            const deleteApiPokemon = await Pokemon.findOne({ where: { pokeId: pokeId, isInDb: false } })
            deleteApiPokemon && await deleteApiPokemon.destroy()
        }
        return res.status(200).send({ message: `El Pokemon con id: ${pokeId} fue quitado equipo!` })
    } catch (error) {
        return res.status(400).send(error.message)
    }

}

module.exports = { removeTeam }