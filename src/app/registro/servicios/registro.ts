import axios from "axios";

const URL = '/api/accounts/createAccount/'
export const postRegister = async(data : any)=>{

    const response = await axios.post(URL , data)

    return response

}