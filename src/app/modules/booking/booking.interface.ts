import { Types } from 'mongoose';

export enum BookingStatus {
    Confirmed = 'confirmed',
    Unconfirmed = 'unconfirmed',
    Canceled = 'canceled',
}

export default interface IBooking {
    room: Types.ObjectId;
    slots: Types.ObjectId[];
    user: Types.ObjectId;
    date: string;
    totalAmount: number;
    isConfirmed?: BookingStatus;
    isDeleted?: boolean;
}
