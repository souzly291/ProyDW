import axios from "axios";

// Cambiamos la URL a nuestra nueva ruta de inicio de sesión
const URL = '/api/cuentas/iniciar-sesion/'

interface LoginData {
  email: string;
  password: string;
}

/**
 * Realiza la petición POST al Route Handler de Next.js para iniciar sesión.
 * @param data - Objeto con email y password.
 * @returns La respuesta completa de Axios.
 */
export const postLogin = async(data : LoginData)=>{
    const response = await axios.post(URL , data)
    return response
}