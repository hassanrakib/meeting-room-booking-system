import { JwtPayload } from 'jsonwebtoken';

declare global {
    namespace Express {
        interface Request {
            user: CustomJwtPayload;
        }
    }
}

// customize JwtPayload to contain 'role' & 'email' field
export interface CustomJwtPayload extends JwtPayload {
    role: string;
    email: string;
}
