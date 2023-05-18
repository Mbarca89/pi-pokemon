const { Users, Team } = require('../db')

const login = async (req, res) => {
    try {
        const { name, password } = req.body
        if (name.length === 0 || password.length === 0) {
            throw Error('El usuario o contraseña esta vacio')
        }
        const user = await Users.findOne({
            where: { name: name }, include: [
                {
                    model: Team,
                    as: 'team',
                    attributes: ['id'],
                },
            ],
        })
        if (!user) {
            throw Error('No existe el usuario!')
        }
        if (user.password !== password) {
            throw Error('Contraseña incorrecta')
        }
        await Users.update({ isLogged: true }, { where: { name: name } })
        return res.status(200).json({ isLoggedIn: true, user })
    } catch (error) {

        return res.status(400).json(error.message)
    }
}

module.exports = { login }