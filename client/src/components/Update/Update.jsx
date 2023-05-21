import style from './Update.module.css'
import noImage from '../../img/noimage.png'
import none from '../../img/none.png'
import Validations from './validations'
import { getPokemons } from '../../redux/actions'
import { typesImage, backColor } from '../../utils/types'
import { useState, useRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
const URL = process.env.REACT_APP_URL
const API_KEY = process.env.REACT_APP_API_KEY
const SERVER_URL = process.env.REACT_APP_SERVER_URL

const Update = () => {
    //DECLARACION DE VARIABLES
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const inputRef = useRef(null)
    const userId = useSelector(state => state.currentUser)
    const pokemons = useSelector(state => state.allPokemons)
    const [background, setBackground] = useState('#ffcb05')
    const [type1Img, settype1Img] = useState('')
    const [type2Img, settype2Img] = useState('')
    const [menu1, setMenu1] = useState(false)
    const [menu2, setMenu2] = useState(false)
    const [type1State, setType1State] = useState(true)
    const [file, setFile] = useState()
    const [errors, setErrors] = useState({
        name: '',
        nameDisabled: false,
        type: '',
        typeDisabled: false
    })
    let isDisabled = false
    const { id } = useParams();
    const pokemonIndex = pokemons.findIndex(pokemon => pokemon.pokeId === Number(id))
    const pokemon = pokemons[pokemonIndex]
    //-------------------------------------------------------------

    //SETEO CON LOS VALORES DEL POKEMON A EDITAR
    useEffect(()=>{
        setBackground(backColor[pokemon.type.type1.name])
        settype1Img(pokemon.type.type1.name)
        pokemon.type.type2.name && settype2Img(pokemon.type.type2.name)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    //------------------------------------------------------------------

    //LLENO EL FORMULARIO CON LOS DATOS DEL POKEMON A EDITAR
    const [pokemonData, setPokemonData] = useState({
        pokeId:id,
        name:pokemon.name,
        hp:pokemon.hp,
        attack:pokemon.attack,
        defense:pokemon.defense,
        speed:pokemon.speed,
        height:pokemon.height,
        weight:pokemon.weight,
        image:pokemon.image,
        type:{
            type1:pokemon.type.type1.name,
            type2:pokemon.type.type2.name
        },
        eventName: '',
        userId: userId.id
    })

    //-----------------------------------------------------------
    
    //LLAMO A LA FUNCION DE VALIDACION CADA VEZ QUE HAY UN CAMBIO EN ALGUN CAMPO
    useEffect(() => {
        let val = Validations(pokemonData, pokemonData.eventName)
        if (pokemonData.eventName === 'name') {
            setErrors({
                ...errors,
                name: val.name,
                nameDisabled: val.nameDisabled
            })
        }
        if (pokemonData.eventName === 'type1') {
            setErrors({
                ...errors,
                type: val.type,
                typeDisabled: val.typeDisabled
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pokemonData])

    //------------------------------------------------------------

    //FUNCION PARA TENER UN FORMULARIO CONTROLADO
    const onChangeHandler = (event) => {
        setPokemonData({
            ...pokemonData,
            [event.target.name]: event.target.value,
            eventName: event.target.name
        })
    }
    //-------------------------------------------------------

    //FUNCION PARA ABRIR Y CERRAR EL MENU DE TIPO 1
    const openMenu1 = () => {
        setMenu1(!menu1)
    }
    //--------------------------------------------------------

    //FUNCION PARA ABRIR Y CERRAR EL MENU DE TIPO 1
    const openMenu2 = () => {
        setMenu2(!menu2)
    }
    //--------------------------------------------------------

    //FUNCION DEL TIPO 1. ACTUALIZA EL VALOR DEL POKEMON, SETEA EL COLOR DEL FONDO, CIERRA EL MENU
    //SETEA LA IMAGEN DEL TIPO UNO Y EL ESTADO PARA HABILITAR LA ELECCION DLE TIPO 2
    const type1Handler = (event) => {
        let typeName = event.target.name
        setPokemonData({
            ...pokemonData,
            type: { ...pokemonData.type, type1: typeName },
            eventName: 'type1'
        })
        setBackground(backColor[typeName])
        setMenu1(false)
        settype1Img(typeName)
        setType1State(true)
    }
    //---------------------------------------------------------------

    //FUNCION DEL TIPO 2. ACTUALIZA EL VALOR DEL POKEMON, CIERRA EL MENU, SETEA LA IMAGEN DEL TIPO 2
    const type2Handler = (event) => {
        let typeName = event.target.name
        setPokemonData({
            ...pokemonData,
            type: { ...pokemonData.type, type2: typeName }
        })
        setMenu2(false)
        settype2Img(typeName)
    }
    //-------------------------------------------------------------

    //ESTA FUNCION HACE CLICK AL BOTON PARA CARGAR LA IMAGEN. ESTA HECHO DE ESTA FORMA PARA PODER DARLE
    //ESTILOS PERSONALIZADOS AL UPLOADER
    const uploadHandler = () => {
        inputRef.current.click()
    }
    //-----------------------------------------------------

    //CARGA EN EL ESTADO LOCAL LA IMAGEN ELEGIDA POR EL USUARIO
    const selectFileHandler = (event) => {
        setFile(event.target.files[0])
    }
    //-------------------------------------------------------------

    //CONVIERTE LA IMAGEN A FORMDATA QUE ES EL FORMATO REQUERIDO POR EL SERVICIO DE HOSTING DE IMAGENES
    //AXIOS ME DEVUELVE UNA URL Y SE LA ASIGNO A LA PROPIEDAD IMAGEN DEL POKEMON A CREAR
    const uploadFileHandler = async () => {
        const fd = new FormData()
        fd.append('image', file)
        const { data } = await axios.post(`${URL}?key=${API_KEY}`, fd)
        setPokemonData({
            ...pokemonData,
            image: data.data.url
        })
    }
    //---------------------------------------------------------------------------

    //MANEJO DEL SUBMIT DEL FORMULARIO.
    // ACTUALIZO EL POKEMON, ACTUALIZO LA LISTA DE POKEMONES
    // REDIRECCIONO AL HOME.
    const handleSubmit = async () => {
        await axios.post(`${SERVER_URL}/pokemons/update`, pokemonData)
        dispatch(getPokemons())
        navigate(`../home`)
    }
    //-------------------------------------------------------------------------

    //MANEJO DE ERRORES PARA MOSTRAR U OCULTAR LOS CARTELES CON ERROR
    if (!errors.nameDisabled && !errors.typeDisabled) isDisabled = false
    else isDisabled = true
    //----------------------------------------------------------------------   

    return (
        <div className={style.create}>
            {errors.name && <div className={style.nameError}> <p>{errors.name}</p></div>}
            <div style={{ backgroundColor: background }} className={style.creator}>
                <div className={style.detail}>
                    <div className={style.imageContainer}>
                        <img src={pokemonData.image ? pokemonData.image : noImage} alt="" className={style.cardImg} />
                    </div>
                    <div className={style.statsContainer}>

                        <div className={style.nameContainer}>
                            <input placeholder='NOMBRE...' name='name' className={style.name} type="text" value={pokemonData.name} onChange={onChangeHandler} />
                        </div>
                        <div className={style.stats}>
                            <div className={style.statsNames}>
                                <p className={style.pTag}>HP</p>
                                <p className={style.pTag}>ATTACK</p>
                                <p className={style.pTag}>DEFENSE</p>
                                <p className={style.pTag}>SPEED</p>
                                <p className={style.pTag}>HEIGHT</p>
                                <p className={style.pTag}>WEIGHT</p>
                            </div>
                            <div className={style.bars}>
                                <div className={style.barContainer}>
                                    <input name='hp' type="range" className={style.bar} onChange={onChangeHandler} min='1' max='100' value={pokemonData.hp} />
                                </div>
                                <div className={style.barContainer}>
                                    <input name='attack' type="range" className={style.bar} onChange={onChangeHandler} min='1' max='100' value={pokemonData.attack} />
                                </div>
                                <div className={style.barContainer}>
                                    <input name='defense' type="range" className={style.bar} onChange={onChangeHandler} min='1' max='100' value={pokemonData.defense} />
                                </div>
                                <div className={style.barContainer}>
                                    <input name='speed' type="range" className={style.bar} onChange={onChangeHandler} min='1' max='100' value={pokemonData.speed} />
                                </div>
                                <div className={style.barContainer}>
                                    <input name='height' type="range" className={style.bar} onChange={onChangeHandler} min='1' max='100' value={pokemonData.height} />
                                </div>
                                <div className={style.barContainer}>
                                    <input name='weight' type="range" className={style.bar} onChange={onChangeHandler} min='1' max='1000' value={pokemonData.weight} />
                                </div>
                            </div>
                            <div className={style.statsNumbers}>
                                <p className={style.pTag}>{pokemonData.hp}</p>
                                <p className={style.pTag}>{pokemonData.attack}</p>
                                <p className={style.pTag}>{pokemonData.defense}</p>
                                <p className={style.pTag}>{pokemonData.speed}</p>
                                <p className={style.pTag}>{pokemonData.height}</p>
                                <p className={style.pTag}>{pokemonData.weight}</p>
                            </div>
                        </div>
                        {errors.type && <div className={style.typeError}> <p>{errors.type}</p></div>}
                        <div className={style.typeContainer}>
                            <div className={style.type1Container} onClick={openMenu1}>
                                <p className={style.cardText}>{pokemonData.type.type1}</p>
                                <img className={style.typeImg1} src={typesImage[type1Img]} alt=''></img>
                            </div>
                            {type1State && <div className={style.type2Container} onClick={openMenu2}>
                                <p className={style.cardText}>{pokemonData.type.type2?pokemonData.type.type2:'TIPO 2'}</p>
                                <img className={style.typeImg2} src={typesImage[type2Img]} alt=''></img>
                            </div>}
                        </div>
                        {menu1 && <div className={style.type1MenuContainer}>
                            <div className={style.type1Menu}>
                                <img className={style.type1Img} src={typesImage.fire} alt="Fire" name="fire" onClick={type1Handler} />
                                <img className={style.type1Img} src={typesImage.water} alt="Water" name="water" onClick={type1Handler} />
                                <img className={style.type1Img} src={typesImage.grass} alt="Grass" name="grass" onClick={type1Handler} />
                                <img className={style.type1Img} src={typesImage.electric} alt="Electric" name="electric" onClick={type1Handler} />
                                <img className={style.type1Img} src={typesImage.ice} alt="Ice" name="ice" onClick={type1Handler} />
                                <img className={style.type1Img} src={typesImage.normal} alt="Normal" name="normal" onClick={type1Handler} />
                                <img className={style.type1Img} src={typesImage.bug} alt="Bug" name="bug" onClick={type1Handler} />
                                <img className={style.type1Img} src={typesImage.dark} alt="Dark" name="dark" onClick={type1Handler} />
                                <img className={style.type1Img} src={typesImage.dragon} alt="Dragon" name="dragon" onClick={type1Handler} />
                                <img className={style.type1Img} src={typesImage.fairy} alt="Fairy" name="fairy" onClick={type1Handler} />
                                <img className={style.type1Img} src={typesImage.fighting} alt="Fighting" name="fighting" onClick={type1Handler} />
                                <img className={style.type1Img} src={typesImage.flying} alt="Flying" name="flying" onClick={type1Handler} />
                                <img className={style.type1Img} src={typesImage.ghost} alt="Ghost" name="ghost" onClick={type1Handler} />
                                <img className={style.type1Img} src={typesImage.ground} alt="Ground" name="ground" onClick={type1Handler} />
                                <img className={style.type1Img} src={typesImage.poison} alt="Poison" name="poison" onClick={type1Handler} />
                                <img className={style.type1Img} src={typesImage.psychic} alt="Psychic" name="psychic" onClick={type1Handler} />
                                <img className={style.type1Img} src={typesImage.rock} alt="Rock" name="rock" onClick={type1Handler} />
                                <img className={style.type1Img} src={typesImage.steel} alt="Steel" name="steel" onClick={type1Handler} />
                            </div>
                        </div>}
                        {menu2 && <div className={style.type2MenuContainer}>
                            <div className={style.type2Menu}>
                                <img className={style.type1Img} src={typesImage.fire} alt="Fire" name="fire" onClick={type2Handler} />
                                <img className={style.type1Img} src={typesImage.water} alt="Water" name="water" onClick={type2Handler} />
                                <img className={style.type1Img} src={typesImage.grass} alt="Grass" name="grass" onClick={type2Handler} />
                                <img className={style.type1Img} src={typesImage.electric} alt="Electric" name="electric" onClick={type2Handler} />
                                <img className={style.type1Img} src={typesImage.ice} alt="Ice" name="ice" onClick={type2Handler} />
                                <img className={style.type1Img} src={typesImage.normal} alt="Normal" name="normal" onClick={type2Handler} />
                                <img className={style.type1Img} src={typesImage.bug} alt="Bug" name="bug" onClick={type2Handler} />
                                <img className={style.type1Img} src={typesImage.dark} alt="Dark" name="dark" onClick={type2Handler} />
                                <img className={style.type1Img} src={typesImage.dragon} alt="Dragon" name="dragon" onClick={type2Handler} />
                                <img className={style.type1Img} src={typesImage.fairy} alt="Fairy" name="fairy" onClick={type2Handler} />
                                <img className={style.type1Img} src={typesImage.fighting} alt="Fighting" name="fighting" onClick={type2Handler} />
                                <img className={style.type1Img} src={typesImage.flying} alt="Flying" name="flying" onClick={type2Handler} />
                                <img className={style.type1Img} src={typesImage.ghost} alt="Ghost" name="ghost" onClick={type2Handler} />
                                <img className={style.type1Img} src={typesImage.ground} alt="Ground" name="ground" onClick={type2Handler} />
                                <img className={style.type1Img} src={typesImage.poison} alt="Poison" name="poison" onClick={type2Handler} />
                                <img className={style.type1Img} src={typesImage.psychic} alt="Psychic" name="psychic" onClick={type2Handler} />
                                <img className={style.type1Img} src={typesImage.rock} alt="Rock" name="rock" onClick={type2Handler} />
                                <img className={style.type1Img} src={typesImage.steel} alt="Steel" name="steel" onClick={type2Handler} />
                                <img className={style.type1Img} src={none} alt="None" name="none" onClick={type2Handler} />
                            </div>
                        </div>}
                    </div>
                </div>
                <div className={style.imageUploader}>
                    <input accept='image/png, image/jpeg' hidden className={style.uploadFile} type="file" ref={inputRef} onChange={selectFileHandler} />
                    <button onClick={uploadHandler}>Elegir archivo</button>
                    <button onClick={uploadFileHandler}>Subir</button>
                </div>
            </div>
            <div className={style.buttonContainer}>
                <NavLink className={isDisabled ? style.linkd : style.link} onClick={!isDisabled && handleSubmit}>Actualizar</NavLink>
            </div>
        </div>
    )
}

export default Update