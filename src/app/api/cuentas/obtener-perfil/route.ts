import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function GET(req : Request) {
    try {
        // 1. Obtener el email del usuario (Asumimos que viene como query parameter)
        // ⚠️ EN PRODUCCIÓN: El ID o Email debe obtenerse de forma segura (e.g., de las cookies de sesión).
        const url = new URL(req.url);
        const email = url.searchParams.get('email'); // Ejemplo: /api/cuentas/obtener-perfil?email=...

        if (!email) {
            return NextResponse.json({ ok: false, error: 'Identificador (email) de usuario faltante.' }, { status: 400 });
        }

        // 2. BÚSQUEDA DEL USUARIO EN LA TABLA 'accounts'
        const { data: user, error } = await supabase
            .from('accounts')
            .select('*')
            .eq('email', email)
            .single();

        if (error) {
            if (error.code === 'PGRST116') { // No se encontró el usuario
                return NextResponse.json({ ok: false, error: 'Perfil no encontrado.' }, { status: 404 });
            }
            console.error("Error de Supabase al obtener perfil:", error); 
            return NextResponse.json({ ok: false , error: 'Error al buscar el perfil.' } , {status : 500});
        }

        // 3. RESPUESTA EXITOSA
        // Quitamos el hash de la contraseña antes de devolver el objeto
        const { password_hash, ...safeProfile } = user;

        return NextResponse.json({ ok: true, user: safeProfile }, { status: 200 });
        
    } catch (unexpectedError) {
        console.error("Error inesperado en el Route Handler (Obtener Perfil):", unexpectedError); 
        
        return NextResponse.json(
            { ok: false, error: 'Error interno del servidor.' }, 
            { status: 500 }
        );
    }
}