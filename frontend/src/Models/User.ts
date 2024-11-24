export type UserProfileToken = {
    body: string;
    userName : string;
    message: string;
    token: string;
};

export type UserProfile = {
    userName: string;
    message: string;
}

export type resetPasswordProfile = {
    body: string;
    userName : string;
    message: string;
    oldPassword: string;
};