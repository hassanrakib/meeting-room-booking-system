import httpStatus from "http-status";
import catchAsync from "../../utils/catch-async";
import sendResponse from "../../utils/send-response";
import { BookingServices } from "./booking.service";
import IBooking from "./booking.interface";

const createANewBooking = catchAsync(async (req: {user: {email: string}, body: IBooking}, res) => {

    const newBooking = await BookingServices.insertNewBookingToDB(req.user.email, req.body);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Booking created successfully!",
        data: newBooking,
    })
})

const getAllBookings = catchAsync(async (req, res) => {
    const bookings = await BookingServices.retrieveBookingsFromDB();

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "All bookings retrieved successfully!",
        data: bookings,
    })
})


export const BookingControllers = {
    createANewBooking,
    getAllBookings,
}