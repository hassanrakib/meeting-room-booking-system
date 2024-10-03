import { model, Schema } from "mongoose";
import { IUser, UserRole } from "./user.interface";

const userSchema = new Schema<IUser>({
    name: {type: String, required: [true, 'Name is required!']},
    email: {type: String, required: [true, 'Email is required!']},
    // 'password' property will be omitted when a user document is retrieved
    password: {type: String, required: [true, 'Password is required!'], select: false},
    phone: {type: String, required: [true, 'Phone Number is required!']},
    address: {type: String, required: [true, 'Address is required!']},
    role: {type: String, enum: Object.values(UserRole)}
});

export const User = model<IUser>('User', userSchema);