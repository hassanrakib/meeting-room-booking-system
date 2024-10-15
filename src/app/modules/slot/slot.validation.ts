import { z } from 'zod';

const createSlotSchema = z.object({
    body: z.object({
        room: z.string({ required_error: 'Room id is required!' }),
        date: z.string().date(),
        startTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, {
            message: 'Invalid time format. Expected HH:MM.',
        }),
        endTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, {
            message: 'Invalid time format. Expected HH:MM.',
        }),
        isBooked: z.boolean().optional().default(false),
    }),
});

export const SlotValidations = {
    createSlotSchema,
};
