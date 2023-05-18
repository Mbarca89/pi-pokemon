import pokemonLogo from '../../img/pokemonLogo.png'
import pikachu from '../../img/pikachu.png'
import style from './Landing.module.css'
import axios from 'axios'
import { NavLink } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { getPokemons } from '../../redux/actions';
const SERVER_URL = process.env.REACT_APP_SERVER_URL

const Landing = () => {
   
    const dispatch = useDispatch()

    //CUANDO SE RENDERIZA EL COMPONENTE, HAGO UN PEDIDO AL SERVIDOR PARA TRAER LOS POKEMONES
    useEffect(() => {
        dispatch(getPokemons())
        const getTypes = async () => {
            await axios(`${SERVER_URL}/pokemons/types`)
        }
        getTypes()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    //----------------------------------------------------------------------

    return (
        <>
            <div className={style.landing}>
                <div className={style.imageContainer}>
                    <img className={style.image} src={pokemonLogo} alt=''></img>
                    <img className={style.pikachu} src={pikachu} alt=''></img>
                </div>
                <div className={style.buttonContainer}>
                    <NavLink className={style.link} to='/login'>Login</NavLink>
                    <NavLink className={style.link} to='/register'>Registrarme</NavLink>
                </div>
                <div className={style.homeButtonContainer}>
                    <NavLink className={style.link} to='/home'>Entrar</NavLink>
                </div>
            </div>
        </>
    )
}

export default Landing