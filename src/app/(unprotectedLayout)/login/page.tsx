"use client";
import { useState } from "react";
import { Typography, TextField, CircularProgress } from "@mui/material";
import { useRouter } from "next/navigation";
import Link from "next/link";
import RouteConcealer from "@/ui/RouteConcealer";
import signIn from "@/firebase/auth/signIn";

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
        <RouteConcealer
            isProtected={false}
            className="bg-white flex flex-col w-1/2 h-1/2 min-w-fit rounded-3xl justify-center place-items-center"
        >
            <>
                <Typography variant="h4" className="mb-4">
                    Life Tracker
                </Typography>

                <span className="mb-4">
                    <TextField
                        label="Email"
                        sx={{ width: "20rem" }}
                        disabled={loggingIn}
                        onChange={(e) => setEmail(e.target.value)}
                        variant="outlined"
                    />
                </span>

                <span className="mb-4">
                    <TextField
                        label="Password"
                        type="password"
                        sx={{ width: "20rem" }}
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

                {loggingIn ? (
                    <CircularProgress />
                ) : (
                    <>
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold mt-2 mb-4 py-2 px-4 rounded-full"
                            onClick={submitLogin}
                        >
                            Login
                        </button>
                        <Link href="/signup">
                            <u>Sign Up</u>
                        </Link>
                    </>
                )}
            </>
        </RouteConcealer>
    );
};

export default LoginPage;
