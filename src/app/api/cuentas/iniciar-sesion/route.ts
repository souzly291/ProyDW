import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function POST(req : Request) {
    try {
        // 1. LECTURA Y DESESTRUCTURACIÓN DEL CUERPO
        const body = await req.json();
        const { email, password } = body; 

        // 2. VALIDACIÓN DE DATOS FALTANTES
        if(!email || !password){
            return NextResponse.json({ok: false , error : 'El email y la contraseña son requeridos.'} , {status : 400});
        }

        // 3. BÚSQUEDA DEL USUARIO EN LA TABLA 'accounts'
        const { data: user, error: dbError } = await supabase
            .from('accounts')
            .select('*')
            .eq('email', email)
            .single();

        if (dbError) {
            if (dbError.code === 'PGRST116') { // Usuario no encontrado
                return NextResponse.json({ ok: false, error: 'Credenciales inválidas.' }, { status: 401 });
            }
            console.error("Error de Supabase al buscar cuenta:", dbError); 
            return NextResponse.json({ ok: false , error: 'Error al buscar el usuario.' } , {status : 500});
        }
        
        // 4. VERIFICACIÓN DE ESTADO (bit_status) ⬅️ ¡CLAVE!
        if (user.bit_status === false) {
             console.log(`Intento de inicio de sesión de cuenta inactiva: ${email}`);
             return NextResponse.json({ 
                 ok: false, 
                 error: 'Tu cuenta ha sido desactivada. Por favor, contacta a soporte.' 
             }, { status: 403 }); // 403 Forbidden
        }
        
        // 5. VERIFICACIÓN MANUAL DE LA CONTRASEÑA
        // ⚠️ ADVERTENCIA: Esta verificación es INSEGURA si la contraseña no está hasheada.
        if (user.password_hash !== password) {
            console.log("Fallo de contraseña para:", email);
            return NextResponse.json({ ok: false, error: 'Credenciales inválidas.' }, { status: 401 }); 
        }

        // 6. INICIO DE SESIÓN EXITOSO
        const { password_hash, ...userInfo } = user;

        return NextResponse.json({
            ok:true, 
            message: "Inicio de sesión exitoso.",
            user: userInfo 
        }, {status : 200});
        
    } catch (unexpectedError) {
        console.error("Error inesperado en el Route Handler:", unexpectedError); 
        
        return NextResponse.json(
            { ok: false, error: 'Error interno del servidor.' }, 
            { status: 500 }
        );
    }
}