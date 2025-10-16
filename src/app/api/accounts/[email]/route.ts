import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function GET(req : Request) {

    try{
        const {email} = await req.json();

        const {data , error} = await supabase
                                        .from('accounts')
                                        .select('*')
                                        .eq('email',email)
                                        .single();
        if(error || !data){
            return NextResponse.json(
                {ok:false, error: 'Usuario no encontrado'},
                {status : 404}
            )
        }

        return NextResponse.json({
            ok:true,
            client: {
                id: data.id,
                first_name: data.first_name,
                last_name_f: data.last_name_f,
                last_name_m: data.last_name_m,
                email: data.email,
                phone: data.phone,
            }
        },{status : 200}
        )
                                              
    }
    catch(error){
        return NextResponse.json(
            {ok:false, error: (error as Error).message},
            {status : 500}
        )
    }
    
}