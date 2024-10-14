import IRoom from './room.interface';
import { Room } from './room.model';

const insertNewRoomToDB = async (room: IRoom) => {
    return await Room.create(room);
};

const retrieveARoomByIdFromDB = async (id: string) => {
    return await Room.findById(id);
};

const retrieveRoomsFromDB = async () => {
    return await Room.find();
};

const updateARoomByIdInDB = async (id: string, roomPartial: Partial<IRoom>) => {
    return await Room.findByIdAndUpdate(id, roomPartial, {
        new: true,
        runValidators: true,
    });
};

const softDeleteARoomByIdInDB = async (id: string) => {
    return await Room.findByIdAndUpdate(
        id,
        { isDeleted: true },
        {
            new: true,
        }
    );
};

export const RoomServices = {
    insertNewRoomToDB,
    retrieveARoomByIdFromDB,
    retrieveRoomsFromDB,
    updateARoomByIdInDB,
    softDeleteARoomByIdInDB,
};
