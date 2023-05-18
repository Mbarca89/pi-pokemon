const { Users, Team } = require('../db')

const postUsers = async (req, res) => {
    try {
        const { name, password } = req.body
        if (name.length === 0 || password.length === 0) {
            throw Error('El Nombre y la Contraseña no pueden estar vacios')
        }
        const [user, created] = await Users.findOrCreate({ where: { name }, defaults: { name, password } })
        if (!created) throw Error('Ya existe un usuario con ese nombre!')
        const team = await Team.create()
        await user.setTeam(team)
        return res.status(201).send('Usuario creado con exito. Ya puedes loguearte!')
    } catch (error) {
        return res.status(400).send(error.message)
    }

}

module.exports = { postUsers }