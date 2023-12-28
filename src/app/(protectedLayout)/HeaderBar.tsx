"use client";
import { useState, MouseEvent, SetStateAction } from "react";
import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Menu,
    MenuItem,
    PopoverVirtualElement,
} from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import Link from "next/link";
import signOutFromApp from "@/firebase/auth/signOut";
import { useRouter } from "next/navigation";

type ElementType = Element | (() => Element) | PopoverVirtualElement | (() => PopoverVirtualElement);

const HeaderBar = () => {
    const [anchorEl, setAnchorEl] = useState<ElementType | null>(null);

    const handleMenu = (event: { currentTarget: SetStateAction<ElementType> }) => {
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
        <AppBar position="sticky" className="flex">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    <Link href="/">Life Tracker</Link>
                </Typography>

                <span>
                    <IconButton
                        size="large"
                        color="inherit"
                        onClick={handleMenu}
                    >
                        <AccountCircle />
                    </IconButton>

                    <Menu
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: "top",
                            horizontal: "right",
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: "top",
                            horizontal: "right",
                        }}
                        open={Boolean(anchorEl)}
                        onClose={closeMenu}
                    >
                        <MenuItem onClick={navigateToMyProfile}>
                            My Profile
                        </MenuItem>
                        <MenuItem onClick={() => signOutFromApp()}>
                            Sign Out
                        </MenuItem>
                    </Menu>
                </span>
            </Toolbar>
        </AppBar>
    );
};

export default HeaderBar;
