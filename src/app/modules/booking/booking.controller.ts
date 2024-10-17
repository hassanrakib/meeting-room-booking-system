import httpStatus from 'http-status';
import catchAsync from '../../utils/catch-async';
import sendResponse from '../../utils/send-response';
import { BookingServices } from './booking.service';
import IBooking, { BookingStatus } from './booking.interface';

const createANewBooking = catchAsync(
    async (req: { user: { email: string }; body: IBooking }, res) => {
        const newBooking = await BookingServices.insertNewBookingToDB(
            req.user.email,
            req.body
        );

        sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: 'Booking created successfully!',
            data: newBooking,
        });
    }
);

const getAllBookings = catchAsync(async (req, res) => {
    const bookings = await BookingServices.retrieveBookingsFromDB();

    // if no data found
    if (!bookings.length) {
        sendResponse(res, {
            success: false,
            statusCode: httpStatus.NOT_FOUND,
            message: 'No Data Found!',
            data: [],
        });
    }

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'All bookings retrieved successfully!',
        data: bookings,
    });
});

const getMyBookings = catchAsync(async (req, res) => {
    const myBookings = await BookingServices.retrieveMyBookingsFromDB(
        req.user.email
    );

    // if no data found
    if (!myBookings.length) {
        sendResponse(res, {
            success: false,
            statusCode: httpStatus.NOT_FOUND,
            message: 'No Data Found!',
            data: [],
        });
    }

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'User bookings retrieved successfully!',
        data: myBookings,
    });
});

const updateBookingStatus = catchAsync(async (req, res) => {
    const updatedBooking = await BookingServices.updateBookingStatusInDB(
        req.params.id,
        req.body as { isConfirmed: BookingStatus }
    );

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Booking updated successfully!',
        data: updatedBooking,
    });
});

const deleteBookingById = catchAsync(async (req, res) => {
    const deletedBooking = await BookingServices.deleteBookingByIdFromDB(
        req.params.id
    );

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Booking deleted successfully!',
        data: deletedBooking,
    });
});

export const BookingControllers = {
    createANewBooking,
    getAllBookings,
    getMyBookings,
    updateBookingStatus,
    deleteBookingById,
};
