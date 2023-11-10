import { AppBar, Typography } from '@mui/material';

const HeaderBar = () => {
    return (
        <AppBar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>Life Tracker</Typography>
        </AppBar>
    );
};

export default HeaderBar;