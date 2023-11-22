import { getFirestore, doc, updateDoc } from "firebase/firestore";
import firebase_app from "../config";

const db = getFirestore(firebase_app);

export async function updateUserData(userId: string, profileData: object) {
    let result = null;
    let error = null;

    try {
        result = await updateDoc(doc(db, "users", userId), {
            profile: profileData,
        });
    } catch (e) {
        error = e;
    } finally {
        return { result, error };
    }
}
