import { IUser } from './user.interface';
import { User } from './user.model';

const insertNewUserToDB = async (user: IUser) => {
    // insert new user to db
    return await User.create(user);
};

export const UserServices = {
    insertNewUserToDB,
};
