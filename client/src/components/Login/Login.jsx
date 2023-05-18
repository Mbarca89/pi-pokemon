import style from './Login.module.css'
import { useEffect, useState } from "react"
import { useDispatch } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom';
import { loginUser } from '../../redux/actions'
import loginLogo from '../../img/login.png'
import axios from 'axios'
const SERVER_URL = process.env.REACT_APP_SERVER_URL

const Login = () => {
    //DECLARACION DE VARIABLES
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [userData, setUserData] = useState({
        name: '',
        password: '',
    })
    const [errors, setErrors] = useState({
        name: true,
        password: true
    })
    const [showError, setShowError] = useState({
        show: false,
        message: ''
    })
    //------------------------------------------------

    //FUNCION PARA CONTROLAR EL FORMULARIO, CUANDO HAY UN CAMBIO OCULTA EL CARTEL DE ERROR
    const onChangeHandler = (event) => {
        setUserData({
            ...userData,
            [event.target.name]: event.target.value,
        })
        setErrors({
            ...errors,
            [event.target.name]: false
        })
        setShowError({ show: false })
    }
    //--------------------------------------------------

    //SI ALGUNO DE LOS FORMULARIOS QUEDA VACIO OTRA VEZ, DESHABILITO EL BOTON DE ENTRAR
    useEffect(() => {
        if (userData.name === '') setErrors({
            ...errors,
            name: true
        })
        if (userData.password === '') setErrors({
            ...errors,
            password: true
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userData])

    //FUNCION PARA CONTROLAR EL SUBMIT DEL FORMULARIO
    const handleSubmit = async (event) => {
        event.preventDefault()
        //HAGO UN POST CON LOS DATOS DEL USUARIO. UN GET PARA OBTENER EL ID DE SU EQUIPO
        //CARGO EL EQUIPO EN EL ESTADO GLOBAL
        //SI SE LOGEO CORRECTAMENTE, NAVEGO AL HOME, SI NO MUESTRO EL ERROR
        try {
            const res = await axios.post(`${SERVER_URL}/user/login`, userData)
            await dispatch(loginUser(res.data.isLoggedIn, { id: res.data.user.id, name: res.data.user.name }, res.data.user.team.id))
            res.data.isLoggedIn && navigate('/home')
        } catch (error) {
            setShowError({ message: error.response.data, show: true })
            return error
        }
    }

    return (
        <>
            <div className={style.login}>
                {showError.show && <p className={style.error}>{showError.message}</p>}
                <img className={style.image} src={loginLogo} alt=''></img>
                <form className={style.form}>
                    <div className={style.name}>
                        <label className={style.label} htmlFor='name'>Nombre de Usuario</label>
                        <input className={style.bar} name='name' type='text' value={userData.name} onChange={onChangeHandler}></input>
                    </div>
                    <div className={style.password}>
                        <label className={style.label} htmlFor='name'>Contraseña</label>
                        <input className={style.bar} name='password' type='password' value={userData.password} onChange={onChangeHandler}></input>
                    </div>
                </form>
                <div className={style.buttonContainer}>
                    <NavLink className={(errors.name || errors.password) ? style.linkd : style.link} onClick={handleSubmit} >Entrar!</NavLink>
                    <NavLink className={style.link} to='/register'>Registrarme</NavLink>
                </div>
                <div className={style.homeButtonContainer}>
                    <NavLink className={style.link} to='/home'>Home</NavLink>
                </div>
            </div>
        </>
    )
}

export default Login