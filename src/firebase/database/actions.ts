import {
    getDatabase,
    ref,
    push,
    get,
    set,
    update,
    remove,
    DataSnapshot,
} from "firebase/database";
import firebase_app from "../config";

const db = getDatabase(firebase_app);

async function getSnapshot(dbPath: string) {
    return await get(ref(db, dbPath));
}

async function pushData(dbPath: string, data: object) {
    return await push(ref(db, dbPath), data);
}

async function setData(dbPath: string, data: object) {
    return await set(ref(db, dbPath), data);
}

async function updateData(dbPath: string, data: object) {
    return await update(ref(db, dbPath), data);
}

async function deleteData(dbPath: string) {
    return await remove(ref(db, dbPath));
}

function getSnapshotChildren(snapshot: DataSnapshot) {
    if (snapshot.exists()) {
        const snapshotData = snapshot.val();
        const snapshotChildren = [];

        for (let snapshotChildId in snapshotData) {
            const snapshotChildData = snapshotData[snapshotChildId];

            snapshotChildren.push({
                id: snapshotChildId,
                ...snapshotChildData,
            });
        }

        return snapshotChildren;
    } else {
        return [];
    }
}

type userDataType = {
    firstName: string;
    lastName: string;
    email: string;
};

export async function addUserData(userId: string, userData: userDataType) {
    let error: object;

    try {
        await setData(`users/${userId}/profile`, userData);
    } catch (e) {
        error = e;
    }

    return { error };
}

export async function getUserData(userId: string) {
    let result: userDataType, error: object;

    try {
        const snapshot = await getSnapshot(`users/${userId}/profile`);

        if (snapshot.exists()) {
            result = snapshot.val();
        }
    } catch (e) {
        error = e;
    }

    return { result, error };
}

export async function updateUserData(userId: string, userData: userDataType) {
    let error: object;

    try {
        await updateData(`users/${userId}/profile`, userData);
    } catch (e) {
        error = e;
    }

    return { error };
}

export async function addTracker(
    userId: string,
    trackerName: string,
    trackerType: string,
) {
    let result: object, error: object;

    try {
        result = await pushData(`users/${userId}/trackers`, {
            name: trackerName,
            type: trackerType,
        });
    } catch (e) {
        error = e;
    }

    return { result, error };
}

export async function deleteTracker(userId: string, trackerId: string) {
    let error: object;

    try {
        await deleteData(`users/${userId}/trackers/${trackerId}`);
    } catch (e) {
        error = e;
    }

    return { error };
}

export async function getTrackers(userId: string) {
    let result: Array<{ type: string; name: string; id: string }>,
        error: object;

    try {
        const snapshot = await getSnapshot(`users/${userId}/trackers`);
        result = getSnapshotChildren(snapshot);
    } catch (e) {
        error = e;
    }

    return { result, error };
}

export async function addTrackerEntry(
    userId: string,
    trackerId: string,
    entryContents: object,
) {
    let result: object, error: object;

    try {
        result = await pushData(
            `users/${userId}/trackers/${trackerId}/entries`,
            entryContents,
        );
    } catch (e) {
        error = e;
    }

    return { result, error };
}

export async function getTrackerEntries(userId: string, trackerId: string) {
    let result: Array<{ contents: string; datetime: number }>, error: object;

    try {
        const snapshot = await getSnapshot(
            `users/${userId}/trackers/${trackerId}/entries`,
        );
        result = getSnapshotChildren(snapshot);
    } catch (e) {
        error = e;
    }

    return { result, error };
}
