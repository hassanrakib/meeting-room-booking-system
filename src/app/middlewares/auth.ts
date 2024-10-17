import httpStatus from 'http-status';
import { UserRole } from '../modules/user/user.interface';
import catchAsync from '../utils/catch-async';
import jwt from 'jsonwebtoken';
import config from '../config';
import { User } from '../modules/user/user.model';
import { CustomJwtPayload } from '../interface';
import sendResponse from '../utils/send-response';

const auth = (...userRoles: UserRole[]) => {
    return catchAsync(async (req, res, next) => {
        // get the token from the request's header
        const token = req.headers.authorization?.split(' ')[1];

        // if token is not sent with the client request
        if (!token) {
            // best approach
            // throw new AppError(httpStatus.UNAUTHORIZED, 'Unauthorized Access!');

            // you can also do this
            sendResponse(res, {
                success: false,
                statusCode: httpStatus.UNAUTHORIZED,
                message: 'You have no access to this route',
            });

            // return is needed when error is not thrown to get out of the function
            return;
        }

        // decoded data
        const decoded = jwt.verify(
            token,
            config.jwt_access_secret!
        ) as CustomJwtPayload;

        // check if user exist in the database
        const user = await User.findOne({ email: decoded.email });

        if (!user) {
            // best approach
            // throw new AppError(httpStatus.UNAUTHORIZED, 'Unauthorized Access!');

            // you can also do this
            sendResponse(res, {
                success: false,
                statusCode: httpStatus.UNAUTHORIZED,
                message: 'You have no access to this route',
            });

            // return is needed when error is not thrown to get out of the function
            return;
        }

        // check if the right user trying to access the data
        if (!userRoles.includes(user.role)) {
            // best approach
            // throw new AppError(httpStatus.UNAUTHORIZED, 'Unauthorized Access!');

            // you can also do this
            sendResponse(res, {
                success: false,
                statusCode: httpStatus.UNAUTHORIZED,
                message: 'You have no access to this route',
            });

            // return is needed when error is not thrown to get out of the function
            return;
        }

        // attach decoded data to the user property of req
        req.user = decoded;

        // now proceed to the next middleware
        next();
    });
};

export default auth;
