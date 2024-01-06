import { getDatabase, ref, push, get, update } from "firebase/database";
import firebase_app from "../config";

const db = getDatabase(firebase_app);

async function getSnapshot(dbPath: string) {
    return await get(ref(db, dbPath));
}

async function pushData(dbPath: string, data: object) {
    return await push(ref(db, dbPath), data);
}

async function updateData(dbPath: string, data: object) {
    return await update(ref(db, dbPath), data);
}

type userDataType = {
    firstName: string;
    lastName: string;
    email: string;
};

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

export async function getTrackers(userId: string) {
    let result: Array<{ type: string; name: string; id: string }>,
        error: object;

    try {
        const snapshot = await getSnapshot(`users/${userId}/trackers`);

        if (snapshot.exists()) {
            const trackersSnapshotData = snapshot.val();
            const trackers = [];

            for (let trackerId in trackersSnapshotData) {
                const trackerData = trackersSnapshotData[trackerId];

                trackers.push({
                    id: trackerId,
                    name: trackerData.name,
                    type: trackerData.type,
                });
            }

            result = trackers;
        }
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
    let result: object, error: object;

    try {
        const snapshot = await getSnapshot(
            `users/${userId}/trackers/${trackerId}/entries`,
        );

        if (snapshot.exists()) {
            return snapshot.val();
        }
    } catch (e) {
        error = e;
    }

    return { result, error };
}
