import httpStatus from 'http-status';
import catchAsync from '../../utils/catch-async';
import sendResponse from '../../utils/send-response';
import { UserServices } from './user.service';
import { IUser } from './user.interface';

// signup a new user
const signUp = catchAsync(async (req: { body: IUser }, res) => {
    // call the service function to insert the new user
    const newUser = await UserServices.insertNewUserToDB(req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User registered successfully',
        data: newUser,
    });
});

export const UserControllers = {
    signUp,
};
