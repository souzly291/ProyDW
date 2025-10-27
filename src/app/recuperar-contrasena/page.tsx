"use client";
import React, { useState, FormEvent } from "react";
import styled from "styled-components";
import { useRouter } from "next/navigation";

type FormState = "solicitud" | "exito";

// 🎀 --- Styled Components con tonos rosados ---
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #ffe6f2 0%, #ffb6d9 100%);
  font-family: "Poppins", sans-serif;
`;

const FormWrapper = styled.form`
  background: #fff0f7;
  padding: 40px;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(255, 105, 180, 0.2);
  width: 100%;
  max-width: 400px;
  border: 2px solid #ffb6d9;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 6px 25px rgba(255, 105, 180, 0.3);
  }

  &.as-div {
    display: block;
  }
`;

const Heading = styled.h2`
  margin-bottom: 20px;
  color: #d63384;
  text-align: center;
  font-weight: 700;
`;

const Paragraph = styled.p`
  margin-bottom: 20px;
  color: #7a3d61;
  text-align: center;
`;

const InputGroup = styled.div`
  margin-bottom: 20px;
  label {
    display: block;
    margin-bottom: 6px;
    color: #b03060;
    font-weight: 500;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 2px solid #ffb6d9;
  border-radius: 8px;
  background-color: #fffafc;
  box-sizing: border-box;
  outline: none;
  transition: all 0.2s ease;

  &:focus {
    border-color: #ff69b4;
    box-shadow: 0 0 5px rgba(255, 105, 180, 0.3);
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  background: linear-gradient(135deg, #ff80bf, #ff4da6);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  transition: all 0.3s;
  margin-top: 10px;
  box-shadow: 0 3px 10px rgba(255, 105, 180, 0.25);

  &:hover:not(:disabled) {
    background: linear-gradient(135deg, #ff4da6, #ff1a8c);
    transform: translateY(-2px);
  }

  &:disabled {
    background: #ffcce6;
    cursor: not-allowed;
  }
`;

const SecondaryButton = styled(Button)`
  background: #f8a9c4;
  color: #fff;
  &:hover:not(:disabled) {
    background: #f47bad;
  }
`;

const Message = styled.p<{ $isError?: boolean; $isSuccess?: boolean }>`
  margin-top: 15px;
  padding: 10px;
  border-radius: 8px;
  text-align: center;
  font-weight: 600;
  font-size: 14px;

  ${(props) =>
    props.$isError &&
    `
        background-color: #ffe6ec;
        color: #c2185b;
        border: 1px solid #f48fb1;
    `}

  ${(props) =>
    props.$isSuccess &&
    `
        background-color: #e8ffe8;
        color: #3c763d;
        border: 1px solid #a5d6a7;
    `}
`;

// 🌸 --- Componente Principal ---
const RecuperacionContrasena: React.FC = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formState, setFormState] = useState<FormState>("solicitud");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSimpleReset = async (e: FormEvent) => {
    e.preventDefault();
    setMessage("");

    if (newPassword !== confirmPassword) {
      setMessage("❌ Las contraseñas no coinciden.");
      return;
    }

    setIsLoading(true);

    try {
      const { postSimpleResetPassword } = await import(
        "../recuperar-contrasena/servicios/recuperar-contrasena"
      );

      const res = await postSimpleResetPassword({
        email,
        birth_date: birthDate,
        newPassword,
      });

      setIsLoading(false);

      if (res.data.ok) {
        setFormState("exito");
        setMessage("✅ Contraseña actualizada exitosamente.");
      } else {
        setMessage(`❌ ${res.data.error || "Error al actualizar la contraseña."}`);
      }
    } catch (error: any) {
      const msg =
        error.response?.data?.error ||
        "Error de conexión con el servidor. Intenta de nuevo más tarde.";
      setIsLoading(false);
      setMessage(`❌ ${msg}`);
    }
  };

  const renderSolicitudForm = () => (
    <FormWrapper onSubmit={handleSimpleReset}>
      <Heading>💗 Restablecer Contraseña</Heading>
      <Paragraph>
        Verifica tu identidad con tu fecha de nacimiento y establece una nueva
        contraseña.
      </Paragraph>

      <InputGroup>
        <label>Correo Electrónico:</label>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={isLoading}
        />
      </InputGroup>

      <InputGroup>
        <label>Fecha de Nacimiento:</label>
        <Input
          type="date"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
          required
          disabled={isLoading}
        />
      </InputGroup>

      <InputGroup>
        <label>Nueva Contraseña:</label>
        <Input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
          disabled={isLoading}
        />
      </InputGroup>

      <InputGroup>
        <label>Confirmar Contraseña:</label>
        <Input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          disabled={isLoading}
        />
      </InputGroup>

      {message && <Message $isError>{message}</Message>}

      <Button type="submit" disabled={isLoading}>
        {isLoading ? "💞 Restableciendo..." : "Restablecer Contraseña"}
      </Button>

      <SecondaryButton
        type="button"
        onClick={() => router.push("/")}
        disabled={isLoading}
      >
        Volver al Inicio
      </SecondaryButton>
    </FormWrapper>
  );

  const renderExito = () => (
    <FormWrapper as="div" className="as-div">
      <Heading>🎀 ¡Éxito!</Heading>
      <Message $isSuccess>{message}</Message>
      <Paragraph>
        Tu contraseña ha sido actualizada. Ya puedes iniciar sesión con tu nueva
        credencial.
      </Paragraph>
      <Button onClick={() => router.push("/iniciar-sesion")}>Ir a Iniciar Sesión</Button>
      <SecondaryButton onClick={() => router.push("/")}>
        Volver al Inicio
      </SecondaryButton>
    </FormWrapper>
  );

  return (
    <Container>
      {formState === "solicitud" ? renderSolicitudForm() : renderExito()}
    </Container>
  );
};

export default RecuperacionContrasena;
