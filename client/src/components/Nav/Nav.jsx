import style from './Nav.module.css'
import pokemonLogo from '../../img/pokemonLogo.png'
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loginUser } from '../../redux/actions';

const Nav = () => {
    //DECLARACION DE VARIABLES
    const location = useLocation();
    const isLoggedIn = useSelector(state => state.isLoggedIn)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    //---------------------------------------------------

    //SIMULA EL DESLOGUEO DEL USUARIO Y DEBERIA NAVEGAR AL INICIO PERO NO FUNCIONA
    const logoutHandler = () => {
        dispatch(loginUser(false))
        navigate('/home')
    }
    //-----------------------------------------------------------

    return (
        (location.pathname === '/home' || location.pathname === '/create' || location.pathname === '/team') && <div className={style.nav}>
            <div className={style.imageContainer}>
                <img className={style.image} src={pokemonLogo} alt=''></img>
            </div>
            <div className={style.buttonContainer}>
                <NavLink className={style.link} to='/home'>Home</NavLink>
                <NavLink className={style.link} to='/create'>Crear Pokemon</NavLink>
                <NavLink className={style.link} to='/team'>Mi Equipo</NavLink>
                {isLoggedIn ? <NavLink className={style.link} to='#' onClick={logoutHandler}>Logout</NavLink> : <NavLink className={style.link} to='/login'>Login</NavLink>}
            </div>
        </div>
    )
}

export default Nav