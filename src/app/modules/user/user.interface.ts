export enum Role {
    user,
    admin,
}

export interface IUser {
    name: string;
    email: string;
    password: string;
    phone: string;
    address: string;
    role: Role;
}
