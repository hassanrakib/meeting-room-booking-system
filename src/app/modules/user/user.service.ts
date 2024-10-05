import { ILoginCredentials, IUser } from './user.interface';
import { User } from './user.model';

// user creation
const insertNewUserToDB = async (user: IUser) => {
    // insert new user to db
    return await User.create(user);
};

// authenticate user and response with the user object
const authenticateAndFetchUserFromDB = async (
    loginCredentials: ILoginCredentials
) => {
    // get the user
    const user = await User.findOne({email: loginCredentials.email});

    // check if user does exist in the db
    if(!user) {
        throw new Error('')
    }

    return user;
};

export const UserServices = {
    insertNewUserToDB,
    authenticateAndFetchUserFromDB,
};
