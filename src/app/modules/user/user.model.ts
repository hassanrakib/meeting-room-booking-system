import { model, Schema } from 'mongoose';
import { IUser, UserRole } from './user.interface';
import { isStrongPassword, isEmail } from 'validator';
import bcrypt from 'bcrypt';
import config from '../../config';

const userSchema = new Schema<IUser>({
    name: { type: String, required: [true, 'Name is required!'] },
    email: {
        type: String,
        required: [true, 'Email is required!'],
        validate: {
            validator: function (email: string) {
                return isEmail(email, {
                    allow_underscores: true,
                });
            },
            message: (props: { value: string }) =>
                `${props.value} is not a valid email address!`,
        },
    },
    // 'password' property will be omitted when a user document is retrieved
    password: {
        type: String,
        required: [true, 'Password is required!'],
        validate: {
            validator: function (password: string) {
                return isStrongPassword(password, {
                    minNumbers: 0,
                    minUppercase: 0,
                });
            },
            message: 'Password must be strong!',
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
}, {
    toJSON: {
        transform(doc, ret) {
            delete ret.password
            return ret;
        },
    }
});

// middlewares(aka 'pre' and 'post' hooks) on this schema
userSchema.pre('save', async function () {
    // asyn/await use in 'pre' doesn't need to call 'next'
    this.password = await bcrypt.hash(
        this.password,
        Number(config.bcrypt_salt_rounds)
    );
});

// instance methods
userSchema.methods.checkPassword = async function(password: string) {
    return await bcrypt.compare(password, (this as IUser).password);
}

export const User = model<IUser>('User', userSchema);
