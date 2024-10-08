import httpStatus from 'http-status';
import AppError from '../errors/AppError';
import { UserRole } from '../modules/user/user.interface';
import catchAsync from '../utils/catch-async';
import jwt from 'jsonwebtoken';
import config from '../config';
import { User } from '../modules/user/user.model';
import { CustomJwtPayload } from '../interface';

const auth = (...userRoles: UserRole[]) => {
    return catchAsync(async (req, res, next) => {
        // get the token from the request's header
        const token = req.headers.authorization;

        // if token is not sent with the client request
        if(!token) {
            throw new AppError(httpStatus.UNAUTHORIZED, 'Unauthorized Access!');
        }

        // decoded data
        const decoded = jwt.verify(token, config.jwt_access_secret!) as CustomJwtPayload;

        // check if user exist in the database
        const user = await User.findOne({email: decoded.email});

        if(!user) {
            throw new AppError(httpStatus.NOT_FOUND, 'User is not found!');
        }

        // check if the right user trying to access the data
        if(!userRoles.includes(user.role)) {
            throw new AppError(httpStatus.UNAUTHORIZED, 'Unauthorized access!');
        }

        // attach decoded data to the user property of req
        req.user = decoded;

        // now proceed to the next middleware
        next();

    });
};

export default auth;
