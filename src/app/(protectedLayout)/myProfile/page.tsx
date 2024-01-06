"use client";
import { useState, useEffect, ChangeEvent } from "react";
import { Typography, TextField, AlertColor } from "@mui/material";
import RouteConcealer from "@/ui/RouteConcealer";
import { useUserProfileContext } from "@/context/UserProfileContext";
import { useAuthContext } from "@/context/AuthContext";
import { updateUserData } from "@/firebase/database/actions";
import BackButton from "@/ui/BackButton";
import Toast from "@/ui/Toast";

const MyProfilePage = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [inputValueChanged, setInputValueChanged] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [toastSeverity, setToastSeverity] = useState<AlertColor>("success");
    const [toastOpen, setToastOpen] = useState(false);

    let { userProfileData } = useUserProfileContext();

    const { user } = useAuthContext();

    useEffect(() => {
        setFirstName(userProfileData?.firstName || "");
        setLastName(userProfileData?.lastName || "");
        setEmail(userProfileData?.email || "");
    }, [userProfileData]);

    const checkForInputValueChange = (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        field: string,
    ) => {
        const newValue = event.target.value;
        let firstNameChanged = firstName !== userProfileData?.firstName,
            lastNameChanged = lastName !== userProfileData?.lastName,
            emailChanged = email !== userProfileData?.email;

        switch (field) {
            case "firstName":
                firstNameChanged = newValue !== userProfileData?.firstName;
                setFirstName(newValue);
                break;
            case "lastName":
                lastNameChanged = newValue !== userProfileData?.lastName;
                setLastName(newValue);
                break;
            case "email":
                emailChanged = newValue !== userProfileData?.email;
                setEmail(newValue);
                break;
        }

        setInputValueChanged(
            firstNameChanged || lastNameChanged || emailChanged,
        );
    };

    const saveProfileData = async () => {
        const { error } = await updateUserData(user.uid, {
            firstName,
            lastName,
            email,
        });

        if (!error) {
            popToastMessage("success", "Profile details saved successfully.");

            userProfileData.firstName = firstName;
            userProfileData.lastName = lastName;
            userProfileData.email = email;

            setInputValueChanged(false);
        } else {
            popToastMessage("error", "Something went wrong.");
        }
    };

    const popToastMessage = (type: AlertColor, text: string) => {
        setToastSeverity(type);
        setToastMessage(text);
        setToastOpen(true);
    };

    const handleToastClose = () => {
        setToastMessage("");
        setToastOpen(false);
    };

    return (
        <RouteConcealer
            isProtected={true}
            className="bg-white flex flex-col w-1/2 h-1/2 min-w-fit rounded-3xl justify-center place-items-center"
        >
            <>
                <Typography variant="h4" className="mb-4">
                    My Profile
                </Typography>

                <span className="mb-4">
                    <TextField
                        label="First Name"
                        sx={{ width: "20rem" }}
                        value={firstName}
                        onChange={(e) =>
                            checkForInputValueChange(e, "firstName")
                        }
                        variant="outlined"
                    />
                </span>

                <span className="mb-4">
                    <TextField
                        label="Last Name"
                        sx={{ width: "20rem" }}
                        value={lastName}
                        onChange={(e) =>
                            checkForInputValueChange(e, "lastName")
                        }
                        variant="outlined"
                    />
                </span>

                <span className="mb-4">
                    <TextField
                        label="Email"
                        sx={{ width: "20rem" }}
                        value={email}
                        onChange={(e) => checkForInputValueChange(e, "email")}
                        variant="outlined"
                    />
                </span>

                {inputValueChanged && (
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                        onClick={saveProfileData}
                    >
                        Save Changes
                    </button>
                )}

                <BackButton />

                <Toast
                    open={toastOpen}
                    message={toastMessage}
                    severity={toastSeverity}
                    handleClose={handleToastClose}
                />
            </>
        </RouteConcealer>
    );
};

export default MyProfilePage;
