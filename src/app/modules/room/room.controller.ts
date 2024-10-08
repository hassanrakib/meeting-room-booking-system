import catchAsync from '../../utils/catch-async';
import sendResponse from '../../utils/send-response';
import IRoom from './room.interface';
import { RoomServices } from './room.service';

// create new room
const createRoom = catchAsync(async (req: { body: IRoom }, res) => {
    const newRoom = await RoomServices.insertNewRoomToDB(req.body);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Room added successfully',
        data: newRoom,
    });
});

export const RoomControllers = {
    createRoom,
};
