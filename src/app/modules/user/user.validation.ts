import { isStrongPassword } from 'validator';
import { z } from 'zod';
import { UserRole } from './user.interface';

const createUserSchema = z.object({
    body: z.object({
        name: z
            .string({ required_error: 'Name is required!' })
            .min(5, { message: 'Must be 5 or more characters long!' })
            .trim(),
        email: z
            .string({ required_error: 'Email is required!' })
            .email({ message: 'Invalid email address!' }),
        password: z.string({ required_error: 'Password is required!' }).refine(
            (password) =>
                isStrongPassword(password, {
                    minNumbers: 0,
                    minUppercase: 0,
                }),
            {
                message: 'Password must be strong!',
            }
        ),
        phone: z.string({ required_error: 'Phone Number is required!' }),
        address: z.string({ required_error: 'Address is required!' }),
        role: z.nativeEnum(UserRole),
    }),
});

const loginCredentialsSchema = z.object({
    body: z.object({
        email: z
            .string({ required_error: 'Email is required!' })
            .email({ message: 'Invalid email address!' }),
        password: z.string({ required_error: 'Password is required!' }),
    }),
});

export const UserValidations = {
    createUserSchema,
    loginCredentialsSchema,
};
