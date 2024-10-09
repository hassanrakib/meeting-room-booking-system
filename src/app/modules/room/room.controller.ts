import httpStatus from 'http-status';
import catchAsync from '../../utils/catch-async';
import sendResponse from '../../utils/send-response';
import IRoom from './room.interface';
import { RoomServices } from './room.service';

// create new room
const createRoom = catchAsync(async (req: { body: IRoom }, res) => {
    const newRoom = await RoomServices.insertNewRoomToDB(req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Room added successfully',
        data: newRoom,
    });
});

// get a room by _id
const getARoomById = catchAsync(async (req, res) => {
    const room = await RoomServices.retrieveARoomByIdFromDB(req.params.id)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Room retrieved successfully",
        data: room,
    })
})

export const RoomControllers = {
    createRoom,
    getARoomById,
};
