import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function PUT(req : Request) {
    try {
        // 1. LECTURA DEL CUERPO
        const body = await req.json();

        // 💡 NOTA: En una aplicación real, el ID del usuario no vendría en el body,
        // sino que se obtendría del token de sesión o de las cookies para saber
        // qué usuario está logueado y qué fila actualizar.
        // Aquí asumimos que el 'email' es el identificador único.
        
        const { email, password_hash, ...fieldsToUpdate } = body;

        // 2. VALIDACIÓN BÁSICA (Asegurar que al menos tenemos el identificador)
        if (!email) {
            return NextResponse.json({ ok: false, error: 'Identificador (email) de usuario faltante.' }, { status: 400 });
        }

        // 3. CONSTRUIR EL OBJETO DE ACTUALIZACIÓN
        // Excluir campos que no deberían actualizarse o que vienen vacíos del formulario
        const updatePayload: any = { ...fieldsToUpdate };

        // Incluir la contraseña SOLO si se proporciona una nueva
        if (password_hash) {
            // ⚠️ ADVERTENCIA: En un entorno real, aquí deberías HASHEAR la contraseña
            // antes de guardarla en la base de datos.
            updatePayload.password_hash = password_hash;
        }

        // 4. INTERACCIÓN CON SUPABASE (Actualización)
        // Usamos el email como filtro (eq) para saber qué fila actualizar
        const { data: updatedProfile, error } = await supabase
            .from('accounts')
            .update(updatePayload)
            .eq('email', email) // ⬅️ Condición para actualizar solo la fila del usuario
            .select('*')
            .single(); // Esperamos que solo se actualice una fila

        // 5. MANEJO DE ERRORES DE SUPABASE
        if (error) {
            console.error("Error de Supabase al actualizar:", error);
            // Error 404/400 si el registro no existe o falla la validación
            return NextResponse.json({ ok: false, error: error.message }, { status: 400 }); 
        }

        // 6. RESPUESTA EXITOSA
        // Quitamos la contraseña antes de devolver el objeto
        const { password_hash: _, ...safeProfile } = updatedProfile;

        return NextResponse.json({ ok: true, profile: safeProfile }, { status: 200 });
        
    } catch (unexpectedError) {
        console.error("Error inesperado en el Route Handler (Actualización):", unexpectedError);
        
        return NextResponse.json(
            { ok: false, error: 'Error interno del servidor al procesar la actualización.' }, 
            { status: 500 }
        );
    }
}