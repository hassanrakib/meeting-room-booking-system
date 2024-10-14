import express from 'express';
import auth from '../../middlewares/auth';
import { UserRole } from '../user/user.interface';
import { SlotControllers } from './slot.controller';

const router = express.Router();

router.post('/', auth(UserRole.Admin), SlotControllers.createNewSlots);

export const SlotRoutes = router;