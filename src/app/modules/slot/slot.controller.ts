import httpStatus from 'http-status';
import catchAsync from '../../utils/catch-async';
import sendResponse from '../../utils/send-response';
import { SlotServices } from './slot.service';
import ISlot from './slot.interface';

const createNewSlots = catchAsync(async (req: { body: ISlot }, res) => {
    const slots = await SlotServices.createNewSlotsInDB(req.body);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Slots created successfully!',
        data: slots,
    });
});

const getAvailableSlots = catchAsync(async (req, res) => {
    const query: Record<string, string> = {};

    if (req.query.date) query.date = req.query.date as string;
    if (req.query.roomId) query.room = req.query.roomId as string;

    const slots = await SlotServices.retrieveAvailableSlotsFromDB(query);

    // if no data found
    if (!slots.length) {
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
        message: 'Available slots retrieved successfully!',
        data: slots,
    });
});

export const SlotControllers = {
    createNewSlots,
    getAvailableSlots,
};
