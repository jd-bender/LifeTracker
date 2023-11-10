"use client";
import { useState } from "react";
import { Typography, TextField, Button, CircularProgress } from '@mui/material';
import { useRouter } from "next/navigation";
import Link from 'next/link';
import { whiteBox } from "../../../ui/styles";
import RouteConcealer from "../../../ui/RouteConcealer";
import signIn from "../../../firebase/auth/signIn";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loggingIn, setLoggingIn] = useState(false);

    const router = useRouter();

    const submitLogin = async () => {
        setLoggingIn(true);

        const { result, error } = await signIn(email, password);

        setLoggingIn(false);

        if (error) {
            return console.log(error);
        }
        
        router.push("/");
    };

    return (
        <RouteConcealer isProtected={false} className={whiteBox}>
            <Typography variant="h4" className="mb-4">Life Tracker</Typography>
            
            <span className="mb-4">
                <TextField 
                    label="Email" 
                    sx={{width: '20rem'}} 
                    disabled={loggingIn} 
                    onChange={(e) => setEmail(e.target.value)} 
                    variant="outlined" 
                />
            </span>
            
            <span className="mb-4">
                <TextField 
                    label="Password" 
                    type="password" 
                    sx={{width: '20rem'}} 
                    disabled={loggingIn} 
                    onChange={(e) => setPassword(e.target.value)} 
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                           submitLogin();
                        }
                    }}
                    variant="outlined"
                />
            </span>

            {
                loggingIn ?
                    <CircularProgress />
                    :
                    <>
                        <Button variant="outlined" className="mb-4" onClick={submitLogin}>Login</Button>
                        <Link href="/signup"><u>Sign Up</u></Link>
                    </>
            }
        </RouteConcealer>
    );
};

export default LoginPage;