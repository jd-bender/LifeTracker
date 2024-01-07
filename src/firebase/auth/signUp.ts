import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import firebase_app from "../config";
import { addUserData } from "../database/actions";
import { IUserProfileData } from "sharedInterfaces";

const auth = getAuth(firebase_app);

export default async function signUp(userData: IUserProfileData) {
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
