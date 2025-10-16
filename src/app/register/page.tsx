'use client'
import React ,{ useEffect } from "react";
import { postRegister } from "./servicies/registerService";

const page: React.FC = () => {

    const data = {
        first_name : 'Marco' ,
        last_name_f : 'Gonzalez', 
        last_name_m : 'Jimenez' , 
        birth_date : '2025-10-27 11:30:00-05' ,
        password_hash : 'pass1234',
        email : 'mar.go.ji@gmail.com' , 
        phone : '5559752788'
    }

    useEffect(()=>{
        postRegister(data).then(res => console.log(res))
    },[])


    return (
        <div>
            Este es el registro
        </div>
    );
};

export default page;