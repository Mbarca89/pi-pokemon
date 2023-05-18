import { useSelector, useDispatch } from 'react-redux'
import { useState, } from 'react'
import { filter } from '../redux/actions'

export const useFilter = () => {
    
    const dispatch = useDispatch()
    const allPokemons = useSelector(state => state.allPokemons)
    const userId = useSelector(state => state.currentUser)
    const [filterCache,setFilterCache] = useState([])    
    const [filterApplied,setFilterApplied] = useState(false)
    const [typeFilterApplied,setTypeFilterApplied] = useState(false)
    const [backUp,setBackUp] = useState([])

    const allPokemonsOk = [...allPokemons]

    const filterByType = async (filterParameter) => {
        if(!filterApplied){
            if(filterParameter === 'none'){
                setTypeFilterApplied(false)
                dispatch(filter(true, allPokemons))
            }else {
                const results = await allPokemonsOk.filter(pokemon => pokemon.type.type1.name === filterParameter)
                await setFilterCache(results)
                setTypeFilterApplied(true)
                dispatch(filter(true, results))
            }       
    }else {
        if(filterParameter === 'none'){
            setTypeFilterApplied(false)
            dispatch(filter(true, backUp))
        }else {
            setBackUp(filterCache)
            const results = await filterCache.filter(pokemon => pokemon.type.type1.name === filterParameter)
            setTypeFilterApplied(true)
             dispatch(filter(true, results))
        }
    }
    }
    
    const filterByOirigin = (originParameter) => {
        if(!typeFilterApplied){
            if (originParameter === 'todos') {
                setFilterApplied(true)
                setFilterCache(allPokemons)
                 dispatch(filter(true, allPokemons))
            }
            if (originParameter === 'api') {
                const results = allPokemonsOk.filter(pokemon => pokemon.isInDb !== true)
                setFilterApplied(true)
                setFilterCache(results)
                 dispatch(filter(true, results))
            }
    
            if (originParameter === 'db') {
                const results = allPokemonsOk.filter(pokemon => pokemon.isInDb === true)
                setFilterApplied(true)
                setFilterCache(results)
                 dispatch(filter(true, results))
            }
            if (originParameter === 'mios') {
                const results = allPokemonsOk.filter(pokemon => pokemon.userId === userId.id)
                setFilterApplied(true)
                setFilterCache(results)
                 dispatch(filter(true, results))
            }
        }else{
            if (originParameter === 'todos') {
                setFilterApplied(true)
                 dispatch(filter(true, filterCache))
            }
            if (originParameter === 'api') {
                const results = filterCache.filter(pokemon => pokemon.isInDb !== true)
                setFilterApplied(true)
                 dispatch(filter(true, results))
            }
    
            if (originParameter === 'db') {
                const results = filterCache.filter(pokemon => pokemon.isInDb === true)
                setFilterApplied(true)
                 dispatch(filter(true, results))
            }
            if (originParameter === 'mios') {
                const results = filterCache.filter(pokemon => pokemon.userId === userId.id)
                setFilterApplied(true)
                 dispatch(filter(true, results))
            }
        }
    }

    const filterReset = () => {
        setFilterApplied(false)
        setTypeFilterApplied(false)
        dispatch(filter(true,allPokemons))
    }

    return {
        filterByType,
        filterByOirigin,
        filterReset
    }

}