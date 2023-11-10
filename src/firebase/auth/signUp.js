import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import firebase_app from "../config";
import { addDocumentWithId } from "../firestore/addData";

const auth = getAuth(firebase_app);

export default async function signUp(userData) {
    let user = null,
        error = null;

    try {   
        user = await createUserWithEmailAndPassword(auth, userData.email, userData.password);        

        await addDocumentWithId(`users`, user.user.uid, {
            profile: {
                firstName: userData.firstName, 
                lastName: userData.lastName, 
                email: userData.email
            }
        });
    } catch (e) {
        error = e;
    } finally {
        return { user, error };
    }
};