"use client";

import React from "react";
import styled from "styled-components";
import { useRouter } from "next/navigation";

// =========================================================
// 1. COLORES
// =========================================================
const COLORS = {
  primary: "#790563",
  secondary: "#e5e7eb",
  dark: "#e505a2",
  light: "#f9fafb",
  accent: "#ff52a2",
};

// =========================================================
// 2. ESTILOS CON STYLED COMPONENTS
// =========================================================

const Body = styled.div`
  font-family: sans-serif;
  line-height: 1.6;
  margin: 0;
  padding: 0;
  background-color: ${COLORS.light};
`;

const Contenedor = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 20px;
`;

const Seccion = styled.section`
  padding: 80px 0;
`;

const SeccionClara = styled(Seccion)`
  background-color: ${COLORS.secondary};
`;

const TituloH2 = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 40px;
  color: ${COLORS.dark};
  text-align: center;
`;

const Presentacion = styled.div`
  background: linear-gradient(135deg, ${COLORS.primary}, ${COLORS.accent});
  color: white;
  padding: 100px 0;
  text-align: center;
`;

const PresentacionH1 = styled.h1`
  font-size: 4rem;
  margin-bottom: 10px;
`;

const PresentacionP = styled.p`
  font-size: 1.2rem;
  margin-bottom: 40px;
`;

const Boton = styled.button`
  display: inline-block;
  background: ${COLORS.primary};
  color: white;
  padding: 15px 30px;
  border-radius: 50px;
  font-weight: bold;
  text-transform: uppercase;
  text-decoration: none;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease, transform 0.2s ease;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: ${COLORS.dark};
    transform: scale(1.05);
  }
`;

const GruposDeCajas = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
  flex-wrap: wrap;
`;

const Caja = styled.div`
  flex: 1 1 300px;
  padding: 30px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  text-align: center;
`;

const IconoNumero = styled.div`
  font-size: 3rem;
  color: ${COLORS.accent};
  margin-bottom: 15px;
`;

const RegistroContainer = styled(Contenedor)`
  text-align: center;
`;

const RegistroP = styled.p`
  font-size: 1.2rem;
  margin-bottom: 30px;
  color: #555;
`;

const Footer = styled.footer`
  text-align: center;
  padding: 30px 0;
  border-top: 1px solid ${COLORS.secondary};
  color: #777;
`;

// =========================================================
// 3. COMPONENTE PRINCIPAL
// =========================================================

const SwappifyLanding: React.FC = () => {
  const router= useRouter();

  const handleNavigateToInicio = () => {
    router.push("/inicio");
  };

  const handleNavigateToRegistro = () => {
    router.push("/registro");
  };

  return (
    <Body>
      <Presentacion>
        <Contenedor>
          <PresentacionH1>SWAPPIFY</PresentacionH1>
          <h3 style={{ fontSize: "1.5rem", marginBottom: "20px" }}>
            Intercambia objetos de forma justa y segura.
          </h3>
          <PresentacionP>
            Valora tus pertenencias y cámbialas por lo que realmente necesitas.
          </PresentacionP>

          <Boton onClick={handleNavigateToInicio}>Ir a Login</Boton>
        </Contenedor>
      </Presentacion>

      <main>
        <Seccion id="como-funciona">
          <Contenedor>
            <TituloH2>¿Cómo funciona?</TituloH2>
            <GruposDeCajas>
              <Caja>
                <IconoNumero>1</IconoNumero>
                <h3>Publica</h3>
                <p>Sube fotos y descripciones de lo que quieres intercambiar.</p>
              </Caja>
              <Caja>
                <IconoNumero>2</IconoNumero>
                <h3>Valora</h3>
                <p>Nuestro sistema te ayuda a asignar un valor justo a tu objeto.</p>
              </Caja>
              <Caja>
                <IconoNumero>3</IconoNumero>
                <h3>Intercambia</h3>
                <p>Encuentra coincidencias y acepta el trueque.</p>
              </Caja>
            </GruposDeCajas>
          </Contenedor>
        </Seccion>

        <SeccionClara id="beneficios">
          <Contenedor>
            <TituloH2>Beneficios</TituloH2>
            {/* ...contenido... */}
          </Contenedor>
        </SeccionClara>

        <Seccion id="registro">
          <RegistroContainer>
            <TituloH2>¿Listo para empezar?</TituloH2>
            <RegistroP>Únete a nuestra comunidad y truequeA.</RegistroP>
            <Boton
              onClick={handleNavigateToRegistro}
              style={{ padding: "20px 40px", fontSize: "1.2rem" }}
            >
              Regístrate ahora
            </Boton>
          </RegistroContainer>
        </Seccion>
      </main>

      <Footer>
        <Contenedor>
          <p>&copy; 2025 SWAPPIFY. Todos los derechos reservados.</p>
        </Contenedor>
      </Footer>
    </Body>
  );
};

export default SwappifyLanding;
