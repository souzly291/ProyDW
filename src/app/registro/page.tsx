"use client";
import React, { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
// Asegúrate de que la ruta a tu servicio sea correcta:
// import { postRegister } from "./servicios/registro"; // convertido a importación dinámica para evitar SSR de módulos que usen DOM 
import styled from "styled-components";
// ====================================================================
// 🎀 ESTILOS PRINCIPALES
// NOTA: Se usa el prefijo '$' en las props internas (ej. $success)
// para evitar la advertencia de React "Received 'false' for a non-boolean attribute".
// ====================================================================
const Container = styled.div`
  display: flex;
  flex-direction: column;
  background: #ffe4ec; /* Rosa pastel */
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

// CORRECCIÓN: Usa $success (prop transitoria) para que no se pase al DOM
const ResponseMessage = styled.div<{$success: boolean}>` 
  text-align: center;
  margin-top: 25px;
  font-size: 1.1rem;
  /* Estilo basado en la prop $success */
  color: ${({ $success }) => ($success ? "#008000" : "#ff0000")};
  font-weight: 500;
`;

// ====================================================================
// 🧠 COMPONENTE PRINCIPAL
// ====================================================================

const Page: React.FC = () => {
  // --- Estados y Referencias ---
  // Tipado de useRef mejorado
  const first_name = useRef<HTMLInputElement>(null);
  const last_name_f = useRef<HTMLInputElement>(null);
  const last_name_m = useRef<HTMLInputElement>(null);
  const birth_date = useRef<HTMLInputElement>(null);
  const password_hash = useRef<HTMLInputElement>(null);
  const email = useRef<HTMLInputElement>(null);
  const phone = useRef<HTMLInputElement>(null);

  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const router = useRouter();
  
  // Estado para el chequeo de SSR (soluciona el error 'document is not defined')
  const [isClient, setIsClient] = useState(false); 
  
  useEffect(() => {
      // Este código solo se ejecuta en el navegador después del montaje
      setIsClient(true);
  }, []);
  // 💡 FUNCIÓN CORREGIDA (ASÍNCRONA con manejo de errores 500)
  const handlerOnSubmit = async () => {
    // Carga dinámica del servicio solo en cliente para evitar evaluar en SSR
    const { postRegister } = await import("./servicios/registro");
    // Resetea estados
    setResponse(null);
    setErrorMsg(null);
    setLoading(true);

    // Validación de campos (mejorado: comprueba el valor)
    if (
      !first_name.current?.value || !last_name_f.current?.value || !last_name_m.current?.value ||
      !birth_date.current?.value || !password_hash.current?.value || !email.current?.value || !phone.current?.value
    ) {
      setErrorMsg("Todos los campos son obligatorios.");
      setLoading(false);
      return;
    }

    const data = {
      first_name: first_name.current.value,
      last_name_f: last_name_f.current.value,
      last_name_m: last_name_m.current.value,
      birth_date: birth_date.current.value,
      password_hash: password_hash.current.value,
      email: email.current.value,
      phone: phone.current.value,
    };
    
    try {
      const res = await postRegister(data);
      
      // Manejo de la respuesta del Route Handler (que devuelve {ok: true/false})
      if (res.data.ok) {
        setResponse(res.data);
        // Redirige a iniciar sesión tras registro exitoso
        router.push("/iniciar-sesion");
      } else {
        // Muestra el error 400 devuelto por tu Route Handler (ej. error de Supabase)
        const errorDetail = res.data.error?.message || res.data.error || "Error desconocido al registrar.";
        setErrorMsg(`Error: ${errorDetail}`);
      }

    } catch (err: any) {
      // Manejo de AxiosError (ej. Error 500)
      // Intenta obtener el mensaje de error del cuerpo de la respuesta del servidor
      const message = err.response?.data?.error || err.message || "Error de conexión. Revise la consola del servidor.";
      setErrorMsg(`Fallo en la petición: ${message}`);
    } finally {
      setLoading(false);
    }
  };

  // 💡 SOLUCIÓN FINAL AL ERROR "document is not defined" (Usando el estado isClient)
  if (!isClient) {
    // Retorna un placeholder simple durante el Server-Side Rendering
    return <div style={{ padding: 50, textAlign: 'center' }}>Cargando cliente...</div>;
  }

  return (
    <div>
      <Container>
        <Title>Registro de Usuario 🌷</Title>
        <Input ref={first_name} placeholder="Nombre" type="text" />
        <Input ref={last_name_f} placeholder="Apellido paterno" type="text" />
        <Input ref={last_name_m} placeholder="Apellido materno" type="text" />
        <Input ref={birth_date} placeholder="Fecha de nacimiento" type="date" />
        <Input ref={password_hash} placeholder="Contraseña" type="password" />
        <Input ref={email} placeholder="Correo electrónico" type="email" />
        <Input ref={phone} placeholder="Teléfono" type="number" />
        {/* Deshabilita el botón mientras se envía */}
        <Button onClick={handlerOnSubmit} disabled={loading}>
          {loading ? "Enviando..." : "Enviar 💌"}
        </Button>
      </Container>

      {/* --- Mostrar Mensajes de Respuesta --- */}
      {response && response.client && (
        // CORRECCIÓN: Usando $success={true}
        <ResponseMessage $success={true}>
          🎉 Usuario Registrado: <b>{response.client.first_name}</b>
        </ResponseMessage>
      )}

      {errorMsg && (
        // CORRECCIÓN: Usando $success={false}
        <ResponseMessage $success={false}>
          ❌ {errorMsg}
        </ResponseMessage>
      )}
    </div>
  );
};

export default Page;