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
        message: 'Room added successfully!',
        data: newRoom,
    });
});

// get a room by _id
const getARoomById = catchAsync(async (req, res) => {
    const room = await RoomServices.retrieveARoomByIdFromDB(req.params.id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Room retrieved successfully!',
        data: room,
    });
});

// get all rooms
const getAllRooms = catchAsync(async (req, res) => {
    const rooms = await RoomServices.retrieveRoomsFromDB();

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Rooms retrieved successfully!',
        data: rooms,
    });
});

// update a room by _id
const updateARoomById = catchAsync(async (req, res) => {
    const updatedRoom = await RoomServices.updateARoomByIdInDB(
        req.params.id,
        req.body as Partial<IRoom>
    );

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Room updated successfully!',
        data: updatedRoom,
    });
});

// delete a room by _id
const deleteARoomById = catchAsync(async (req, res) => {
    const deletedRoom = await RoomServices.softDeleteARoomByIdInDB(
        req.params.id
    );

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Room deleted successfully!',
        data: deletedRoom,
    });
});

export const RoomControllers = {
    createRoom,
    getARoomById,
    getAllRooms,
    updateARoomById,
    deleteARoomById,
};
