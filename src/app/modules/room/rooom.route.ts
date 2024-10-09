import express from 'express';
import validateRequest from '../../middlewares/validate-request';
import { RoomValidations } from './room.validation';
import { RoomControllers } from './room.controller';
import auth from '../../middlewares/auth';
import { UserRole } from '../user/user.interface';

const router = express.Router();

// create room
router.post(
    '/',
    auth(UserRole.Admin),
    validateRequest(RoomValidations.createRoomSchema),
    RoomControllers.createRoom
);

// get a room by _id
router.get('/:id', RoomControllers.getARoomById);

export const RoomRoutes = router;
