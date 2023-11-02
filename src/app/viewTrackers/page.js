import Link from "next/link";
import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { getDataFromCollection } from "../../firebase/firestore/getData";
import BackButton from "../../ui/BackButton";

const ViewTrackersPage = async () => {
    const trackers = await getDataFromCollection("trackers");

    const trackerListItems = trackers.data.map((tracker) =>
        <ListItem key={tracker.id}>
            <Link href={`/trackers/${tracker.id}`}>
                <ListItemButton>
                    <ListItemText primary={tracker.name} />
                </ListItemButton>
            </Link>
        </ListItem>
    );
    
    return (
        <span className="flex">
            <List>
                {trackerListItems}
            </List>

            <BackButton />
        </span>
    );
};

export default ViewTrackersPage;