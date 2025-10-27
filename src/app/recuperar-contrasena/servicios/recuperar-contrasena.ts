// servicios/recuperar-contrasena.ts
import axios from "axios";

// Ruta al Route Handler
const URL = '/api/cuentas/recuperar-contrasena/';

interface SimpleResetData {
  email: string;
  birth_date: string;
  newPassword: string;
}

/**
 * Realiza la petición POST para verificar identidad (Email + BirthDate) y restablecer la contraseña.
 * @param data - Objeto con email, birth_date y newPassword.
 * @returns La respuesta de Axios.
 */
export const postSimpleResetPassword = async (data: SimpleResetData) => {
    return await axios.post(URL, data);
};