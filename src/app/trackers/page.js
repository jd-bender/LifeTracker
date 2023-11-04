import Link from "next/link";
import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { getDataFromCollection } from "../../firebase/firestore/getData";
import BackButton from "../../ui/BackButton";
import { blueButton } from "../../ui/styles";

const TrackersPage = async () => {
    const trackers = await getDataFromCollection("trackers");

    const trackerListItems = trackers.data.map((tracker) =>
        <ListItem key={tracker.id}>
            <Link href={`/trackers/${tracker.id}`}  className={`${blueButton} w-48`}>
                <ListItemButton>
                    <ListItemText className="text-center" primary={tracker.name} />
                </ListItemButton>
            </Link>
        </ListItem>
    );
    
    return (
        <span className="flex">
            <List className="h-96 overflow-y-scroll">
                {trackerListItems}
            </List>

            <BackButton />
        </span>
    );
};

export default TrackersPage;