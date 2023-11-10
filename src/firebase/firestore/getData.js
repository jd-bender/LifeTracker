import { getFirestore, collection, getDocs } from "firebase/firestore";
import firebase_app from "../config";

const db = getFirestore(firebase_app);

export async function getDataFromCollection(collectionName) {
    const data = [];
    let error = null;

    try {
        const querySnapshot = await getDocs(collection(db, collectionName));

        querySnapshot.forEach((doc) => {
            data.push({
                id: doc.id,
                ...doc.data()
            });
        });
    } catch (e) {
        error = e;
    } finally {
        return { data, error };
    }
};
