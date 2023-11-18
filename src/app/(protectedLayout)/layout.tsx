import "../../globals.css";
import { AuthContextProvider } from "@/context/AuthContext";
import { TrackerContextProvider } from "@/context/TrackerContext";
import { UserProfileContextProvider } from "@/context/UserProfileContext";
import HeaderBar from "./HeaderBar";

interface RootLayoutType {
    children: JSX.Element;
}

const RootLayout = ({ children }: RootLayoutType) => (
    <html lang="en">
        <body className="bg-teal-300">
            <AuthContextProvider>
                <TrackerContextProvider>
                    <UserProfileContextProvider>
                        <HeaderBar />

                        <span className="grid h-screen place-items-center">
                            {children}
                        </span>
                    </UserProfileContextProvider>
                </TrackerContextProvider>
            </AuthContextProvider>
        </body>
    </html>
);

export default RootLayout;
