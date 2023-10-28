"use client";
import { useState, useEffect } from "react";
import { useAuthContext } from "../../context/AuthContext";
import signUp from "../../firebase/auth/signUp";
import { useRouter } from "next/navigation";
import { Typography, TextField, Button } from '@mui/material';
import UnprotectedRouteConcealer from "../../ui/UnprotectedRouteConcealer";
import Link from 'next/link';

export default function SignUp() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { user } = useAuthContext();
    const router = useRouter();

    useEffect(() => {
        if (user) {
            router.push("/");
        }
    }, [user]);

    const submitAccountCreation = async (event) => {
        event.preventDefault();

        const { result, error } = await signUp(email, password);

        if (error) {
            return console.log(error);
        }

        return router.push("/");
    };
    
    return (
        <UnprotectedRouteConcealer>
            <span className='bg-white flex flex-col w-1/2 h-1/2 min-w-fit rounded-3xl justify-center place-items-center'>
                <Typography variant="h4" sx={{marginBottom:'.5em'}}>Sign Up</Typography>
                
                <span className="mb-4">
                    <TextField label="Email" sx={{width: '20rem'}} onChange={(e) => setEmail(e.target.value)} variant="outlined" />
                </span>
                
                <span className="mb-4">
                    <TextField label="Password" type="password" sx={{width: '20rem'}} onChange={(e) => setPassword(e.target.value)} variant="outlined" />
                </span>

                <Button variant="outlined" onClick={submitAccountCreation} sx={{marginBottom:'.5em'}}>Confirm</Button>

                <Link href="/login"><u>Return to Login</u></Link>
            </span>
        </UnprotectedRouteConcealer>
    );
};