import { model, Schema } from 'mongoose';
import { IUser, UserRole } from './user.interface';
import { isStrongPassword, isEmail } from 'validator';

const userSchema = new Schema<IUser>({
    name: { type: String, required: [true, 'Name is required!'] },
    email: { type: String, required: [true, 'Email is required!'],
        validate: {
            validator: function(email: string) {
                return isEmail(email, {
                    allow_underscores: true
                })
            },
            message: (props: {value: string}) => `${props.value} is not a valid email address!`
        }
     },
    // 'password' property will be omitted when a user document is retrieved
    password: {
        type: String,
        required: [true, 'Password is required!'],
        validate: {
            validator: function (password: string) {
                return isStrongPassword(password, {
                    minSymbols: 0,
                });
            },
            message: 'Password is not enough strong',
        },
        select: false,
    },
    phone: { type: String, required: [true, 'Phone Number is required!'] },
    address: { type: String, required: [true, 'Address is required!'] },
    role: {
        type: String,
        enum: {
            values: Object.values(UserRole),
            message: '{VALUE} is not supported!',
        },
    },
});

export const User = model<IUser>('User', userSchema);
