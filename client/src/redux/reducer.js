import { GET_USERS, LOGIN, FILTER, GET_POKEMONS, UPDATE_POKEMONS_TEAM } from './action-types.js'

const initialState = {
    allPokemons: [],
    filteredPokemons: [],
    users: [],
    currentUser: {},
    currentTeam: null,
    pokemonsTeam: [],
    isLoggedIn: false,
    isFiltered: true,
    toggle: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_USERS:
            return {
                ...state,
                users: action.payload
            }
        case LOGIN:
            return {
                ...state,
                isLoggedIn: action.payload.isLoggedIn,
                currentUser: action.payload.user,
                currentTeam: action.payload.teamId
            }
        case UPDATE_POKEMONS_TEAM:
            return {
                ...state,
                pokemonsTeam: action.payload
            }
        case GET_POKEMONS:
            return {
                ...state,
                allPokemons: action.payload,
                filteredPokemons: action.payload,
                isLoaded: true
            }
        case FILTER:
            return {
                ...state,
                isFiltered: action.payload.isFiltered,
                filteredPokemons: action.payload.results,
                togle: !state.togle
            }
        default:
            return {
                ...state
            };
    }
}


export default reducer;