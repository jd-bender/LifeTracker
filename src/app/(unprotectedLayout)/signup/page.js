"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Typography, TextField, Button } from '@mui/material';
import Link from 'next/link';
import signUp from "../../../firebase/auth/signUp";
import RouteConcealer from "../../../ui/RouteConcealer";
import Toast from "../../../ui/Toast";
import { whiteBox } from "../../../ui/styles";

const SignUpPage = () => {
    const [firstName, setFirstName] = useState("");
    const [firstNameError, setFirstNameError] = useState(false);
    const [lastName, setLastName] = useState("");
    const [lastNameError, setLastNameError] = useState(false);
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState(false);
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState(false);

    const [toastMessage, setToastMessage] = useState("");
    const [toastSeverity, setToastSeverity] = useState("");
    const [toastOpen, setToastOpen] = useState(false);

    const router = useRouter();

    const validateUserData = () => {
        setFirstNameError(!firstName.length);

        if (!firstName.length) {
            popErrorMessage("Must enter a first name.");
            return false;
        }

        setLastNameError(!lastName.length);

        if (!lastName.length) {
            popErrorMessage("Must enter a last name.");
            return false;
        }

        setEmailError(!email.length);

        if (!email.length) {
            popErrorMessage("Must enter an email address.");
            return false;
        }

        setPasswordError(!password.length);

        if (!password.length) {
            popErrorMessage("Must enter a password.");
            return false;
        }

        setConfirmPasswordError(!confirmPassword.length);

        if (!confirmPassword.length) {
            popErrorMessage("Must enter password a second time for confirmation.");
            return false;
        }

        setPasswordError(password !== confirmPassword);
        setConfirmPasswordError(password !== confirmPassword);

        if (password !== confirmPassword) {
            popErrorMessage("Passwords do not match.");
            return false;
        }

        return true;
    };

    const submitAccountCreation = async (event) => {
        event.preventDefault();

        const dataValidated = validateUserData();

        if (dataValidated) {
            const { signUpResult, signUpError } = await signUp({firstName, lastName, email, password});

            if (signUpError) {
                return popErrorMessage("Something went wrong.");
            }

            return router.push("/");
        }
    };

    const popErrorMessage = (text) => {
        setToastSeverity("error");
        setToastMessage(text);
        setToastOpen(true);
    };
    
    return (
        <RouteConcealer isProtected={false} className={whiteBox}>
            <Typography variant="h4" sx={{marginBottom:'.5em'}}>Sign Up</Typography>
            <span className="mb-4">
                <TextField label="First Name" sx={{width: '20rem'}} error={firstNameError} onChange={(e) => setFirstName(e.target.value)} variant="outlined" />
            </span>

            <span className="mb-4">
                <TextField label="Last Name" sx={{width: '20rem'}} error={lastNameError} onChange={(e) => setLastName(e.target.value)} variant="outlined" />
            </span>

            <span className="mb-4">
                <TextField label="Email" sx={{width: '20rem'}} error={emailError} onChange={(e) => setEmail(e.target.value)} variant="outlined" />
            </span>
            
            <span className="mb-4">
                <TextField label="Password" type="password" sx={{width: '20rem'}} error={passwordError} onChange={(e) => setPassword(e.target.value)} variant="outlined" />
            </span>

            <span className="mb-4">
                <TextField label="Confirm Password" type="password" sx={{width: '20rem'}} error={confirmPasswordError} onChange={(e) => setConfirmPassword(e.target.value)} variant="outlined" />
            </span>

            <Button variant="outlined" onClick={submitAccountCreation} sx={{marginBottom:'.5em'}}>Confirm</Button>

            <Link href="/login"><u>Return to Login</u></Link>

            <Toast open={toastOpen} message={toastMessage} severity={toastSeverity} />
        </RouteConcealer>
    );
};

export default SignUpPage;