import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import firebase_app from "../config";
import { addUserData } from "../database/actions";

const auth = getAuth(firebase_app);

interface ISignUp {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export default async function signUp(userData: ISignUp) {
    let error: object;

    try {
        let result = await createUserWithEmailAndPassword(
            auth,
            userData.email,
            userData.password,
        );

        await addUserData(result.user.uid, {
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
        });
    } catch (e) {
        error = e;
    } finally {
        return { error };
    }
}
