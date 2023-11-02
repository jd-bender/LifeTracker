import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { getDataFromCollection } from "../../firebase/firestore/getData";

const ViewTrackersPage = async () => {
    const trackers = await getDataFromCollection("trackers");

    const trackerListItems = trackers.data.map((tracker) =>
        <ListItem key={tracker.id}>
            <ListItemButton>
                <ListItemText primary={tracker.name} />
            </ListItemButton>
        </ListItem>
    );
    
    return (
        <span className="flex">
            <List>
                {trackerListItems}
            </List>
        </span>
    );
};

export default ViewTrackersPage;