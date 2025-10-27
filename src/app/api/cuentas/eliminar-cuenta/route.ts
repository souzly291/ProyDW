import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

// 💡 NOTA: Aunque la petición es DELETE, Next.js permite leer el cuerpo.
// En caso de problemas, podrías cambiar a un método PUT/PATCH.
export async function DELETE(req : Request) {
    try {
        // 1. LECTURA Y DESESTRUCTURACIÓN DEL CUERPO
        const body = await req.json();
        const { email } = body; 

        // 2. VALIDACIÓN
        if (!email) {
            return NextResponse.json({ ok: false, error: 'El identificador (email) es obligatorio.' }, { status: 400 });
        }

        // 3. INTERACCIÓN CON SUPABASE (Actualización lógica: soft delete)
        const { data: updatedProfile, error } = await supabase
            .from('accounts')
            // 🚨 Payload para la eliminación lógica
            .update({ bit_status: false }) 
            .eq('email', email) // ⬅️ Condición para la eliminación
            .select('email, first_name') // Solo devolvemos lo necesario
            .single(); 

        // 4. MANEJO DE ERRORES DE SUPABASE
        if (error) {
            console.error("Error de Supabase al eliminar cuenta:", error);
            
            // Manejo del error PGRST116 (0 filas afectadas)
            if (error.code === 'PGRST116') {
                return NextResponse.json({ ok: false, error: 'La cuenta no existe.' }, { status: 404 });
            }
            
            return NextResponse.json({ ok: false, error: error.message }, { status: 400 }); 
        }

        // 5. RESPUESTA EXITOSA
        return NextResponse.json({ 
            ok: true, 
            message: "Cuenta desactivada exitosamente.",
            user: updatedProfile // Devuelve el perfil actualizado (con bit_status: false)
        }, { status: 200 });
        
    } catch (unexpectedError) {
        console.error("Error inesperado en el Route Handler (Eliminar Cuenta):", unexpectedError); 
        
        return NextResponse.json(
            { ok: false, error: 'Error interno del servidor.' }, 
            { status: 500 }
        );
    }
}