'use client'
import React, { useEffect } from 'react';
import { patchUpdateUser } from './service/patchUpdateUser';

const page= () => {

    const data = {
        id : 1,
        email : 'diego.chav.mart@outlook.com',
        password_hash : 'pass1234'
    }

    useEffect(()=>{
        patchUpdateUser(data).then(res => console.log(res))
    },[])
    return (
        <div>
            Actualiza un usuario
        </div>
    );
};

export default page;