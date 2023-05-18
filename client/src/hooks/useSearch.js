import { useDispatch } from 'react-redux'
import { filter } from '../redux/actions'
import axios from 'axios'
const SERVER_URL = process.env.REACT_APP_SERVER_URL

export const useSearch = () => {
    const dispatch = useDispatch()

    const searchPokemon = async (searchParameter) => {
        try {
            if (isNaN(searchParameter / 1)) {
                const { data } = await axios(`${SERVER_URL}/pokemons/name?name=${searchParameter}`)
                dispatch(filter(true, [data]))
            }
            if (searchParameter !== '' && !isNaN(searchParameter / 1)) {
                const { data } = await axios(`${SERVER_URL}/pokemons/${searchParameter}`)
                dispatch(filter(true, [data]))
            }
            return ''
        } catch (error) {
            dispatch(filter(false, []))
            return error.response.data
        }
    }

    return {
        searchPokemon
    }
}