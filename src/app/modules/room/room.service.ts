import IRoom from './room.interface';
import { Room } from './room.model';

const insertNewRoomToDB = async (room: IRoom) => {
    return await Room.create(room);
};

const retrieveARoomByIdFromDB = async (id: string) => {
    return await Room.findById(id);
}

export const RoomServices = {
    insertNewRoomToDB,
    retrieveARoomByIdFromDB,
};
