const { Pokemon } = require('../db')

const deletePokemon = async (req, res) => {
    const id = req.params.id
    try {
        const pokemon = await Pokemon.findOne({ where: { pokeId: id } })
        if (!pokemon) throw Error('El pokemon no existe!')
        const deleted = await pokemon.destroy()
        return res.status(200).json(pokemon)
    }
    catch (error) {
        return res.status(400).json(error.message)
    }
}

module.exports = { deletePokemon }