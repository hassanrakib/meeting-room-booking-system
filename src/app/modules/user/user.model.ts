import { model, Schema } from 'mongoose';
import { IUser, IUserMethods, UserModel, UserRole } from './user.interface';
import { isStrongPassword, isEmail } from 'validator';
import bcrypt from 'bcrypt';
import config from '../../config';

const userSchema = new Schema<IUser, UserModel, IUserMethods>(
    {
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
            unique: true
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
            // omit password field in the query result
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
    },
    {
        toJSON: {
            transform(doc, ret) {
                delete ret.password;
                return ret;
            },
        },
    }
);

// middlewares(aka 'pre' and 'post' hooks) on this schema
userSchema.pre('save', async function () {
    // asyn/await use in 'pre' doesn't need to call 'next'
    this.password = await bcrypt.hash(
        this.password,
        Number(config.bcrypt_salt_rounds)
    );
});

// instance methods
userSchema.methods.checkPassword = async function (password: string) {
    return await bcrypt.compare(password, this.password);
};

export const User = model<IUser, UserModel>('User', userSchema);
