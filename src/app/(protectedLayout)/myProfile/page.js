"use client";
import { useState, useEffect } from "react";
import { Typography, TextField } from '@mui/material';
import RouteConcealer from "../../../ui/RouteConcealer";
import { useUserProfileContext } from "../../../context/UserProfileContext";

const MyProfilePage = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [inputValueChanged, setInputValueChanged] = useState(false);

    const { userProfileData } = useUserProfileContext();

    useEffect(() => {
        setFirstName(userProfileData.firstName || "");
        setLastName(userProfileData.lastName || "");
        setEmail(userProfileData.email || "");
    }, [userProfileData]);

    const checkForInputValueChange = (e, field) => {
        const newValue = e.target.value;
        let firstNameChanged = firstName !== userProfileData.firstName,
            lastNameChanged = lastName !== userProfileData.lastName,
            emailChanged = email !== userProfileData.email;

        switch (field) {
            case "firstName":
                firstNameChanged = newValue !== userProfileData.firstName;
                setFirstName(newValue);
                break;
            case "lastName":
                lastNameChanged = newValue !== userProfileData.lastName;
                setLastName(newValue);
                break;
            case "email":
                emailChanged = newValue !== userProfileData.email;
                setEmail(newValue);
                break;
        }

        setInputValueChanged(firstNameChanged || lastNameChanged || emailChanged);
    };
    
    return (
        <RouteConcealer isProtected={true} className='bg-white flex flex-col w-1/2 h-1/2 min-w-fit rounded-3xl justify-center place-items-center'>
            <Typography variant="h4" className="mb-4">My Profile</Typography>

            <span className="mb-4">
                <TextField label="First Name" sx={{width: '20rem'}} value={firstName} onChange={(e) => checkForInputValueChange(e, "firstName")} variant="outlined" />
            </span>
            
            <span className="mb-4">
                <TextField label="Last Name" sx={{width: '20rem'}} value={lastName} onChange={(e) => checkForInputValueChange(e, "lastName")} variant="outlined" />
            </span>

            <span className="mb-4">
                <TextField label="Email" sx={{width: '20rem'}} value={email} onChange={(e) => checkForInputValueChange(e, "email")} variant="outlined" />
            </span>

            {
                inputValueChanged &&
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">Save Changes</button>
            }
        </RouteConcealer>
    );
};

export default MyProfilePage;