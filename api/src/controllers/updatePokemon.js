const {Pokemon} = require('../db')

const updatePokemon = async (req, res) => {
    try{
    const {id,name,image,hp,attack,defense,speed,heigth,weight,type} = req.body
    if(id.length === 0){
        return res.status(400).send({message: 'La ID es obligatoria!'})
    }
    const pokemon = await Pokemon.findByPk(id)
    if(!pokemon) res.status(400).send({message: 'Pokemon no encontrado!'})
    await pokemon.update({
        name: name || pokemon.name,
        image: image || pokemon.image,
        hp: hp || pokemon.hp,
        attack: attack || pokemon.attack,
        defense: defense || pokemon.defense,
        speed: speed || pokemon.speed,
        heigth: heigth || pokemon.heigth,
        weight: weight || pokemon.weight,
        type: type || pokemon.type
    })
    return res.status(201).send(`el Pokemon fue actualizado correctamente!`)
}catch(error){
    return res.status(400).send({message: error.message})
}

}

module.exports = {updatePokemon}