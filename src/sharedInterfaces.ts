export interface ITracker {
    name: string;
    type: string;
    id?: string;
}

export interface IRootLayout {
    children: React.JSX.Element;
}

export interface IRouteParams {
    params: {
        trackerId: string;
    };
}

export interface IUserProfileData {
    firstName: string;
    lastName: string;
    email: string;
    password?: string;
}
