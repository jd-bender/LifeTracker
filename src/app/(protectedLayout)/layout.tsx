import "../../globals.css";
import Providers from "../../context/Providers";
import HeaderBar from "./HeaderBar";

interface RootLayoutType {
    children: JSX.Element
};

const RootLayout = ({ children }: RootLayoutType) => (
    <html lang="en">
        <body className="bg-teal-300">
            <Providers>
                <HeaderBar />

                <span className="grid h-screen place-items-center">
                    {children}
                </span>
            </Providers>
        </body>
    </html>
);

export default RootLayout;
