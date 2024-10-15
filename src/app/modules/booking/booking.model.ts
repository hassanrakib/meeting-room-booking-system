import { model, Schema } from "mongoose";
import IBooking, { BookingStatus } from "./booking.interface";

const bookingSchema = new Schema<IBooking>({
    room: {type: Schema.Types.ObjectId, ref: 'Room', required: true},
    slots: {type: [Schema.Types.ObjectId], ref: 'Slot', required: true},
    user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    date: {type: String, required: true},
    totalAmount: {type: Number, required: true},
    isConfirmed: {type: [Object.values(BookingStatus)], default: BookingStatus.Unconfirmed},
    isDeleted: {type: Boolean, default: false},
})

export const Booking = model<IBooking>('Booking', bookingSchema);