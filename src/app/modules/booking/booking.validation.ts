import { z } from 'zod';
import { BookingStatus } from './booking.interface';

const createBookingSchema = z.object({
    body: z.object({
        room: z.string(),
        user: z.string(),
        date: z.string().date(),
        slots: z.array(z.string()),
    }),
});

const updateBookingStatusSchema = z.object({
    body: z.object({
        isConfirmed: z.nativeEnum(BookingStatus),
    }),
});

export const BookingValidations = {
    createBookingSchema,
    updateBookingStatusSchema,
};
