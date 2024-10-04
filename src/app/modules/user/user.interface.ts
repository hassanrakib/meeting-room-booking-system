export enum UserRole {
    User = "user",
    Admin = "admin",
}

export interface IUser {
    name: string;
    email: string;
    password: string;
    phone: string;
    address: string;
    role: UserRole;
}
