// app/page.tsx o components/SwappifyLanding.tsx (si lo usas en otro layout)
"use client";

import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import { useRouter } from "next/navigation";

// =========================================================
// 1. TEMAS Y COLORES
// =========================================================
// Nota: En un proyecto real, esto se movería a 'styles/theme.ts'
const THEME = {
  primary: "#790563",
  secondary: "#e5e7eb",
  dark: "#e505a2",
  light: "#f9fafb",
  accent: "#ff52a2",
  text: "#333",
};

// =========================================================
// 2. ESTILOS GLOBALES (Reemplaza el antiguo <Body>)
// =========================================================
// Nota: En un proyecto real, esto se movería a 'styles/GlobalStyle.ts' e iría en el 'layout.tsx'
const GlobalStyle = createGlobalStyle`
  /* Estilos base para toda la página */
  body {
    font-family: sans-serif;
    line-height: 1.6;
    margin: 0;
    padding: 0;
    background-color: ${THEME.light};
    color: ${THEME.text};
    -webkit-font-smoothing: antialiased;
  }

  /* Asegura que el contenedor principal o root no tenga márgenes */
  #root, html, body {
    height: 100%;
  }
`;

// =========================================================
// 3. COMPONENTES ESTILIZADOS
// =========================================================

// Contenedores Base
const Contenedor = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 20px;
`;

const Seccion = styled.section<{ $isLight?: boolean }>`
  padding: 80px 0;
  background-color: ${(props) => (props.$isLight ? THEME.secondary : THEME.light)};
`;

const TituloH2 = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 40px;
  color: ${THEME.dark};
  text-align: center;
`;

// Sección de Presentación (Hero)
const Presentacion = styled.div`
  background: linear-gradient(135deg, ${THEME.primary}, ${THEME.accent});
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

// Botón Reutilizable
const Boton = styled.button<{ $large?: boolean }>`
  display: inline-block;
  background: ${THEME.primary};
  color: white;
  /* Usa props para hacer el botón 'grande' más declarativo */
  padding: ${(props) => (props.$large ? "20px 40px" : "15px 30px")};
  font-size: ${(props) => (props.$large ? "1.2rem" : "1rem")};
  
  border-radius: 50px;
  font-weight: bold;
  text-transform: uppercase;
  text-decoration: none;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease, transform 0.2s ease;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: ${THEME.dark};
    transform: scale(1.05);
  }
`;

// Sección de Características
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
  color: ${THEME.accent};
  margin-bottom: 15px;
`;

// Footer
const FooterEstilizado = styled.footer`
  text-align: center;
  padding: 30px 0;
  border-top: 1px solid ${THEME.secondary};
  color: #777;
  background-color: white; /* Añadido para mejor contraste */
`;

// =========================================================
// 4. COMPONENTES FUNCIONALES (Para reutilización interna)
// =========================================================

// Componente para una tarjeta de característica
interface FeatureCardProps {
    number: number;
    title: string;
    description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ number, title, description }) => (
    <Caja>
        <IconoNumero>{number}</IconoNumero>
        <h3>{title}</h3>
        <p>{description}</p>
    </Caja>
);

const SwappifyFooter: React.FC = () => (
    <FooterEstilizado>
        <Contenedor>
            <p>&copy; 2025 SWAPPIFY. Todos los derechos reservados.</p>
        </Contenedor>
    </FooterEstilizado>
);


// =========================================================
// 5. COMPONENTE PRINCIPAL (Landing Page)
// =========================================================

const SwappifyLanding: React.FC = () => {
  const router = useRouter();

  // Funciones de navegación
  const handleNavigateToIniciarSesion = () => router.push("/iniciar-sesion");
  const handleNavigateToRegistro = () => router.push("/registro");

  const features = [
    { num: 1, title: "Publica", desc: "Sube fotos y descripciones de lo que quieres intercambiar." },
    { num: 2, title: "Valora", desc: "Nuestro sistema te ayuda a asignar un valor justo a tu objeto." },
    { num: 3, title: "Intercambia", desc: "Encuentra coincidencias y acepta el trueque." },
  ];

  return (
    <>
      {/* 1. Aplica estilos globales */}
      <GlobalStyle />
      
      {/* 2. Sección de Presentación (Hero) */}
      <Presentacion>
        <Contenedor>
          <PresentacionH1>SWAPPIFY</PresentacionH1>
          <h3 style={{ fontSize: "1.5rem", marginBottom: "20px" }}>
            Intercambia objetos de forma justa y segura.
          </h3>
          <PresentacionP>
            Valora tus pertenencias y cámbialas por lo que realmente necesitas.
          </PresentacionP>
          <Boton onClick={handleNavigateToIniciarSesion}>Ir a Login</Boton>
        </Contenedor>
      </Presentacion>

      <main>
        {/* 3. Sección "¿Cómo funciona?" */}
        <Seccion id="como-funciona">
          <Contenedor>
            <TituloH2>¿Cómo funciona?</TituloH2>
            <GruposDeCajas>
              {features.map(f => (
                  <FeatureCard key={f.num} number={f.num} title={f.title} description={f.desc} />
              ))}
            </GruposDeCajas>
          </Contenedor>
        </Seccion>

        {/* 4. Sección "Beneficios" (Clara) */}
        <Seccion $isLight id="beneficios">
          <Contenedor>
            <TituloH2>Beneficios</TituloH2>
            {/* Aquí iría el contenido de los beneficios */}
            <p style={{textAlign: "center"}}>¡Contenido de los beneficios!</p>
          </Contenedor>
        </Seccion>

        {/* 5. Sección de Registro (CTA) */}
        <Seccion id="registro">
          <Contenedor style={{ textAlign: "center" }}>
            <TituloH2>¿Listo para empezar?</TituloH2>
            <PresentacionP style={{ color: THEME.text }}>Únete a nuestra comunidad y truequea.</PresentacionP>
            <Boton onClick={handleNavigateToRegistro} $large>
              Regístrate ahora
            </Boton>
          </Contenedor>
        </Seccion>
      </main>

      {/* 6. Footer */}
      <SwappifyFooter />
    </>
  );
};

export default SwappifyLanding;
