const { Router } = require('express');
const {postUsers} = require('../controllers/createUser')
const {getUsers} = require('../controllers/getUsers')
const {login} = require('../controllers/login')

const userRoutes = Router();

userRoutes.post('/create', postUsers)
userRoutes.get('/getusers', getUsers)
userRoutes.post('/login', login)


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = userRoutes;