"use client";
import { AuthContextProvider } from './AuthContext';
import { TrackerContextProvider } from './TrackerContext';

const Providers = ({ children }) => (
    <AuthContextProvider>
        <TrackerContextProvider>
            {children}
        </TrackerContextProvider>
    </AuthContextProvider>
);

export default Providers;