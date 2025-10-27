"use client";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useRouter } from 'next/navigation';

// ====================================================================
// 🎀 ESTILOS PRINCIPALES (Reutilizados para consistencia)
// ====================================================================
const Container = styled.div`
    display: flex;
    flex-direction: column;
    background: #ffcccc; /* Color más fuerte para alerta */
    width: 450px;
    margin: 60px auto;
    padding: 40px;
    border-radius: 20px;
    box-shadow: 0 4px 20px rgba(255, 0, 0, 0.2);
    align-items: center;
    text-align: center;
`;

const Title = styled.h1`
    color: #cc0000;
    font-size: 2rem;
    margin-bottom: 20px;
`;

const WarningText = styled.p`
    color: #660000;
    font-size: 1.1rem;
    margin-bottom: 30px;
    font-weight: 500;
`;

const Button = styled.button<{ $alert?: boolean }>`
    width: 95%;
    padding: 12px;
    background-color: ${({ $alert }) => ($alert ? '#cc0000' : '#888')};
    color: white;
    font-weight: bold;
    border: none;
    border-radius: 12px;
    margin-top: 15px;
    font-size: 1rem;
    cursor: pointer;
    transition: 0.3s;

    &:hover {
        background-color: ${({ $alert }) => ($alert ? '#ff3333' : '#a0a0a0')};
        transform: scale(1.02);
    }

    &:disabled {
        background-color: #ccc;
        cursor: not-allowed;
    }
`;

const ResponseMessage = styled.div<{$success: boolean}>` 
    text-align: center;
    margin-top: 25px;
    font-size: 1.1rem;
    color: ${({ $success }) => ($success ? "#008000" : "#ff0000")};
    font-weight: 500;
`;

// ====================================================================
// 🧠 COMPONENTE PRINCIPAL DE ELIMINACIÓN DE CUENTA
// ====================================================================

const EliminarCuentaPage: React.FC = () => {
    const router = useRouter();
    
    const [email, setEmail] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState<any>(null);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [isClient, setIsClient] = useState(false); 

    // Carga inicial: Obtener el email del usuario logueado
    useEffect(() => {
        setIsClient(true);
        const loggedInEmail = localStorage.getItem('user_email');
        if (loggedInEmail) {
            setEmail(loggedInEmail);
        } else {
            setErrorMsg("No se encontró una sesión activa para eliminar.");
        }
    }, []);

    const handlerOnDelete = async () => {
        if (!email) {
            setErrorMsg("No hay email de sesión para procesar.");
            return;
        }

        // Confirmación de seguridad
        if (!window.confirm(`¿Estás SEGURO de desactivar la cuenta de ${email}? Esta acción es irreversible.`)) {
            return; // Detiene la ejecución si el usuario cancela
        }

        const { deleteAccount } = await import("../eliminar-cuenta/servicios/eliminar-cuenta"); 
        
        setResponse(null);
        setErrorMsg(null);
        setLoading(true);

        const data = { email };
        
        try {
            const res = await deleteAccount(data);
            
            if (res.data.ok) {
                setResponse(res.data);

                // 🚨 Eliminación exitosa: Limpiar sesión y redirigir
                localStorage.removeItem('user_email');
                
                // Redirigir al usuario al home o a la página de éxito de baja
                setTimeout(() => {
                    router.push('/'); 
                }, 2000); // Dar 2 segundos para ver el mensaje de éxito

            } else {
                const errorDetail = res.data.error || "Error desconocido al desactivar la cuenta.";
                setErrorMsg(`Error: ${errorDetail}`);
            }

        } catch (err: any) {
            const message = err.response?.data?.error || err.message || "Error de conexión. Revise la consola del servidor.";
            setErrorMsg(`Fallo en la petición: ${message}`);
        } finally {
            setLoading(false);
        }
    };

    if (!isClient) {
        return <div style={{ padding: 50, textAlign: 'center' }}>Cargando...</div>;
    }

    // Muestra error si no hay sesión
    if (errorMsg && !email) {
        return <ResponseMessage $success={false}>❌ {errorMsg}</ResponseMessage>;
    }

    return (
        <div>
            <Container>
                <Title>Eliminar Cuenta 🛑</Title>
                <WarningText>
                    Estás a punto de desactivar tu cuenta de forma lógica. <br/>
                    Esto deshabilitará tu acceso, pero tus datos permanecerán en la base de datos con un estado inactivo.
                </WarningText>

                <p style={{ color: '#000', marginBottom: 20 }}>Cuenta a desactivar: <b>{email}</b></p>

                <Button onClick={handlerOnDelete} disabled={loading} $alert>
                    {loading ? "Procesando Baja..." : "Confirmar y Desactivar Cuenta 🗑️"}
                </Button>

                <Button onClick={() => router.push('/inicio')} disabled={loading}>
                    Cancelar y Volver
                </Button>
            </Container>

            {/* --- Mostrar Mensajes de Respuesta --- */}
            {response && response.user && (
                <ResponseMessage $success={true}>
                    🎉 ¡Éxito! Su cuenta ha sido desactivada. Redirigiendo...
                </ResponseMessage>
            )}

            {errorMsg && (
                <ResponseMessage $success={false}>
                    ❌ {errorMsg}
                </ResponseMessage>
            )}
        </div>
    );
};

export default EliminarCuentaPage;