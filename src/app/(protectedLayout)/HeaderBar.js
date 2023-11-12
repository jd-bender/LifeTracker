"use client";
import { useState } from "react";
import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem } from '@mui/material';
import { AccountCircle } from "@mui/icons-material";
import Link from "next/link";
import signOutFromApp from "../../firebase/auth/signOut";
import { useRouter } from "next/navigation";

const HeaderBar = () => {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };
    
    const closeMenu = () => {
        setAnchorEl(null);
    };

    const router = useRouter();

    const navigateToMyProfile = () => {
        router.push("/myProfile");
        closeMenu();
    };

    return (
        <AppBar>
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    <Link href="/">Life Tracker</Link>
                </Typography>

                <span>
                    <IconButton size="large" color="inherit" onClick={handleMenu}>
                        <AccountCircle />
                    </IconButton>

                    <Menu
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right'
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right'
                        }}
                        open={Boolean(anchorEl)}
                        onClose={closeMenu}
                    >
                        <MenuItem onClick={navigateToMyProfile}>My Profile</MenuItem>
                        <MenuItem onClick={() => signOutFromApp()}>Sign Out</MenuItem>
                    </Menu>
                </span>
            </Toolbar>
        </AppBar>
    );
};

export default HeaderBar;