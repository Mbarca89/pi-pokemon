import noResults from '../../img/noresults.png'
import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux'
import Pagination from './Pagination';
import Card from '../Card/Card'
import style from './Home.module.css'

//EN ESTE COMPONENTE SE MUESTRAN TODAS LAS CARTAS

const Home = () => {
    //DECLARACION DE VARIABLES
    const [data, setData] = useState([]) //ACA ALMACENO LOS POKEMONES
    const [currentPage, setCurrentPage] = useState(1)   //PAGINA ACTUAL DEL PAGINADO
    const [showJumper, setShowJumper] = useState(false) //MUESTRA Y OCULTA EL MENU PARA SALTAR DE PAGINA
    const [jumperValue, setJumperValue] = useState('')  //LA PAGINA A LA CUAL SE DEBE SALTAR
    const togle = useSelector(state => state.togle) //USO LA VARIABLE PARA DETECTAR CAMBIOS EN EL FILTRO
    const cardsPerPage = 12 //CANTIDAD DE CARTAS POR PAGINA
    const lastCardIndex = currentPage * cardsPerPage //LA ULTIMA CARTA
    const firstCardIndex = lastCardIndex - cardsPerPage //LA PRIMERA CARTA
    const stateData = useSelector(state => state.filteredPokemons) //TRAE LOS POKEMONES DEL ESTADO GLOBAL
    const showDataRef = useRef([])  //USA UNA REFERENCIA PARA NO MODIFICAR EL ESTADO
    //-------------------------------------------------------------------

    //CUANDO HAY UN CAMBIO EN EL ESTADO GLOBAL DE LOS POKEMONES, ACTUALIZO MI ESTADO LOCAL    
    useEffect(() => {
        setData(stateData)
    }, [stateData])
    //----------------------------------------------------------------

    //SETEO LOS POKEMONES A MOSTRAR
    let showData = data.slice(firstCardIndex, lastCardIndex)

    //ACTUALIZO EL EQUIPO DE POKEMONES PARA QUE EL COMPONENTE DETAIL TENGA LA INFO ACTUALIZADA

    //CUANDO HAY UN CAMBIO EN EL FILTRADO, ACTUALIZO LA INFORMACION A MOSTRAR USANDO LA REFERENCIA
    useEffect(() => {
        function getFilter() {
            setData(stateData)
            showDataRef.current = (stateData.slice(firstCardIndex, lastCardIndex))
        }
        getFilter()
        setCurrentPage(1)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [togle])
    //-------------------------------------------------------------------   

    //CUANDO HAY UN CAMBIO DE PAGINA, ACTUALIZO LA INFORMACION A MOSTRAR
    useEffect(() => {
        showDataRef.current = data.slice(firstCardIndex, lastCardIndex)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage])
    //-------------------------------------------------------------------

    //FUNCIONES PARA LOS BOTONES DEL PAGINADO
    const nextPage = () => {
        if (currentPage < Math.ceil(data.length / cardsPerPage)) setCurrentPage(currentPage + 1)
    }

    const prevPage = () => {
        if (currentPage !== 1) setCurrentPage(currentPage - 1)
    }

    const firstPage = () => {
        setCurrentPage(1)
    }

    const lastPage = () => {
        setCurrentPage(Math.ceil(data.length / cardsPerPage))
    }

    const showJump = () => {
        setShowJumper(!showJumper)
    }

    const jumper = (event) => {
        setJumperValue(event.target.value)
    }

    const keyHandler = (event) => {
        if (event.key === 'Enter') {
            if (0 < jumperValue && jumperValue <= (Math.ceil(data.length / cardsPerPage))) {
                setCurrentPage(event.target.value)
                setShowJumper(!showJumper)
            }
        }
    }
    //-------------------------------------------------------------

    return (
        <>
            <div className={style.home}>
                {showData[0] ? <div key='cards' className={style.cards}>
                    {showData.map(item => (
                        <div key={item.pokeId} className={style.gridItem}>
                            <Card
                                pokeId={item.pokeId}
                                name={item.name}
                                image={item.image}
                                type={item.type}
                            />
                        </div>
                    ))}
                    <div className={style.paginationContainer}>
                        <Pagination totalCards={data.length} currentPage={currentPage} nextPage={nextPage} prevPage={prevPage} firstPage={firstPage} lastPage={lastPage} showJump={showJump}></Pagination>
                        {showJumper && <div className={style.jumperContainer}>
                            <div className={style.jumper}>
                                {<input type="text" name="jumper" onChange={jumper} onKeyDown={keyHandler} value={jumperValue}></input>}
                            </div>
                        </div>}
                    </div>
                </div> : <img src={noResults} alt=''></img>}
            </div>
        </>
    )
}

export default Home