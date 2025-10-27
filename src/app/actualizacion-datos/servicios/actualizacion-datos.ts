// servicios/actualiza-datos.ts
import axios from "axios";

// Usamos la ruta para la actualización. PUT es un buen estándar para reemplazar un recurso,
// aunque PATCH también es común para actualizaciones parciales.
const URL = '../api/cuentas/actualizacion-datos/'

// Interfaz que define los datos que pueden ser enviados para la actualización
interface UpdateData {
  first_name: string;
  last_name_f: string;
  last_name_m: string;
  birth_date: string;
  email: string;
  phone: string;
  password_hash?: string; // Es opcional ya que no siempre se cambia
}

/**
 * Realiza la petición PUT al Route Handler de Next.js para actualizar los datos del usuario.
 * @param data - Objeto con los datos a actualizar.
 * @returns La respuesta completa de Axios.
 */
export const putUpdateProfile = async(data : UpdateData)=>{
    // Usamos axios.put para la acción de actualización
    const response = await axios.put(URL , data)
    return response
}