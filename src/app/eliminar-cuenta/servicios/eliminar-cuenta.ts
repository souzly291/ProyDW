// servicios/eliminar-cuenta.ts
import axios from "axios";

const URL = '/api/cuentas/eliminar-cuenta/';

interface DeleteData {
  email: string; // Necesitamos el email para identificar la cuenta a "eliminar"
}

/**
 * Realiza la petición DELETE al Route Handler para cambiar el bit_status de la cuenta a false.
 * @param data - Objeto con el email de la cuenta a eliminar.
 * @returns La respuesta completa de Axios.
 */
export const deleteAccount = async(data : DeleteData)=>{
    // Usamos el método DELETE, pasando los datos en el cuerpo (body)
    const response = await axios.delete(URL, { data: data }); 
    return response
}