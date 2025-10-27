import axios from "axios";

const URL = '/api/cuentas/obtener-perfil/';

/**
 * Realiza una petición GET al Route Handler para obtener los datos del perfil del usuario
 * usando el email como identificador.
 * @param email - El email del usuario logueado.
 * @returns La respuesta completa de Axios.
 */
export const getProfileData = async (email: string) => {
    // Adjuntamos el email a la URL como query parameter
    const response = await axios.get(`${URL}?email=${encodeURIComponent(email)}`);
    return response;
};