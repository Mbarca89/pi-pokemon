const { Type, Pokemon, conn} = require('../db')

const updatePokemon = async (req, res) => {
    try{
        console.log(req.body)
    const {pokeId,name,image,hp,attack,defense,speed,heigth,weight,type} = req.body
    if(pokeId.length === 0){
        throw Error('La ID es obligatoria!')
    }
    const pokemon = await Pokemon.findOne({where:{pokeId}})
    if(!pokemon) throw Error ('Pokemon no encontrado!')
    await pokemon.update({
        name: name || pokemon.name,
        image: image || pokemon.image,
        hp: hp || pokemon.hp,
        attack: attack || pokemon.attack,
        defense: defense || pokemon.defense,
        speed: speed || pokemon.speed,
        heigth: heigth || pokemon.heigth,
        weight: weight || pokemon.weight,
    })
    conn.models.pokemon_type.destroy({where:{pokemonId:pokemon.id}})
    const type1 = type.type1 && await Type.findOne({ where: { name: type.type1 } })
    const type2 = type.type2 && await Type.findOne({ where: { name: type.type2 } })
    type1 && await pokemon.addType(type1)
    type2 && await pokemon.addType(type2)
    return res.status(201).send(`el Pokemon fue actualizado correctamente!`)
}catch(error){
    return res.status(400).send(error.message)
}

}

module.exports = {updatePokemon}