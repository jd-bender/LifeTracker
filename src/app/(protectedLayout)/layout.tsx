import "../../globals.css";
import { AuthContextProvider } from "@/context/AuthContext";
import { TrackerContextProvider } from "@/context/TrackerContext";
import { UserProfileContextProvider } from "@/context/UserProfileContext";
import RouteConcealer from "@/ui/RouteConcealer";
import HeaderBar from "./HeaderBar";

interface RootLayoutType {
    children: JSX.Element;
}

const RootLayout = ({ children }: RootLayoutType) => (
    <html lang="en">
        <body className="bg-teal-300">
            <AuthContextProvider>
                <RouteConcealer isProtected={true}>
                    <TrackerContextProvider>
                        <UserProfileContextProvider>
                            <HeaderBar />

                            <span className="grid h-screen place-items-center">
                                {children}
                            </span>
                        </UserProfileContextProvider>
                    </TrackerContextProvider>
                </RouteConcealer>
            </AuthContextProvider>
        </body>
    </html>
);

export default RootLayout;
