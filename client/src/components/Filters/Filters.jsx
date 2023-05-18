import style from './Filters.module.css'
import menu from '../../img/menu.png'
import Menu from '../Menu/Menu'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'

//ESTE COMPONENTE SOLO MUESTRA EL ICONO DEL MENU DE FILTRADOS EN EL COMPONENTE HOME

const Filters = () => {
    //DECLARACION DE VARIABLES
    const location = useLocation()
    const [menuOpened, setMenuOpened] = useState(false)
    //------------------------------------------------------

    //FUNCION PARA ABRIR Y CERRAR EL MENU
    const openMenu = () => {
        setMenuOpened(!menuOpened)
    }
    //------------------------------------------------------------

    return (
        location.pathname === '/home' && <div className={style.filterContainer}>
            <div className={style.iconContainer}>
                <img className={style.menuIcon} src={menu} alt="" onClick={openMenu} />
            </div>
            <Menu menuOpen={menuOpened} />
        </div>
    )
}

export default Filters