import ISlot from './slot.interface';
import { Slot } from './slot.model';
import {
    convertTimeStringToMilliseconds,
    prependZeroIfNeeded,
} from './slot.utils';

const createNewSlotsInDB = async ({
    startTime,
    endTime,
    ...commonSlotData
}: ISlot) => {
    // assuming that slot duration is 60 minutes
    const slotDurationInMs = 60 * 60 * 1000;

    const startTimeInMs = convertTimeStringToMilliseconds(startTime);
    const endTimeInMs = convertTimeStringToMilliseconds(endTime);

    const slots: ISlot[] = [];

    for (let t = startTimeInMs; t < endTimeInMs; ) {
        const startDate = new Date(t);
        const endDate = new Date((t += slotDurationInMs));
        slots.push({
            ...commonSlotData,
            startTime: `${prependZeroIfNeeded(startDate.getHours())}:${prependZeroIfNeeded(startDate.getMinutes())}`,
            endTime: `${prependZeroIfNeeded(endDate.getHours())}:${prependZeroIfNeeded(endDate.getMinutes())}`,
        });
    }

    return await Slot.create(slots);
};

const retrieveAvailableSlotsFromDB = async (query: Record<string, string>) => {
    return await Slot.find({ ...query, isBooked: false }).populate('room');
};

export const SlotServices = {
    createNewSlotsInDB,
    retrieveAvailableSlotsFromDB,
};
