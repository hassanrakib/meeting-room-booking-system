import { model, Schema } from 'mongoose';
import ISlot from './slot.interface';

const slotSchema = new Schema<ISlot>({
    room: { type: Schema.Types.ObjectId, ref: 'Room', required: true },
    date: { type: String, required: true },
    startTime: { type: String, match: /^([01]\d|2[0-3]):([0-5]\d)$/, required: true },
    endTime: { type: String, match: /^([01]\d|2[0-3]):([0-5]\d)$/, required: true },
    isBooked: { type: Boolean, default: false },
});

export const Slot = model<ISlot>('Slot', slotSchema);