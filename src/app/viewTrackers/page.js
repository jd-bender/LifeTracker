import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { getDataFromCollection } from "../../firebase/firestore/getData";

export default async function ViewTrackers() {
    const trackers = await getDataFromCollection("trackers");
    console.log("trackers:");
    console.log(trackers);

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