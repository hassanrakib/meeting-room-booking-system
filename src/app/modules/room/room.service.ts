import IRoom from './room.interface';
import { Room } from './room.model';

const insertNewRoomToDB = async (room: IRoom) => {
    return await Room.create(room);
};

export const RoomServices = {
    insertNewRoomToDB,
};
