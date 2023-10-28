import firebase_app from "../config";
import { getFirestore, collection as getCollection, addDoc, setDoc, doc } from "firebase/firestore";

const db = getFirestore(firebase_app);

export async function addDataWithoutId(collection, data) {
    let result = null;
    let error = null;

    try {
        result = await addDoc(getCollection(db, collection), data);
    } catch (e) {
        error = e;
    } finally {
        return { result, error };
    }
};

export async function addDataWithId(collection, id, data) {
    let result = null;
    let error = null;

    try {
        result = await setDoc(doc(db, collection, id), data);
    } catch (e) {
        error = e;
    } finally {
        return { result, error };
    }
};