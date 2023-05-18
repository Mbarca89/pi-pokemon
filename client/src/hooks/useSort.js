import { useSelector, useDispatch } from 'react-redux'
import { filter } from '../redux/actions'

export const useSort = () => {

    const dispatch = useDispatch()
    const nowShowing = useSelector(state => state.filteredPokemons)
    let results = [...nowShowing]

    const sortById = async (sortParameter) => {
        if (sortParameter === 'A') {
            await results.sort((a, b) => a.pokeId - b.pokeId);
            dispatch(filter(true, results))
        }
        if (sortParameter === 'D') {
            await results.sort((a, b) => b.pokeId - a.pokeId);
            dispatch(filter(true, results))
        }
    }

    const sortByAttack = async (sortParameter) => {
        if (sortParameter === 'A') {
            await results.sort((a, b) => a.attack - b.attack);
            dispatch(filter(true, results))
        }
        if (sortParameter === 'D') {
            await results.sort((a, b) => b.attack - a.attack);
            dispatch(filter(true, results))
        }
    }

    return {
        sortById,
        sortByAttack
    }
}