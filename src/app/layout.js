import '../globals.css';
import { AuthContextProvider } from '../context/AuthContext';

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className="bg-teal-300">
                <span className="grid h-screen place-items-center">
                    <AuthContextProvider>
                        {children}
                    </AuthContextProvider>
                </span>
            </body>
        </html>
    )
}