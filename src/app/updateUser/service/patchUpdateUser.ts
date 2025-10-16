import axios from "axios";

const URL = '/api/accounts/updateAccount'

export const patchUpdateUser =  async(data : any)=>{

    const response = await axios.patch(URL , data)

    return response
}