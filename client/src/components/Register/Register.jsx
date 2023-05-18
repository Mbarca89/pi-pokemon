import style from './Register.module.css'
import Validations from './validations'
import { useEffect, useState } from "react"
import register from '../../img/register.png'
import { NavLink } from 'react-router-dom';
import axios from 'axios'
const SERVER_URL = process.env.REACT_APP_SERVER_URL

const Register = () => {
    //DECLARACION DE VARIABLES
    
    const [userData, setUserData] = useState({
        password: '',
        password2: '',
        name: '',
        eventName: ''
    })
    const [errors, setErrors] = useState({
        password: '',
        disabled1: true,
        password2: '',
        disabled2: true
    })
    const [showError, setShowError] = useState({
        message: '',
        show: false
    })
    const [registerOk, setRegisterOk] = useState({
        registerStatus: false,
        message: ''
    })
    let isDisabled = true
    //-----------------------------------------------   

    //PARA CONTROLAR EL FORMULARIO
    const onChangeHandler = (event) => {
        setUserData({
            ...userData,
            [event.target.name]: event.target.value,
            eventName: event.target.name
        })
        setShowError({
            show: false
        })
    }
    //--------------------------------------------------

    //MANEJA EL SUBMIT DEL FORMULARIO, HACE UN POST PARA REGISTRAR AL USUARIO
    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            const { data } = await axios.post(`${SERVER_URL}/user/create`, userData)
            setRegisterOk({
                registerStatus: true,
                message: data
            })
        } catch (error) {
            setShowError({
                message: error.response.data,
                show: true
            })
            return error
        }

    }
    //---------------------------------------------------------------

    //LLAMA A LA FUNCION DE VALIDACION CADA VEZ QUE SE MODIFICA EL FORMULARIO
    useEffect(() => {
        let val = Validations(userData, userData.eventName)
        if (userData.eventName === 'password') {
            setErrors({
                ...errors,
                password: val.password,
                disabled1: val.disabled1
            })
        }
        if (userData.eventName === 'password2') {
            setErrors({
                ...errors,
                password2: val.password2,
                disabled2: val.disabled2
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userData])
    //---------------------------------------------------------------

    //CONTROLA ERRORES. SI EL NOMBRE DE USUARIO ESTA VACIO O SI HAY ALGUN ERROR EN LOS CAMPOS DE
    //CONTRASEÑA, DESHABILITA EL BOTON DE REGISTRO
    if (userData.name) {
        if (!errors.disabled1 && !errors.disabled2) isDisabled = false
    } else isDisabled = true
    //----------------------------------------------------------------------

    return (

        !registerOk.registerStatus ? <div className={style.register}>
            {showError.show && <p className={style.error}>{showError.message}</p>}
            <img className={style.image} src={register} alt=''></img>
            <form className={style.form}>
                <div className={style.name}>
                    <label className={style.label} htmlFor='name'>Nombre de Usuario</label>
                    <input className={style.bar} name='name' type='text' value={userData.name} onChange={onChangeHandler}></input>
                </div>
                <div className={style.password}>
                    <label className={style.label} htmlFor='name'>Contraseña</label>
                    <input className={style.bar} name='password' type='password' value={userData.password} onChange={onChangeHandler}></input>
                    {errors.password && <div className={style.passError}> <p>{errors.password}</p></div>}
                </div>
                <div className={style.password2}>
                    <label className={style.label} htmlFor='name'>Repetir contraseña</label>
                    <input className={style.bar} name='password2' type='password' value={userData.password2} onChange={onChangeHandler}></input>
                    {errors.password2 && <div className={style.pass2Error}> <p>{errors.password2}</p></div>}
                </div>
            </form>
            <div className={style.buttonContainer}>
                <NavLink className={style.link} to='/'>Cancelar</NavLink>
                <NavLink className={isDisabled ? style.linkd : style.link} onClick={!isDisabled && handleSubmit}>Registrarme</NavLink>
            </div>
        </div> : <div className={style.registerOk}>
            <p>{registerOk.message}</p>
            <NavLink className={style.okLink} to='/login'>Login</NavLink>
        </div>
    )
}

export default Register