import httpStatus from 'http-status';
import catchAsync from '../../utils/catch-async';
import sendResponse from '../../utils/send-response';
import { SlotServices } from './slot.service';
import ISlot from './slot.interface';
import { Room } from '../room/room.model';
import AppError from '../../errors/AppError';

const createNewSlots = catchAsync(async (req: {body: ISlot}, res) => {

    // check room exists in the db
    const room = await Room.findById(req.body.room);

    if(!room) {
        throw new AppError(httpStatus.NOT_FOUND, 'Room is not found!');
    }
    
    const slots = await SlotServices.createNewSlotsInDB(req.body)
    
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Slots created successfully!',
        data: slots,
    });
});

const getAvailableSlots = catchAsync(async (req, res) => {

    console.log(req.params);

    const query: Record<string, string> = {};

    if(req.params.date) query.date = req.params.date;
    if(req.params.roomId) query.room = req.params.roomId;

    console.log(query);

    const slots = await SlotServices.retrieveAvailableSlotsFromDB(query);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Available slots retrieved successfully!',
        data: slots,
    });  
})

export const SlotControllers = {
    createNewSlots,
    getAvailableSlots,
};
