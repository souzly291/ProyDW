import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function POST(req : Request) {

    const body =  await req.json()

    const {first_name , last_name_f , last_name_m , birth_date , password_hash ,email , phone } = body;

    if(!first_name || !last_name_f || !last_name_m || !birth_date || !password_hash || !email || !phone){
        return NextResponse.json({ok: false , error : 'Faltan datos en la petición'} , {status : 400})
    }

    const {data , error} = await supabase.from('accounts').insert({
        first_name,
        last_name_f,
        last_name_m,
        birth_date,
        email,
        password_hash,
        phone
    }).select('*').single();

    if(error){
        return NextResponse.json({ok: false , error} , {status : 400})
    }

    return NextResponse.json({ok:true , client : data}, {status : 200})

}