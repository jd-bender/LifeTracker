import "../../globals.css";
import { AuthContextProvider } from "@/context/AuthContext";
import { TrackerContextProvider } from "@/context/TrackerContext";
import { UserProfileContextProvider } from "@/context/UserProfileContext";
import HeaderBar from "./HeaderBar";
import { IRootLayout } from "sharedInterfaces";

const RootLayout = ({ children }: IRootLayout) => (
    <html lang="en">
        <head>
            <title>Life Tracker</title>
        </head>

        <body className="bg-teal-300 flex flex-col h-screen">
            <AuthContextProvider>
                <TrackerContextProvider>
                    <UserProfileContextProvider>
                        <HeaderBar />

                        <span className="flex flex-1 p-10 justify-center items-center">
                            {children}
                        </span>
                    </UserProfileContextProvider>
                </TrackerContextProvider>
            </AuthContextProvider>
        </body>
    </html>
);

export default RootLayout;
