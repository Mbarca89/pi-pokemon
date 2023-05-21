const Validations = (pokemonData, eventName) => {
    const result = {
        name: '',
        nameDisabled: true,
        type: '',
        typeDisabled: true
    }

    if (eventName === 'name') {
        if (pokemonData.name === '') {
            result.name = 'El nombre no puede estar vacio!'
        } else {
            result.name = ''
            result.nameDisabled = false
        }
    }
    if(eventName === 'type1')
        if (pokemonData.type.type1 === 'TIPO 1'){
        result.type = 'Elige al menos un tipo!'
    }else {
        result.name = ''
        result.typeDisabled = false
    }
    return result
}

export default Validations