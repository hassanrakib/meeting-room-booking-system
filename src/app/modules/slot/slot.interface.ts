import { Types } from 'mongoose';

export default interface ISlot {
    room: Types.ObjectId;
    date: string;
    startTime: string;
    endTime: string;
    isBooked?: boolean;
}
