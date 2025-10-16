'use client'
import React ,{ useEffect , useRef, useState } from "react";
import { postRegister } from "./servicies/registerService";
import styled from "styled-components";

const Container = styled.div`
    display:flex;
    flex-direction : column;
    background: grey;
    width: 50%;
`

const page: React.FC = () => {
    const first_name = useRef<any>(null);
    const last_name_f = useRef<any>(null);
    const last_name_m = useRef<any>(null);
    const birth_date = useRef<any>(null);
    const password_hash = useRef<any>(null);
    const email = useRef<any>(null);
    const phone = useRef<any>(null);

    const [response , setResponse] = useState<any>(null);


    const handlerOnSubmit = ()=>{
        if(first_name && last_name_f && last_name_m && birth_date && password_hash && email && phone){
            const data = {
                first_name : first_name.current ? first_name.current.value : '',
                last_name_f :  last_name_f.current ? last_name_f.current.value : '', 
                last_name_m : last_name_m.current? last_name_m.current.value : '', 
                birth_date : birth_date.current ? birth_date.current.value : '' ,
                password_hash : password_hash.current ? password_hash.current.value : '',
                email : email.current ? email.current.value : '', 
                phone : phone.current? phone.current.value : ''
        }
        console.log(data)
        postRegister(data).then((res) =>{
            return res.data
        }).then(res => {
            console.log(res)
            setResponse(res)}
        )
        }
        
    }


    return (
        <div>
            <Container>
                <input ref={first_name} placeholder="first_name" type="text" />
                <input ref={last_name_f} placeholder="last_name_f" type="text" />
                <input ref={last_name_m} placeholder="last_name_m" type="text" />
                <input ref={birth_date} placeholder="birth_date" type="date" />
                <input ref={password_hash} placeholder="password_hash" type="password" />
                <input ref={email} placeholder="email" type="email" />
                <input ref={phone} placeholder="phone" type="number" />
                <button onClick={handlerOnSubmit}>Enviar</button>
            </Container>
            <div>
                {response && <span>Usuario Registrado {response.client.first_name}</span>}
            </div>
        </div>
    );
};

export default page;