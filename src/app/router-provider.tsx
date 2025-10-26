"use client";
// Importa el router que usas (BrowserRouter es el más común)
import { BrowserRouter } from 'react-router-dom';
import React from 'react';

// Este componente envuelve toda la aplicación o secciones
interface RouterProviderProps {
  children: React.ReactNode;
}

export default function RouterProvider({ children }: RouterProviderProps) {
  // Envuelve a los hijos con el router
  return (
    <BrowserRouter>
      {children}
    </BrowserRouter>
  );
}