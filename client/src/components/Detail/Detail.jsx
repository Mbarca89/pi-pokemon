import { NavLink, useParams, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from "react"
import { typesImage, backColor } from '../../utils/types'
import { updatePokemonsTeam, getPokemons } from '../../redux/actions'
import style from './Detail.module.css'
import noImage from '../../img/noimage.png'
import opened from '../../img/opened.png'
import closed from '../../img/closed.png'
import deleteIcon from '../../img/close.png'
import editIcon from '../../img/edit.png'
import axios from 'axios'
const SERVER_URL = process.env.REACT_APP_SERVER_URL

const Detail = () => {

    //DECLARADION DE VARIABLES
    const pokemons = useSelector(state => state.allPokemons)
    const team = useSelector(state => state.pokemonsTeam)
    const currentTeam = useSelector(state => state.currentTeam)
    const userId = useSelector(state => state.currentUser)
    const teamOk = [...team]
    const [deleteOk, setDeleteOk] = useState(false)
    const [confirmDelete, setConfirmDelete] = useState(false)
    const [isInTeam, setIsInTeam] = useState(false)
    const [pokeball, setPokeball] = useState(opened)
    const [showError, setShowError] = useState({
        show: false,
        message: ""
    })
    const { id } = useParams();
    let pokemonIndex = pokemons.findIndex(pokemon => pokemon.pokeId === Number(id))
    let pokemon = pokemons[pokemonIndex]
    let next = pokemons.length
    let previous = 1
    const dispatch = useDispatch()
    const navigate = useNavigate()
    //----------------------------------------------------------------------------------
 
    //LIMPIO LOS ESTADOS AL DESMONTAR Y ACTUALIZO EL ESTADO GLOBAL CON LOS POQUEMOKES QUE HAYA AGREGADO O QUITADO DEL EQUIPO
    useEffect(() => {
        return () => {
            setIsInTeam()
            setPokeball()
            const getTeam = async () => {
                try {
                    const { data } = await axios(`${SERVER_URL}/team/teampokemons?teamId=${currentTeam}`)
                    await dispatch(updatePokemonsTeam(data))
                } catch (error) {
                    return error
                }
            }
            getTeam()
            pokemonIndex = undefined
            pokemon = undefined
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    //COMPRUEBO Y SETEO LOS BOTONES DE SIGUIENTE Y ANTERIOR PARA NAVEGAR LOS DETALLES
    if (pokemons[pokemonIndex].pokeId !== pokemons[pokemons.length - 1].pokeId) next = pokemons[pokemonIndex + 1].pokeId
    if (pokemons[pokemonIndex].pokeId !== pokemons[0].pokeId) previous = pokemons[pokemonIndex - 1].pokeId
    //----------------------------------------------------------------------------------

    //COMPRUEBO SI EL POKEMON ESTA EN EL EQUIPO Y SETEO LA PROPIEDAD isInTeam
    useEffect(() => {
        const teamCheck = teamOk.find(pokemon => pokemon.pokeId === Number(id))
        if (!teamCheck) setIsInTeam(false)
        else setIsInTeam(true)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])

    useEffect(() => {
        if (isInTeam) setPokeball(closed)
        else setPokeball(opened)
    }, [isInTeam])

    useEffect(() => {
        if (pokemon.userId && pokemon.userId === userId.id) setDeleteOk(true)
        else setDeleteOk(false)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pokemon])

    //FUNCION PARA AGREGAR O QUITAR DEL EQUIPO
    const teamHandler = async () => {
        const sendData = {
            pokeId: id,
            teamId: currentTeam
        }
        try {
            if (!isInTeam) {
                await axios.post(`${SERVER_URL}/team/addpokemon`, { id, teamId: currentTeam })
            } else {
                await axios.delete(`${SERVER_URL}/team/removepokemon`, { data: sendData })
            }
            setIsInTeam(!isInTeam)
        } catch (error) {
            setShowError({ message: error.response.data, show: true })
        }
    }

    const closeError = () => {
        setShowError({
            message: "",
            show: false
        })
    }

    const deleteHandler = () => {
        setConfirmDelete(true)
    }

    const confirmDeleteHandler = async (event) => {
        if (event.target.name === 'cancelar') setConfirmDelete(false)
        else {
            await axios.delete(`${SERVER_URL}/pokemons/delete/${pokemon.pokeId}`)
            dispatch(getPokemons())
            navigate(`../home`)
        }
    }

    const editHandler = () => {
        navigate(`../update/${id}`)
    }

    return (
        <div className={style.parent}>
            {showError.show && <p onClick={closeError} className={style.error}>{showError.message}</p>}
            <div style={pokemon.type.type1 && { backgroundColor: backColor[pokemon.type.type1.name] }} className={style.detailContainer}>
                {deleteOk && <img className={style.deleteIcon} src={deleteIcon} alt="" onClick={deleteHandler} />}
                {deleteOk && <img className={style.editIcon} src={editIcon} alt="" onClick={editHandler}/>}
                {confirmDelete && <div className={style.confirmDeleteContainer}>

                    <p>¿Estás seguro de querer eliminar a "{pokemon.name}"?</p>
                    <div className={style.deleteButtonContainer}>
                        <button onClick={confirmDeleteHandler} name='eliminar' className={style.deleteButton}>Eliminar</button>
                        <button onClick={confirmDeleteHandler} name='cancelar' className={style.deleteButton}>Cancelar</button>
                    </div>

                </div>}
                <div className={style.detail}>
                    <img className={style.pokeball} src={pokeball} alt="" onClick={teamHandler} />
                    <div className={style.imageContainer}>
                        <img src={pokemon.image ? pokemon.image : noImage} alt="" className={style.cardImg} />
                    </div>
                    <div className={style.statsContainer}>
                        <div className={style.nameContainer}>
                            <h5 className={style.name}>{pokemon.name}</h5>
                        </div>
                        <div className={style.stats}>
                            <div className={style.statsNames}>
                                <p className={style.pTag}>HP</p>
                                <p className={style.pTag}>ATTACK</p>
                                <p className={style.pTag}>DEFENSE</p>
                                <p className={style.pTag}>SPEED</p>
                            </div>
                            <div className={style.bars}>
                                <div className={style.barContainer}>
                                    <div style={{ width: `${pokemon.hp}%` }} className={style.bar}></div>
                                </div>
                                <div className={style.barContainer}>
                                    <div style={{ width: `${pokemon.attack}%` }} className={style.bar}></div>
                                </div>
                                <div className={style.barContainer}>
                                    <div style={{ width: `${pokemon.defense}%` }} className={style.bar}></div>
                                </div>
                                <div className={style.barContainer}>
                                    <div style={{ width: `${pokemon.speed}%` }} className={style.bar}></div>
                                </div>
                            </div>
                            <div className={style.statsNumbers}>
                                <p className={style.pTag}>{pokemon.hp}</p>
                                <p className={style.pTag}>{pokemon.attack}</p>
                                <p className={style.pTag}>{pokemon.defense}</p>
                                <p className={style.pTag}>{pokemon.speed}</p>
                            </div>
                        </div>
                        <div className={style.otherStats}>
                            <p className={style.otherTag}>{`HEIGHT: ${pokemon.height}`}</p>
                            <p className={style.otherTag}>{`WEIGHT: ${pokemon.weight}`}</p>
                        </div>
                        <div className={style.typeContainer}>
                            <div className={style.type1Container}>
                                <p className={style.cardText}>{pokemon.type.type1 && pokemon.type.type1.name}</p>
                                <img className={style.typeImg1} src={pokemon.type.type1 && typesImage[pokemon.type.type1.name]} alt=''></img>
                            </div>
                            <div className={style.type2Container}>
                                <p className={style.cardText}>{pokemon.type.type2 && pokemon.type.type2.name}</p>
                                <img className={style.typeImg2} src={pokemon.type.type2 && typesImage[pokemon.type.type2.name]} alt=''></img>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={style.buttonContainer}>
                <NavLink className={style.link} to={`/detail/${previous}`}>Anterior</NavLink>
                <NavLink className={style.link} to='/home'>Volver</NavLink>
                <NavLink className={style.link} to={`/detail/${next}`}>Siguiente</NavLink>
            </div>
        </div>
    )
}

export default Detail