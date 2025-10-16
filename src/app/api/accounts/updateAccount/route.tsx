import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function PATCH(req : Request){
    try{

        const body = await req.json();

        const {id, ...updates} = body

        if(!id){
            return NextResponse.json(
                {ok : false , error : 'El id es obligatorio'},
                {status : 400}
            )
        }

        const {data , error} = await supabase
                                    .from('accounts')
                                    .update(updates)
                                    .eq('id' , id)
                                    .select('*')
                                    .single();
    
    if(error){
        return NextResponse.json(
            {ok: false , error : error},
            {status : 400}
        )
    }

    return NextResponse.json({ok:true , client: data}, {status : 200})

    }catch(error){
        return NextResponse.json(
            {ok : false , error : error},
            {status : 500}
        )
    }
    
}