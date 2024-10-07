import jwt from 'jsonwebtoken';
import { UserRole } from './user.interface';

export const createToken = (
    payload: { email: string; role: UserRole },
    secretKey: string,
    expiresIn: string
) => {
    return jwt.sign(payload, secretKey, { expiresIn });
};
