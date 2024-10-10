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

export const RoomServices = {
    insertNewRoomToDB,
    retrieveARoomByIdFromDB,
    retrieveRoomsFromDB,
};
