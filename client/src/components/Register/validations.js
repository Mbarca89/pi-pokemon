const Validations = (userData, eventName) => {
    let res = {
        password: '',
        disabled1: true,
        password2: '',
        disabled2: true
        }
        
    if(eventName==='password'){
        if(userData.password.length < 6 ){
            res.password = 'La contraseña debe tener mas de 6 caracteres'
            }
        else {
            res.password = ''
            res.disabled1 = false
        }
        return res
    }

    if(eventName==='password2'){
        if(userData.password !== userData.password2){
            res.password2 = 'Las contraseñas no coinciden'
            }
        else {
            res.password2 = ''
            res.disabled2 = false
        }
        return res
    }
    
}
    

export default Validations