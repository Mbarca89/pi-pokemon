import {REGISTER_USER,GET_USERS,LOGIN,FILTER,GET_POKEMONS,UPDATE_POKEMONS_TEAM} from './action-types.js'
import axios from 'axios';
const SERVER_URL = process.env.REACT_APP_SERVER_URL

export const registerUser = (user) => {
    const endpoint = `${SERVER_URL}/user/create`;
   return async (dispatch) => {
      const {data} = await axios.post(endpoint, user)
         return dispatch({
            type: REGISTER_USER,
            payload: data,
         });
      
   };
}

export const getUsers = () => {
   const endpoint = `${SERVER_URL}/user/getusers`;
  return async (dispatch) => {
     const {data} = await axios.post(endpoint)
         return dispatch({
           type: GET_USERS,
           payload: data,
        });
     
  };
}

export const loginUser = (isLoggedIn,user,teamId) => {
   return {
           type: LOGIN,
           payload: {isLoggedIn,user,teamId}
        };
}

export const updatePokemonsTeam = (pokemonsTeam) => {
   return {
      type: UPDATE_POKEMONS_TEAM,
      payload: pokemonsTeam
   }
}

export const getPokemons = () => {
   const endpoint = `${SERVER_URL}/pokemons`
   return async (dispatch) => {
      const {data} = await axios(endpoint)
          return dispatch({
            type: GET_POKEMONS,
            payload: data,
         });
      };
}

export const filter = (isFiltered, results) => {
   return {
      type: FILTER,
      payload: {isFiltered, results}
   };
}


// export const removeFav = (id) => {
//     const endpoint = 'http://localhost:3001/rickandmorty/fav/' + id;
//    return async (dispatch) => {
//       const {data} = await axios.delete(endpoint)
      
//          return dispatch({
//             type: REMOVE_FAV,
//             payload: data,
//       });
      
//    };
//     // return {type: REMOVE_FAV, payload: id}
// }

// export const filterCards = (gender) => {
//     return {type: FILTER, payload: gender}
// }

// export const orderCards = (ord) => {
//     return {type: ORDER, payload: ord }
// }
