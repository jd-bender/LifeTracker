import '../../globals.css';
import Providers from '../../context/Providers';
import HeaderBar from './HeaderBar';

export default function RootLayout({ children }) {
    return (
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
    )
}