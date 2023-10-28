import firebase_app from "../config";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { addDataWithId } from "../firestore/addData";

const auth = getAuth(firebase_app);


export default async function signUp(email, password) {
    let result = null,
        error = null;
        
    try {
        const user = await createUserWithEmailAndPassword(auth, email, password);        
        result = await addDataWithId("users", user.user.uid, {email: user.user.email});
    } catch (e) {
        error = e;
    } finally {
        return { result, error };
    }
};