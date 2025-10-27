// app/inicio/page.tsx
'use client'; // Necesario para usar Styled-Components y componentes interactivos en App Router

import Link from 'next/link';
import styled from 'styled-components';
import React from 'react';

// =============================================================
// A. Paleta de Colores Rosa
// =============================================================

const Colors = {
  menuBackground: '#fce4ec', // Rosa muy claro (para el fondo del menú)
  menuBorder: '#f8bbd0',     // Rosa claro (para bordes)
  menuHover: '#f8bbd0',      // Rosa claro (para hover)
  menuText: '#880e4f',       // Rosa oscuro/magenta (para texto del menú)
  welcomeBackground: '#fff0f3', // Blanco rosado (para el fondo del contenido)
  welcomeHighlight: '#d81b60', // Rosa fuerte (para el texto de bienvenida)
  welcomeText: '#4a148c',    // Morado oscuro (para el texto general)
};

// =============================================================
// B. Styled-Components para el Layout y el Menu (con tonos rosas)
// =============================================================

// Contenedor principal del Layout (Grid para dividir la pantalla)
const HomeLayout = styled.div`
  display: grid;
  /* Definimos 2 columnas: 1/4 (25vw) para el menú y 3/4 (75vw) para el contenido */
  grid-template-columns: 25vw 75vw;
  height: 100vh; 
  overflow: hidden; 
`;

// Área del Menú (columna 1) - Estilo de 'sección'
const MenuArea = styled.aside`
  background-color: ${Colors.menuBackground}; 
  border-right: 2px solid ${Colors.menuBorder};
  padding: 20px 0;
  height: 100%;
  box-shadow: 4px 0 10px rgba(0, 0, 0, 0.1); /* Sombra para resaltar la sección */
`;

// Contenedor del Menú
const MenuContainer = styled.nav`
  padding: 0 15px;
`;

// Encabezado del Menú
const MenuTitle = styled.h3`
  color: ${Colors.menuText};
  border-bottom: 2px solid ${Colors.menuBorder};
  padding-bottom: 10px;
  margin-bottom: 20px;
`;

// Elementos de la lista del Menú
const MenuItem = styled.li`
  list-style: none;
  margin: 15px 0;

  a {
    text-decoration: none;
    color: ${Colors.menuText};
    font-weight: 600;
    padding: 10px 15px;
    display: block;
    border-radius: 6px;
    transition: background-color 0.2s, color 0.2s;

    &:hover {
      background-color: ${Colors.menuHover};
      color: white; /* Texto blanco al hacer hover para contraste */
    }
  }
`;

// Área del Contenido Principal (columna 2)
const ContentArea = styled.main`
  background-color: ${Colors.welcomeBackground};
  padding: 30px;
  overflow-y: auto; 
  color: ${Colors.welcomeText};
`;

// Contenedor para el mensaje de bienvenida y el contenido principal
const WelcomeSection = styled.div`
    /* Usamos flexbox para que el mensaje de bienvenida y el contenido 
       principal puedan tener un layout lateral si fuera necesario, 
       pero aquí lo mantendremos apilado para un mejor flujo. */
    display: flex;
    flex-direction: column; 
`;


// Frase de Bienvenida Destacada (Estilo rosa fuerte)
const WelcomeText = styled.h1`
    font-size: 2.5em;
    color: ${Colors.welcomeHighlight}; 
    margin-bottom: 30px;
    padding-bottom: 10px;
    border-bottom: 3px solid ${Colors.welcomeHighlight};
    display: inline-block;
`;

// Subtítulo del estado
const StatusText = styled.p`
    font-size: 1.2em;
    font-style: italic;
    color: ${Colors.welcomeHighlight};
    margin-bottom: 40px;
`;


// =============================================================
// C. Componente del Menú (dentro del mismo archivo)
// =============================================================

const SidebarMenu: React.FC = () => {
  return (
    <MenuContainer>
      <MenuTitle>Menú de Navegación</MenuTitle>
      <ul>
        <MenuItem>
          {/* Opción 1: Actualización de datos */}
          <Link href="/actualizacion-datos">
            Actualización de datos
          </Link>
        </MenuItem>
        <MenuItem>
          {/* Opción 2: Otra opción del menú */}
          <Link href="/eliminar-cuenta">
            Eliminar cuenta
          </Link>
        </MenuItem>
        {/* Agrega más opciones si es necesario */}
        <MenuItem>
          {/* Opción 1: Actualización de datos */}
          <Link href="/">
            cerrar sesión
          </Link>
        </MenuItem>
      </ul>
    </MenuContainer>
  );
};

// =============================================================
// D. Página Principal (Componente principal exportado)
// =============================================================

export default function InicioPage() {
  return (
    <HomeLayout>
      {/* 1. Área del Menú (Cuadrante izquierdo) */}
      <MenuArea>
        <SidebarMenu />
      </MenuArea>
      
      {/* 2. Área del Contenido Principal (El espacio libre) */}
      <ContentArea>
        <WelcomeSection>
            {/* Mensaje de Bienvenida */}
            <WelcomeText>
                Bienvenido a la Plataforma
            </WelcomeText>
            
            {/* Texto de estado */}
            <StatusText>
                ¡estás dentro de la plataforma :)!
            </StatusText>

            <h2>Contenido Principal</h2>
            <p>
                Espacio para poner info de Swappify:), aun no estructuro eso pero ps algún dia lo hare, suena buena idea de proyectitooo:).
            </p>
            {/* Contenido de relleno */}
            {Array.from({ length: 30 }).map((_, i) => (
                <p key={i}>parrafito de relleno no.{i + 1}</p>
            ))}
        </WelcomeSection>
      </ContentArea>
    </HomeLayout>
  );
}