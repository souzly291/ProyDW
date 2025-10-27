import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { email, birth_date, newPassword } = await req.json();

        if (!email || !birth_date || !newPassword) {
            return NextResponse.json({ ok: false, error: 'Todos los campos (email, fecha y contraseña) son obligatorios.' }, { status: 400 });
        }
        
        // 1. VERIFICAR IDENTIDAD: Comprueba que el email y la fecha de nacimiento coincidan.
        const { data: user, error: verifyError } = await supabase
            .from('accounts')
            .select('email') 
            .eq('email', email)
            .eq('birth_date', birth_date) // ⬅️ Usa la columna BIRTH_DATE
            .single();

        if (verifyError || !user) {
            // 401: El correo o la fecha de nacimiento no coinciden.
            return NextResponse.json({ ok: false, error: 'El correo electrónico o la fecha de nacimiento no coinciden.' }, { status: 401 }); 
        }

        // 2. ACTUALIZAR LA CONTRASEÑA
        // ⚠️ ADVERTENCIA: En producción, DEBES hashear 'newPassword' con bcrypt o similar antes de esta línea.
        const { error: updateError } = await supabase
            .from('accounts')
            .update({ password_hash: newPassword }) // ⬅️ Usa la columna PASSWORD_HASH
            .eq('email', email); 

        if (updateError) {
            console.error("Error de Supabase al actualizar contraseña:", updateError);
            return NextResponse.json({ ok: false, error: 'Error al actualizar la contraseña.' }, { status: 500 });
        }

        // 3. RESPUESTA EXITOSA
        return NextResponse.json({ 
            ok: true, 
            message: "Contraseña actualizada exitosamente."
        }, { status: 200 });

    } catch (e: any) {
        console.error("Error en restablecimiento de contraseña simple:", e);
        return NextResponse.json({ ok: false, error: 'Error interno del servidor.' }, { status: 500 });
    }
}