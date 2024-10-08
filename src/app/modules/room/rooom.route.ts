import express from 'express';
import validateRequest from '../../middlewares/validate-request';
import { RoomValidations } from './room.validation';
import { RoomControllers } from './room.controller';
import auth from '../../middlewares/auth';
import { UserRole } from '../user/user.interface';

const router = express.Router();

router.post("/", auth(UserRole.Admin), validateRequest(RoomValidations.createRoomSchema), RoomControllers.createRoom)

export const RoomRoutes = router;