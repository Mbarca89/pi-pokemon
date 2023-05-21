import style from './Team.module.css'
import platform from '../../img/platform.png'
import closeIcon from '../../img/close.png'
import noImage from '../../img/noimage.png'
import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect, } from 'react';
import { typesImage } from '../../utils/types'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { updatePokemonsTeam } from '../../redux/actions'
const SERVER_URL = process.env.REACT_APP_SERVER_URL

const Team = () => {
    //DECLARACION DE VARIABLES
    const dispatch = useDispatch()
    const currentTeam = useSelector(state => state.currentTeam)
    const pokemonsTeam = useSelector(state => state.pokemonsTeam)
    const [pokemons, setPokemons] = useState([])
    const [attack, setAttack] = useState(0)
    const [defense, setDefense] = useState(0)
    const [types, setTypes] = useState([])
    const isLoggedIn = useSelector(state => state.isLoggedIn)
    const navigate = useNavigate()
    //-------------------------------------------------------------

    //AL CARGAR EL COMPONENTE, SI NO HAY UN USUARIO LOGUEADO, LO ENVIA AL LOGUIEN
    //SI HAY UN USUARIO, TRAE LOS POKEMONES DE SU EQUIPO AL ESTADO LOCAL
    useEffect(() => {
        const onLoad = async () => {
            !isLoggedIn && navigate('/login')
            const { data } = await axios(`${SERVER_URL}/team/teampokemons?teamId=${currentTeam}`)
            await dispatch(updatePokemonsTeam(data))
            setPokemons(pokemonsTeam)
        }
        onLoad()
        return () => {
            setPokemons()
            setAttack()
            setDefense()
            setTypes()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    //-------------------------------------------------------------

    //CONTROLADOR PARA QUITAR DEL EQUIPO
    const teamHandler = async (id) => {
        const sendData = {
            pokeId: id,
            teamId: currentTeam
        }
        try {
            await axios.delete(`${SERVER_URL}/team/removepokemon`, { data: sendData })
            let filtered = await pokemons.filter(pokemon => pokemon.pokeId !== id)
            filtered.length ? await setPokemons(filtered) : setPokemons([])
            dispatch(updatePokemonsTeam(filtered))
        } catch (error) {
            return error
        }
    }

    //CUANDO AGREGO O QUITO UN POKEMON, ACTUALIZO LA VISTA DEL EQUIPO
    useEffect(() => {
        setPokemons(pokemonsTeam)
    }, [pokemonsTeam])

    //CUANDO HAY UN CAMBIO EN ALGUN POKEMON, ACTUALIZA LAS ESTADISTICAS EL EQUIPO
    useEffect(() => {
        getTypes()
        getAttack()
        getDefense()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pokemons])
    //-------------------------------------------------------------

    //FUNCIONES PARA ACTUALIZAR ESTADISTICAS
    const getAttack = () => {
        let suma = 0
        pokemons.map(pokemon => {
            suma = suma + Number(pokemon.attack)
            return null
        })
        setAttack(suma)
    }

    const getDefense = () => {
        let suma = 0
        pokemons.map(pokemon => {
            suma = suma + Number(pokemon.defense)
            return null
        })
        setDefense(suma)
    }

    const getTypes = () => {
        const getTypesFunc = async () => {
            let getType = []
            getType = await pokemons.map(pokemon => {
                return pokemon.type.type1.name
            })
            setTypes(getType)
        }
        getTypesFunc()
    }
    //----------------------------------------------------------------------
    
    return (
        <div className={style.team}>
            <div className={style.teamContainer}>
                <img className={style.platform1} src={platform} alt="" />
                {pokemons[0] && (<div><img className={style.pokemon1} src={pokemons[0].image ? pokemons[0].image : noImage} alt="" /><img src={closeIcon} alt='' className={style.closeIcon1} onClick={() => teamHandler(pokemons[0].pokeId)}></img></div>)}
                <img className={style.platform2} src={platform} alt="" />
                {pokemons[1] && (<div><img className={style.pokemon2} src={pokemons[1].image ? pokemons[1].image : noImage} alt="" /><img src={closeIcon} alt='' className={style.closeIcon2} onClick={() => teamHandler(pokemons[1].pokeId)}></img></div>)}
                <img className={style.platform3} src={platform} alt="" />
                {pokemons[2] && (<div><img className={style.pokemon3} src={pokemons[2].image ? pokemons[2].image : noImage} alt="" /><img src={closeIcon} alt='' className={style.closeIcon3} onClick={() => teamHandler(pokemons[2].pokeId)}></img></div>)}
                <img className={style.platform4} src={platform} alt="" />
                {pokemons[3] && (<div><img className={style.pokemon4} src={pokemons[3].image ? pokemons[3].image : noImage} alt="" /><img src={closeIcon} alt='' className={style.closeIcon4} onClick={() => teamHandler(pokemons[3].pokeId)}></img></div>)}
                <img className={style.platform5} src={platform} alt="" />
                {pokemons[4] && (<div><img className={style.pokemon5} src={pokemons[4].image ? pokemons[4].image : noImage} alt="" /><img src={closeIcon} alt='' className={style.closeIcon5} onClick={() => teamHandler(pokemons[4].pokeId)}></img></div>)}
            </div>
            <div className={style.teamBalanceContainer}>
                <div className={style.teamBalance}>
                    <div className={style.stats}>
                        <div className={style.attack}>
                            <p className={style.p}>Ataque Total:</p>
                            <p className={style.p}>{attack}</p>
                        </div>
                        <div className={style.defense}>
                            <p className={style.p}>defensa Total:</p>
                            <p className={style.p}>{defense}</p>
                        </div>
                    </div>
                    <p className={style.p}>tipos elegidos:</p>
                    <div className={style.types}>
                        {typesImage[types[0]] && <img src={typesImage[types[0]]} alt='' className={style.typeImg}></img>}
                        {typesImage[types[1]] && <img src={typesImage[types[1]]} alt='' className={style.typeImg}></img>}
                        {typesImage[types[2]] && <img src={typesImage[types[2]]} alt='' className={style.typeImg}></img>}
                        {typesImage[types[3]] && <img src={typesImage[types[3]]} alt='' className={style.typeImg}></img>}
                        {typesImage[types[4]] && <img src={typesImage[types[4]]} alt='' className={style.typeImg}></img>}
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Team