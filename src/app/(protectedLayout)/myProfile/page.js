"use client";
import { useState } from "react";
import { Typography, TextField } from '@mui/material';
import RouteConcealer from "../../../ui/RouteConcealer";

const MyProfilePage = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    
    return (
        <RouteConcealer isProtected={true} className='bg-white flex flex-col w-1/2 h-1/2 min-w-fit rounded-3xl justify-center place-items-center'>
            <Typography variant="h4" className="mb-4">My Profile</Typography>

            <span className="mb-4">
                <TextField label="First Name" sx={{width: '20rem'}} disabled={loggingIn} onChange={(e) => setFirstName(e.target.value)} variant="outlined" />
            </span>
            
            <span className="mb-4">
                <TextField label="Last Name" sx={{width: '20rem'}} disabled={loggingIn} onChange={(e) => setLastName(e.target.value)} variant="outlined" />
            </span>

            <span className="mb-4">
                <TextField label="Email" sx={{width: '20rem'}} disabled={loggingIn} onChange={(e) => setEmail(e.target.value)} variant="outlined" />
            </span>
        </RouteConcealer>
    );
};

export default MyProfilePage;