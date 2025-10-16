'use client'
import React ,{ useEffect } from "react";
import { postRegister } from "./servicies/registerService";

const page: React.FC = () => {

    const data = {
        first_name : 'Laura' ,
        last_name_f : 'Gacia', 
        last_name_m : 'Lopez' , 
        birth_date : '2025-10-27 11:30:00-05' ,
        password_hash : 'pass1234',
        email : 'lau.gar.lo@gmail.com' , 
        phone : '5559704788'
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