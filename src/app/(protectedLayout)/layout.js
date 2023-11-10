import '../../globals.css';
import Providers from '../../context/Providers';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import { AccountCircle } from "@mui/icons-material";

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className="bg-teal-300">
                <Providers>
                    <AppBar>
                        <Toolbar>
                            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>Life Tracker</Typography>

                            <span>
                                <IconButton
                                    size="large"
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    color="inherit"
                                >
                                    <AccountCircle />
                                </IconButton>
                            </span>
                        </Toolbar>
                    </AppBar>
                    
                    <span className="grid h-screen place-items-center">
                        {children}
                    </span>
                </Providers>
            </body>
        </html>
    )
}