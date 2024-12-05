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

export type ResetPasswordProfile = {
    body: string;
    userName : string;
    message: string;
    oldPassword: string;
};

export type RegisterUser = {
    name: string;
    email: string;
    contact: string;
    rollNumber: string;
    admissonYear: string;
    message: string;
};