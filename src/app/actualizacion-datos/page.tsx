
"use client";

import React, { useRef, useState, useEffect } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { useRouter } from "next/navigation"; // Importar useRouter para la navegación
// Aquí se importará getProfileData y putUpdateProfile de forma dinámica

// ====================================================================
// 1. TEMAS Y COLORES (Paleta Rosa Elegante)
// ====================================================================
const THEME = {
    // Rosa Fuerte (Botones, Títulos)
    primary: "#D81B60", 
    // Rosa Pastel (Fondo de Contenedor)
    secondary: "#F8E4EB", 
    // Rosa Brillante (Acentos, Hover)
    accent: "#FF4081", 
    // Blanco Puro (Fondo de la página)
    light: "#FFFFFF", 
    // Gris Oscuro (Texto)
    text: "#333333",
    // Rojo para errores
    error: "#C62828", 
    // Verde para éxito
    success: "#388E3C",
};

// ====================================================================
// 2. ESTILOS GLOBALES Y TIPADO
// ====================================================================

// Estilos Globales para el body
const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background-color: ${THEME.secondary}; /* Fondo suave */
    color: ${THEME.text};
    margin: 0;
    padding: 0;
  }
`;

// Tipado de Datos del Usuario
interface UserProfile {
    first_name: string;
    last_name_f: string;
    last_name_m: string;
    birth_date: string;
    email: string;
    phone: string;
}

// ====================================================================
// 3. COMPONENTES ESTILIZADOS
// ====================================================================

const ContenedorPrincipal = styled.div`
    max-width: 600px;
    margin: 50px auto;
    padding: 40px;
    background-color: ${THEME.light};
    border-radius: 12px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
`;

const Titulo = styled.h1`
    font-size: 2.2rem;
    color: ${THEME.primary};
    border-bottom: 3px solid ${THEME.accent};
    padding-bottom: 5px;
    flex-grow: 1;
`;

const BotonNavegacion = styled.button`
    background: ${THEME.accent};
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 600;
    transition: background-color 0.3s ease, transform 0.2s;

    &:hover {
        background-color: ${THEME.primary};
        transform: scale(1.05);
    }
`;

const Input = styled.input`
    width: 100%;
    padding: 12px 15px;
    margin-bottom: 15px;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-size: 1rem;
    transition: border-color 0.3s ease, box-shadow 0.3s ease;
    box-sizing: border-box;

    &:focus {
        border-color: ${THEME.primary};
        box-shadow: 0 0 5px rgba(216, 27, 96, 0.5);
        outline: none;
    }

    &:disabled {
        background-color: ${THEME.secondary};
        color: ${THEME.text};
        cursor: not-allowed;
    }
`;

const BotonGuardar = styled.button`
    width: 100%;
    background: ${THEME.primary};
    color: white;
    padding: 15px;
    margin-top: 20px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 1.1rem;
    font-weight: bold;
    transition: background-color 0.3s ease, transform 0.2s;

    &:hover:not(:disabled) {
        background-color: ${THEME.accent};
        transform: translateY(-2px);
    }

    &:disabled {
        background-color: #E0E0E0;
        cursor: wait;
    }
`;

const ResponseMessage = styled.div<{ $success: boolean }>`
    margin-top: 20px;
    padding: 15px;
    border-radius: 8px;
    font-weight: 600;
    text-align: center;
    background-color: ${(props) => (props.$success ? THEME.success + '1A' : THEME.error + '1A')};
    color: ${(props) => (props.$success ? THEME.success : THEME.error)};
    border: 1px solid ${(props) => (props.$success ? THEME.success : THEME.error)};
`;

const LoadingMessage = styled.div`
    text-align: center;
    padding: 50px;
    font-size: 1.2rem;
    color: ${THEME.primary};
`;

// ====================================================================
// 4. COMPONENTE PRINCIPAL DE ACTUALIZACIÓN (Lógica Conservada)
// ====================================================================

const ActualizacionDatosPage: React.FC = () => {
    const router = useRouter(); // Inicializar router para la navegación

    // --- Referencias ---
    const birth_date = useRef<HTMLInputElement>(null);
    const password_hash = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const phone = useRef<HTMLInputElement>(null);

    // --- Estados ---
    const [userData, setUserData] = useState<UserProfile | null>(null);
    const [response, setResponse] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [isClient, setIsClient] = useState(false); 

    // 🚨 LÓGICA DE CARGA INICIAL
    useEffect(() => {
        setIsClient(true);
        
        const loadUser = async () => {
            try {
                const loggedInEmail = localStorage.getItem('user_email');

                if (!loggedInEmail) {
                    setErrorMsg("Error: No se encontró la sesión. Por favor, inicie sesión.");
                    return;
                }

                // Carga dinámica del servicio para obtener datos
                const { getProfileData } = await import("../obtener-perfil/servicios/obtener-perfil"); 
                
                // LLAMADA A LA API
                const res = await getProfileData(loggedInEmail); 

                if (res.data.ok && res.data.user) {
                    setUserData(res.data.user);
                } else {
                    setErrorMsg(res.data.error || "No se pudieron cargar los datos del usuario.");
                }

            } catch (error: any) {
                 const message = error.response?.data?.error || "Error de conexión al obtener perfil.";
                 setErrorMsg(message);
            }
        };

        loadUser();
    }, []);

    // 💡 FUNCIÓN PRINCIPAL DE SUBMIT
    const handlerOnSubmit = async () => {
        const { putUpdateProfile } = await import("../actualizacion-datos/servicios/actualizacion-datos"); 

        if (!userData) {
            setErrorMsg("Error: Los datos del usuario no están cargados.");
            return;
        }

        // 1. Resetea estados
        setResponse(null);
        setErrorMsg(null);
        setLoading(true);

        // 2. Recolección de datos (Lógica conservada)
        const newPassword = password_hash.current?.value || "";

        const dataToUpdate = {
            first_name: userData.first_name,
            last_name_f: userData.last_name_f,
            last_name_m: userData.last_name_m,
            
            birth_date: birth_date.current?.value || userData.birth_date,
            email: emailRef.current?.value || userData.email, 
            phone: phone.current?.value || userData.phone,
            
            ...(newPassword && { password_hash: newPassword }),
        };
        
        // 3. Envío al servicio
        try {
            const res: any = await putUpdateProfile(dataToUpdate);
            
            if (res.data.ok) {
                setResponse(res.data);
                
                const updatedProfile: UserProfile = res.data.profile;
                setUserData(updatedProfile); 
                password_hash.current!.value = ''; 
                
                if(updatedProfile.email !== localStorage.getItem('user_email')){
                    localStorage.setItem('user_email', updatedProfile.email);
                }
            } else {
                const errorDetail = res.data.error || "Error desconocido al actualizar.";
                setErrorMsg(`Error: ${errorDetail}`);
            }
        } catch (err: any) {
            const message = err.response?.data?.error || err.message || "Error de conexión.";
            setErrorMsg(`Fallo en la petición: ${message}`);
        } finally {
            setLoading(false);
        }
    };
    
    // 🚀 FUNCIÓN PARA EL NUEVO BOTÓN
    const handleNavigateToInicio = () => {
        router.push("/inicio");
    };

    if (!isClient) {
        return <LoadingMessage>Iniciando componente...</LoadingMessage>;
    }
    
    if (!userData && !errorMsg) {
        return <LoadingMessage>Cargando datos del perfil... ⏳</LoadingMessage>;
    }
    
    if (errorMsg && !userData) {
        return <LoadingMessage style={{ color: THEME.error }}>{errorMsg} 🛑</LoadingMessage>;
    }

    return (
        <>
            <GlobalStyle />
            <ContenedorPrincipal>
                <Header>
                    <Titulo>Actualización de Datos</Titulo>
                    {/* El nuevo botón que solicitaste */}
                    <BotonNavegacion onClick={handleNavigateToInicio}>
                        Ir a Inicio 🚀
                    </BotonNavegacion>
                </Header>
                
                {/* CAMPOS FIJOS Y BLOQUEADOS (Nombre, Apellidos) */}
                <Input 
                    placeholder="Nombre" 
                    type="text" 
                    defaultValue={userData!.first_name}
                    disabled 
                />
                <Input 
                    placeholder="Apellido paterno" 
                    type="text" 
                    defaultValue={userData!.last_name_f}
                    disabled 
                />
                <Input 
                    placeholder="Apellido materno" 
                    type="text" 
                    defaultValue={userData!.last_name_m}
                    disabled 
                />

                {/* CAMPOS MODIFICABLES */}
                <Input 
                    ref={birth_date} 
                    placeholder="Fecha de nacimiento" 
                    type="date" 
                    defaultValue={userData!.birth_date}
                />
                <Input 
                    ref={emailRef} 
                    placeholder="Correo electrónico" 
                    type="email" 
                    defaultValue={userData!.email}
                    // Deshabilitado, asumiendo que el email es la clave principal y no debe cambiarse fácilmente.
                    disabled 
                />
                <Input 
                    ref={password_hash} 
                    placeholder="Nueva Contraseña (Dejar vacío para no cambiar)" 
                    type="password"
                />
                <Input 
                    ref={phone} 
                    placeholder="Teléfono" 
                    type="tel" // Cambiado a 'tel' para móviles
                    defaultValue={userData!.phone}
                />
                
                <BotonGuardar onClick={handlerOnSubmit} disabled={loading}>
                    {loading ? "Actualizando..." : "Guardar Cambios ✨"}
                </BotonGuardar>

                {/* --- Mostrar Mensajes de Respuesta --- */}
                {response && response.profile && (
                    <ResponseMessage $success={true}>
                        ✅ Datos actualizados de: <b>{response.profile.first_name}</b>
                    </ResponseMessage>
                )}

                {errorMsg && !response && (
                    <ResponseMessage $success={false}>
                        ❌ {errorMsg}
                    </ResponseMessage>
                )}
            </ContenedorPrincipal>
        </>
    );
};

export default ActualizacionDatosPage;