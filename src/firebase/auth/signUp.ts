import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import firebase_app from "../config";
import { addDocumentWithId } from "../firestore/addData";

const auth = getAuth(firebase_app);

export default async function signUp(userData) {
    let result = null,
        error = null;

    try {
        result = await createUserWithEmailAndPassword(
            auth,
            userData.email,
            userData.password,
        );

        await addDocumentWithId(`users`, result.user.uid, {
            profile: {
                firstName: userData.firstName,
                lastName: userData.lastName,
                email: userData.email,
            },
        });
    } catch (e) {
        error = e;
    } finally {
        return { result, error };
    }
}
