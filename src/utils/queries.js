import { axios } from 'axios';
const url = `GET https://api.potterdb.com/v1/`;

export const getAllCharacters = () =>{
   return axios.get(`${url}/characters`)
}