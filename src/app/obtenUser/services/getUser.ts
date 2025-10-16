import axios from "axios";

const URL = '/api/accounts/'

export const getUser = async (email : any)=>{

    const response = axios.get(`${URL}${email}`)
}