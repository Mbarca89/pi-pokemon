const axios = require('axios')
const { Pokemon, Type } = require('../db')
const {API_URL} = process.env

const createPokemon = async (req, res) => {
    try {
        const { data } = await axios(API_URL)
        const count = data.count

        const { name, image, hp, attack, defense, speed, height, weight, type, userId } = req.body
        console.log(req.body)
        if (!name || !hp || !attack || !defense) {
            return res.status(400).send({ message: 'Faltan Datos' })
        }
        const type1 = type.type1 && await Type.findOne({ where: { name: type.type1 } });
        const type2 = type.type2 && await Type.findOne({ where: { name: type.type2 } });

        let pokeId = await Pokemon.max('pokeId')
        if (pokeId < count) pokeId = count
        pokeId++

        const isInDb = true

        const pokemon = await Pokemon.create({ pokeId, name, image, hp, attack, defense, speed, height, weight, isInDb, userId })
        await pokemon.addType(type1)
        await pokemon.addType(type2)
        return res.status(201).json({ message: 'El pokemon fue creado correctamente!', result: pokemon })
    } catch (error) {
        return res.status(400).send(error.message)
    }

}

module.exports = { createPokemon }