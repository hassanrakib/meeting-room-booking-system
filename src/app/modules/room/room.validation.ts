import { z } from 'zod';

const createRoomSchema = z.object({
    body: z.object({
        name: z.string().trim(),
        roomNo: z
            .number({
                required_error: 'Room no. is required!',
                invalid_type_error: 'Room no. must be a number!',
            })
            .int()
            .nonnegative(),
        floorNo: z
            .number({
                required_error: 'Floor no. is required!',
                invalid_type_error: 'Floor no. must be a number!',
            })
            .int()
            .nonnegative(),
        capacity: z.number().int().nonnegative(),
        pricePerSlot: z.number().int().nonnegative(),
        amenities: z
            .array(z.string())
            .nonempty({ message: 'Amenities are not provided!' }),
        isDeleted: z.boolean().optional().default(false),
    }),
});

const updateRoomScheama = createRoomSchema.deepPartial();

export const RoomValidations = {
    createRoomSchema,
    updateRoomScheama,
};
