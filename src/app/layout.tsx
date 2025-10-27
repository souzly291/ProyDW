import type { Metadata } from "next";

  export const metadata: Metadata = {
    title: "Swappify",
    description: "Intercambia objetos de forma justa y segura",
  };

  // Importa tus estilos globales si los tienes:
  // import "./globals.css";

  // Importante: No uses BrowserRouter/RouterProvider aquí.
  // No accedas a window/document/localStorage en este archivo.
  // Si necesitas Providers (ThemeProvider, etc.), asegúrate que no toquen el DOM en SSR.
  // En caso de necesitar lógica que dependa de window/document, hazlo en un componente cliente con "use client" y useEffect.

  export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <html lang="es">
        <body>{children}</body>
      </html>
    );
  }