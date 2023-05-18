import { React, useState, useEffect } from "react"
import style from './Menu.module.css'
import lupa from '../../img/lupa.png'
import { useSearch } from '../../hooks/useSearch'
import { useFilter } from "../../hooks/useFilter"
import { useSort } from "../../hooks/useSort"
import { useSelector } from 'react-redux'
import { typesImage } from '../../utils/types'
import none from '../../img/none.png'

const Menu = ({ menuOpen }) => {

    //DECLARACION DE VARIABLES
    const pokemonFound = useSelector(state => state.isFiltered)
    const togle = useSelector(state => state.togle)
    const [searchError, setSearchError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [showMenu, setShowMenu] = useState(false)
    const [searchData, setSearchData] = useState('')
    const [sortId, setSortId] = useState(false)
    const [sortAttack, setSortAttack] = useState(true)
    //----------------------------------------------------------

    // USO ESTE USE EFFECT PARA MOSTRAR O NO EL CARTEL DE ERROR CUANDO SE BUSCA UN POKEMON
    useEffect(() => {
        if (!pokemonFound) setSearchError(true)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [togle])
    //-------------------------------------------------------------------------

    //IMPORTO LOS HOOKS PERSONALIZADOS
    const { searchPokemon } = useSearch()
    const { filterByType, filterByOirigin, filterReset } = useFilter()
    const { sortById, sortByAttack } = useSort()
    //---------------------------------------------------------------------

    //CONTROLADOR DE FORMULARIO Y HAGO QUE NO SE MUESTRE EL CARTEL DE ERROR
    const onChangeHandler = (event) => {
        setSearchData(event.target.value)
        setSearchError(false)
    }
    //---------------------------------------------------------------

    //EJECUTO LA FUNCION DE MI HOOK PARA BUSCAR. SI NO ENCUENTRA NADA ME DEVUELVE EL MENSAJE
    //QUE MUESTRO EN EL CARTEL DE ERROR
    //SI ENCUENTRA ALGO SE LO ENVIA DIRECTAMENTE AL ESTADO GLOBAL Y SE RENDERIZA EN HOME
    const onClickHandler = async () => {
        const message = await searchPokemon(searchData)
        setErrorMessage(message)
    }
    //-------------------------------------------------------------------

    //HACO LO MISMO QUE EL CLICK PERO AGREGA LA FUNCIONALIDAD PAR ABUSCAR APRETANDO LA TECLA ENTER
    const keyHandler = async (event) => {
        if (event.key === 'Enter') {
            const message = await searchPokemon(searchData)
            setErrorMessage(message)
        }
    }
    //---------------------------------------------------------------------

    //CONTROLA CUANDO SE HACE CLICK EN EL ICONO DE ALGUN TIPO Y LLAMA AL FILTRO
    const typeHandler = (event) => {
        filterByType(event.target.name)
    }
    //------------------------------------------------------------------------

    //MUESTRA Y OCULTA EL MENU PARA FILTRAR POR PROCEDENCIA
    const showMenuHandler = () => {
        setShowMenu(!showMenu)
    }
    //----------------------------------------------------------------------

    //REALIZA EL FILTRADO SEGUN LA OPCION ELEGIDA Y CIERRA EL MENU
    const showFilterHandler = (event) => {
        filterByOirigin(event.target.name)
        setShowMenu(!showMenu)
    }
    //-------------------------------------------------------------------------

    //MANEJA EL ORDENAMIENTO SEGUN LO ELEGIDO Y DA VUELTA LA FLECHA HACIA ARRIBA O HACIA ABAJO
    const sortHandler = (event) => {
        if (event.target.name === 'id') {
            sortById(event.target.value)
            setSortId(!sortId)
        } else {
            sortByAttack(event.target.value)
            setSortAttack(!sortAttack)
        }
    }
    //-----------------------------------------------------------------------------------

    //LLAMA A LA FUNCION QUE RESETEA TODOS LOS FILTROS
    const resetHandler = () => {
        filterReset()
    }
    //------------------------------------------------------------------------------

    return (
        <div style={menuOpen ? { opacity: 1, width: 300 } : { opacity: 0, width: 0 }} className={style.menuContainer}>
            <div className={style.searchBar}>
                <input placeholder="Ingrese una ID o Nombre" className={style.bar} name='search' type="text" value={searchData} onChange={onChangeHandler} onKeyDown={keyHandler} />
                <img className={style.searchIcon} src={lupa} alt="" onClick={onClickHandler} />
                {searchError && <div className={style.searchError}> <p className={style.searchP}>{errorMessage}</p></div>}
            </div>
            <div className={style.showContainer}>
                <button className={style.button} onClick={showMenuHandler}>Mostrar...</button>
                <div style={showMenu ? { height: '70%', opacity: 1 } : { height: '0%', opacity: 0 }} className={style.show}>
                    <button name='todos' onClick={showFilterHandler} className={style.showButton}>todos</button>
                    <button name='api' onClick={showFilterHandler} className={style.showButton}>oficiales</button>
                    <button name='db' onClick={showFilterHandler} className={style.showButton}>fan made</button>
                    <button name='mios' onClick={showFilterHandler} className={style.showButton}>mis pokemons</button>
                </div>
            </div>
            <div className={style.sortContainer}>
                {sortId ? <button value='A' name='id' className={style.sortButton} onClick={sortHandler}>ID ↑</button> : <button value='D' name='id' className={style.sortButton} onClick={sortHandler}>ID ↓</button>}
                {sortAttack ? <button value='A' name='attack' className={style.sortButton} onClick={sortHandler}>Ataque ↑</button> : <button value='D' name='attack' className={style.sortButton} onClick={sortHandler}>Ataque ↓</button>}
            </div>
            <div className={style.typeFilterContainer}>
                <div className={style.typeFilter}>
                    <img className={style.type1Img} src={typesImage.fire} alt="Fire" name="fire" onClick={typeHandler} />
                    <img className={style.type1Img} src={typesImage.water} alt="Water" name="water" onClick={typeHandler} />
                    <img className={style.type1Img} src={typesImage.grass} alt="Grass" name="grass" onClick={typeHandler} />
                    <img className={style.type1Img} src={typesImage.electric} alt="Electric" name="electric" onClick={typeHandler} />
                    <img className={style.type1Img} src={typesImage.ice} alt="Ice" name="ice" onClick={typeHandler} />
                    <img className={style.type1Img} src={typesImage.normal} alt="Normal" name="normal" onClick={typeHandler} />
                    <img className={style.type1Img} src={typesImage.bug} alt="Bug" name="bug" onClick={typeHandler} />
                    <img className={style.type1Img} src={typesImage.dark} alt="Dark" name="dark" onClick={typeHandler} />
                    <img className={style.type1Img} src={typesImage.dragon} alt="Dragon" name="dragon" onClick={typeHandler} />
                    <img className={style.type1Img} src={typesImage.fairy} alt="Fairy" name="fairy" onClick={typeHandler} />
                    <img className={style.type1Img} src={typesImage.fighting} alt="Fighting" name="fighting" onClick={typeHandler} />
                    <img className={style.type1Img} src={typesImage.flying} alt="Flying" name="flying" onClick={typeHandler} />
                    <img className={style.type1Img} src={typesImage.ghost} alt="Ghost" name="ghost" onClick={typeHandler} />
                    <img className={style.type1Img} src={typesImage.ground} alt="Ground" name="ground" onClick={typeHandler} />
                    <img className={style.type1Img} src={typesImage.poison} alt="Poison" name="poison" onClick={typeHandler} />
                    <img className={style.type1Img} src={typesImage.psychic} alt="Psychic" name="psychic" onClick={typeHandler} />
                    <img className={style.type1Img} src={typesImage.rock} alt="Rock" name="rock" onClick={typeHandler} />
                    <img className={style.type1Img} src={typesImage.steel} alt="Steel" name="steel" onClick={typeHandler} />
                    <img className={style.type1Img} src={none} alt="None" name="none" onClick={typeHandler} />
                </div>
            </div>
            <button className={style.resetButton} onClick={resetHandler}>Reset</button>
        </div>
    )

}

export default Menu