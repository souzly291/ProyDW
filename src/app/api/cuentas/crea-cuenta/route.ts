import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function POST(req : Request) {
    try {
        // 1. LECTURA Y DESESTRUCTURACIÓN DEL CUERPO (Punto crítico de fallo)
        const body = await req.json();

        const {first_name , last_name_f , last_name_m , birth_date , password_hash ,email , phone } = body;

        // 2. VALIDACIÓN DE DATOS FALTANTES
        if(!first_name || !last_name_f || !last_name_m || !birth_date || !password_hash || !email || !phone){
            return NextResponse.json({ok: false , error : 'Faltan datos en la petición'} , {status : 400});
        }

        // 3. INTERACCIÓN CON SUPABASE
        const {data , error} = await supabase.from('accounts').insert({
            first_name,
            last_name_f,
            last_name_m,
            birth_date,
            email,
            password_hash,
            phone
        }).select('*').single();

        // 4. MANEJO DE ERRORES DE SUPABASE (ya existente)
        if(error){
            // Aquí puedes registrar el error real en tu terminal
            console.error("Error de Supabase:", error); 
            return NextResponse.json({ok: false , error: error.message} , {status : 400}); // Usamos 400 porque es un error de datos/lógica
        }

        // 5. RESPUESTA EXITOSA
        return NextResponse.json({ok:true , client : data}, {status : 201}); // 201 Created es mejor para una inserción
        
    } catch (unexpectedError) {
        // 🚨 CAPTURA CUALQUIER ERROR INESPERADO (como fallo en req.json())
        console.error("Error inesperado en el Route Handler:", unexpectedError); 
        
        // Devuelve el 500, pero ahora sabes la causa por el log en tu terminal
        return NextResponse.json(
            { ok: false, error: 'Error interno del servidor.' }, 
            { status: 500 }
        );
    }
}