"use client";
import { AuthContextProvider } from './AuthContext';
import { TrackerContextProvider } from './TrackerContext';
import { UserProfileContextProvider } from './UserProfileContext';

const Providers = ({ children }) => (
    <AuthContextProvider>
        <TrackerContextProvider>
            <UserProfileContextProvider>
                {children}
            </UserProfileContextProvider>
        </TrackerContextProvider>
    </AuthContextProvider>
);

export default Providers;