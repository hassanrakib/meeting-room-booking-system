import httpStatus from "http-status";
import catchAsync from "../../utils/catch-async";
import sendResponse from "../../utils/send-response";

const createANewBooking = catchAsync(async (req, res) => {

    const newBooking = {};

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Booking created successfully!",
        data: newBooking,
    })
})


export const BookingControllers = {
    createANewBooking,
}