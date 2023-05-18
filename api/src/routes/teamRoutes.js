const { Router } = require('express');
const {addTeam} = require('../controllers/addTeam')
const {removeTeam} = require('../controllers/removeTeam')
const {getPokemonsFromTeam} = require('../controllers/getPokemonsFromTeam')

const teamRoutes = Router();

teamRoutes.get('/teampokemons', getPokemonsFromTeam)
teamRoutes.post('/addpokemon', addTeam)
teamRoutes.delete('/removepokemon', removeTeam)

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = teamRoutes;