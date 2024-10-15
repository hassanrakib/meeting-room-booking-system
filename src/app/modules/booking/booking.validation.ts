import { z } from 'zod';

const createBookingSchema = z.object({
    body: z.object({
        room: z.string(),
        user: z.string(),
        date: z.string().date(),
        slots: z.array(z.string()),
    }),
});

export const BookingValidations = {
    createBookingSchema,
};
