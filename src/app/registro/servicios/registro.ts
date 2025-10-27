import axios from "axios";

const URL = '/api/cuentas/crea-cuenta/'
export const postRegister = async(data : any)=>{

    const response = await axios.post(URL , data)

    return response

}