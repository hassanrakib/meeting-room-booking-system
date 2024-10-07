import { Model } from "mongoose";

export enum UserRole {
    User = 'user',
    Admin = 'admin',
}

export interface IUser {
    name: string;
    email: string;
    password: string;
    phone: string;
    address: string;
    role: UserRole;
}

// all user instance methods
export interface IUserMethods {
    checkPassword(password: string): Promise<boolean>;
}

// model type that knows about IUserMethods
export type UserModel = Model<IUser, object, IUserMethods>

export interface ILoginCredentials {
    email: string;
    password: string;
}