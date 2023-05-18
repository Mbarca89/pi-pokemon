const { Router } = require('express');
const userRoutes = require('./userRoutes.js')
const teamRoutes = require('./teamRoutes.js')
const pokemonRoutes = require('./pokemonRoutes.js')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

router.use('/user', userRoutes)
router.use('/team', teamRoutes)
router.use('/pokemons', pokemonRoutes)


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
