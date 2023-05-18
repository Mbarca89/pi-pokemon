const { Users } = require('../db')

const getUsers = async (req, res) => {
    try {
        const users = await Users.findAll()
        return res.status(200).json(users)
    } catch (error) {
        return res.status(400).send(error.message)
    }

}

module.exports = { getUsers }