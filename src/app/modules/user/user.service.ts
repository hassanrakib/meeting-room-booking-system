import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { ILoginCredentials, IUser } from './user.interface';
import { User } from './user.model';
import { createToken } from './user.utils';
import config from '../../config';

// user creation
const insertNewUserToDB = async (user: IUser) => {
    // insert new user to db
    return await User.create(user);
};

// authenticate user and response with the user object
const authenticateAndFetchUserFromDB = async ({
    email,
    password,
}: ILoginCredentials) => {
    // get the user with the password field because it was omitted in the schema type definition
    const user = await User.findOne({ email }).select('+password');

    // check if user does exist in the db
    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, 'The user is not found!');
    }

    // check password
    const isPasswordMatched = await user.checkPassword(password);

    // if not matched
    if (!isPasswordMatched) {
        throw new AppError(httpStatus.FORBIDDEN, 'Password did not match!');
    }

    //** Access Granted Here **//

    // generate a jwt token
    const accessToken = createToken(
        { email: user.email, role: user.role },
        config.jwt_access_secret!,
        config.jwt_access_expires_in!
    );

    return { user, accessToken };
};

export const UserServices = {
    insertNewUserToDB,
    authenticateAndFetchUserFromDB,
};
