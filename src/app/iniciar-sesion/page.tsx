"use client";
import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
// 🚨 IMPORTAR useRouter
import { useRouter } from 'next/navigation';

// ====================================================================
// 🎀 ESTILOS (Mantenidos)
// ====================================================================
const Container = styled.div`
    display: flex;
    flex-direction: column;
    background: #ffe4ec; 
    width: 400px;
    margin: 60px auto;
    padding: 40px;
    border-radius: 20px;
    box-shadow: 0 4px 15px rgba(255, 105, 180, 0.3);
    align-items: center;
    transition: all 0.3s ease;
`;

const Title = styled.h1`
    color: #d63384;
    font-size: 1.8rem;
    margin-bottom: 25px;
    text-shadow: 1px 1px #fff;
`;

const Input = styled.input`
    width: 90%;
    padding: 12px;
    margin: 8px 0;
    border: 2px solid #ffb6c1;
    border-radius: 10px;
    background-color: #fff0f6;
    color: #b3005e;
    font-size: 1rem;
    transition: all 0.3s ease;

    &:focus {
        outline: none;
        border-color: #ff6fa0;
        background-color: #ffeaf2;
        box-shadow: 0 0 6px #ff6fa0;
    }

    &::placeholder {
        color: #cc6784;
    }
`;

// Estilo para el botón secundario (Volver)
const SecondaryButton = styled.button`
    width: 95%;
    padding: 12px;
    background-color: #ccc; /* Color gris */
    color: #333;
    font-weight: bold;
    border: none;
    border-radius: 12px;
    margin-top: 10px; /* Menos margen superior para estar cerca del botón principal */
    font-size: 1rem;
    cursor: pointer;
    transition: 0.3s;

    &:hover {
        background-color: #a0a0a0;
        color: white;
    }

    &:disabled {
        background-color: #ccc;
        cursor: not-allowed;
    }
`;

const Button = styled.button`
    width: 95%;
    padding: 12px;
    background-color: #ff8fab;
    color: white;
    font-weight: bold;
    border: none;
    border-radius: 12px;
    margin-top: 15px;
    font-size: 1rem;
    cursor: pointer;
    transition: 0.3s;

    &:hover {
        background-color: #ff5f91;
        transform: scale(1.05);
    }

    &:active {
        background-color: #e04e7e;
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
// 🧠 COMPONENTE DE INICIO DE SESIÓN CON REDIRECCIÓN
// ====================================================================

const LoginPage: React.FC = () => {
    // Inicializar useRouter
    const router = useRouter(); 
    
    // --- Estados y Referencias ---
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const [response, setResponse] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [isClient, setIsClient] = useState(false); 
    
    useEffect(() => {
        setIsClient(true);
    }, []);

    // 💡 FUNCIÓN PRINCIPAL DE LOGIN
    const handlerOnSubmit = async () => {
        // Carga dinámica del servicio (ajusta la ruta si es necesario)
        // Asegúrate de que esta ruta sea correcta:
        const { postLogin } = await import("../iniciar-sesion/servicios/iniciar-sesion"); 

        // Resetea estados
        setResponse(null);
        setErrorMsg(null);
        setLoading(true);

        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;

        // Validación de campos
        if (!email || !password) {
            setErrorMsg("El correo electrónico y la contraseña son obligatorios.");
            setLoading(false);
            return;
        }

        const data = { email, password };
        
        try {
            const res = await postLogin(data);
            
            // Manejo de la respuesta de nuestro Route Handler
            if (res.data.ok) {
                setResponse(res.data);
                // Guarda el email para usarlo en el componente de actualización
                localStorage.setItem('user_email', email);
                
                // 🚨 REDIRECCIÓN A /inicio
                router.push('/inicio');

            } else {
                // Muestra el error 401 devuelto por nuestro Route Handler
                const errorDetail = res.data.error || "Error desconocido al iniciar sesión.";
                setErrorMsg(`❌ ${errorDetail}`);
            }

        } catch (err: any) {
            // Manejo de AxiosError (ej. Error 500 o fallo de red)
            const message = err.response?.data?.error || err.message || "Error de conexión. Intente de nuevo.";
            setErrorMsg(`🚨 Fallo en la petición: ${message}`);
        } finally {
            setLoading(false);
        }
    };

    // 💡 FUNCIÓN PARA VOLVER AL INICIO
    const handlerGoBack = () => {
        router.push('/');
    };
    const handlerOnrecpass = () => {
        router.push('/recuperar-contrasena');
    };
    if (!isClient) {
        return <div style={{ padding: 50, textAlign: 'center' }}>Cargando...</div>;
    }

    return (
        <div>
            <Container>
                <Title>Iniciar Sesión ✨</Title>
                <Input ref={emailRef} placeholder="Correo electrónico" type="email" />
                <Input ref={passwordRef} placeholder="Contraseña" type="password" />
                
                <Button onClick={handlerOnSubmit} disabled={loading}>
                    {loading ? "Iniciando..." : "Entrar 🔑"}
                </Button>
                
                {/* 🚨 BOTÓN DE VOLVER A / */}
                <SecondaryButton onClick={handlerGoBack} disabled={loading}>
                    Volver 🔙
                </SecondaryButton>

                <Button onClick={handlerOnrecpass} disabled={loading}>
                    recupera tu contraseña
                </Button>
            </Container>

            {/* Se mantiene el mensaje por si la redirección tarda, aunque usualmente se quita */}
            {response && response.user && (
                <ResponseMessage $success={true}>
                    🎉 ¡Bienvenido! Redirigiendo...
                </ResponseMessage>
            )}

            {errorMsg && (
                <ResponseMessage $success={false}>
                    {errorMsg}
                </ResponseMessage>
            )}
        </div>
    );
};

export default LoginPage;