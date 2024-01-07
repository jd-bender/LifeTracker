import "../../globals.css";
import { AuthContextProvider } from "@/context/AuthContext";
import { IRootLayout } from "sharedInterfaces";

export default function RootLayout({ children }: IRootLayout) {
    return (
        <html lang="en">
            <body className="bg-teal-300">
                <span className="grid h-screen place-items-center">
                    <AuthContextProvider>{children}</AuthContextProvider>
                </span>
            </body>
        </html>
    );
}
