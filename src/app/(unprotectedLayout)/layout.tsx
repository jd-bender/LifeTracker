import "../../globals.css";
import { AuthContextProvider } from "@/context/AuthContext";

interface RootLayoutProps {
    children: React.JSX.Element
};

export default function RootLayout({ children }: RootLayoutProps) {
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
