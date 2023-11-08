import '../globals.css';
import Providers from '../context/Providers';

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className="bg-teal-300">
                <span className="grid h-screen place-items-center">
                    <Providers>
                        {children}
                    </Providers>
                </span>
            </body>
        </html>
    )
}