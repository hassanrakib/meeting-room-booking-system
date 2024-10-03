export enum UserRole {
    user = "user",
    admin = "admin",
}

export interface IUser {
    name: string;
    email: string;
    password: string;
    phone: string;
    address: string;
    role: UserRole;
}
