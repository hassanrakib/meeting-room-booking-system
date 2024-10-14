import httpStatus from 'http-status';
import catchAsync from '../../utils/catch-async';
import sendResponse from '../../utils/send-response';
import { SlotServices } from './slot.service';
import ISlot from './slot.interface';

const createNewSlots = catchAsync(async (req: {body: ISlot}, res) => {
    
    const slots = await SlotServices.createNewSlotsInDB(req.body)
    
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Slots created successfully!',
        data: slots,
    });
});

export const SlotControllers = {
    createNewSlots,
};
