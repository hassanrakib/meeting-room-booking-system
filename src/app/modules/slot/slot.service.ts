import ISlot from './slot.interface';
import { Slot } from './slot.model';
import { convertTimeStringToMilliseconds } from './slot.utils';

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
            startTime: `${startDate.getHours().toString().padStart(2, '0')}:${startDate.getMinutes().toString().padStart(2, '0')}`,
            endTime: `${endDate.getHours().toString().padStart(2, '0')}:${endDate.getMinutes().toString().padStart(2, '0')}`,
        });
    }

    return await Slot.create(slots);
};

export const SlotServices = {
    createNewSlotsInDB,
};
