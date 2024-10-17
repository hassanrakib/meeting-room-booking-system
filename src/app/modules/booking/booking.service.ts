import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import IBooking, { BookingStatus } from './booking.interface';
import { Slot } from '../slot/slot.model';
import { Room } from '../room/room.model';
import mongoose from 'mongoose';
import { Booking } from './booking.model';

const insertNewBookingToDB = async (userEmail: string, booking: IBooking) => {
    // validation

    // check if the same user who is logged in creating a booking
    const user = await User.findOne({ email: userEmail }).select('_id').lean();

    if (String(user?._id) !== String(booking.user)) {
        throw new AppError(
            httpStatus.FORBIDDEN,
            'You are not authorized to create a booking for another user!'
        );
    }

    // check if the slots do exist,
    // are of the correct room
    // are not booked
    // and equal or greater than the date of the booking
    const slotsFound = await Slot.find({
        _id: { $in: booking.slots },
        room: booking.room,
        isBooked: false,
    }).lean();

    if (slotsFound.length !== booking.slots.length) {
        throw new AppError(
            httpStatus.NOT_FOUND,
            'One or more slots are maybe do not exist, or booked, or room information is wrong!'
        );
    }

    slotsFound.forEach((slot) => {
        if (new Date(slot.date).getTime() < new Date(booking.date).getTime()) {
            throw new AppError(
                httpStatus.BAD_REQUEST,
                'Selected slots are on a date that has already passed!'
            );
        }
    });

    // check if room exists & not deleted
    const room = await Room.findOne({
        _id: booking.room,
        isDeleted: false,
    }).lean();

    if (!room)
        throw new AppError(httpStatus.NOT_FOUND, 'Room is not available!');

    //** after all the validations => starts the process to create a new booking **/

    // create session for transaction rollback
    const session = await mongoose.startSession();

    try {
        // start transaction
        session.startTransaction();

        // calculate total expenses for the selected slots
        const totalAmount = room.pricePerSlot * slotsFound.length;

        // create new booking
        const newBooking = await Booking.create([{ ...booking, totalAmount }], {
            session,
        });

        // if booking creation fails
        if (!newBooking.length) {
            throw new AppError(
                httpStatus.BAD_REQUEST,
                'Booking creation failed!'
            );
        }

        // update slots isBooked property to true
        const slotsUpdateResult = await Slot.updateMany(
            { _id: { $in: booking.slots } },
            { isBooked: true },
            { session }
        );

        // if slots isBooked property update fails
        if (slotsUpdateResult.modifiedCount !== slotsFound.length) {
            throw new AppError(
                httpStatus.BAD_REQUEST,
                'Failed to update slot(s) isBooked property!'
            );
        }

        // commit the changes to the db
        await session.commitTransaction();
        // end the session
        await session.endSession();

        // populate reference fields and pass the new booking to the controller
        return await newBooking[0].populate(['room', 'slots', 'user']);
    } catch (err) {
        await session.abortTransaction();
        await session.endSession();
        throw err;
    }
};

const retrieveBookingsFromDB = async () => {
    return await Booking.find().populate(['room', 'user', 'slots']);
};

const retrieveMyBookingsFromDB = async (loggedInUserEmail: string) => {
    // get the user's _id
    const user = await User.findOne({ email: loggedInUserEmail });

    return await Booking.find({ user: user!._id })
        .populate(['slots', 'room'])
        .select('-user');
};

const updateBookingStatusInDB = async (
    id: string,
    { isConfirmed }: { isConfirmed: BookingStatus }
) => {
    return await Booking.findByIdAndUpdate(
        id,
        { isConfirmed },
        {
            new: true,
            runValidators: true,
        }
    );
};

const deleteBookingByIdFromDB = async (id: string) => {
    const deletedBooking = await Booking.findByIdAndUpdate(id, {isDeleted: true}, {new: true});

    if(!deletedBooking) throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete the booking!');

    return deletedBooking;
}

export const BookingServices = {
    insertNewBookingToDB,
    retrieveBookingsFromDB,
    retrieveMyBookingsFromDB,
    updateBookingStatusInDB,
    deleteBookingByIdFromDB,
};
