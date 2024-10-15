import express from 'express';
import auth from '../../middlewares/auth';
import { UserRole } from '../user/user.interface';
import { SlotControllers } from './slot.controller';
import { SlotValidations } from './slot.validation';
import validateRequest from '../../middlewares/validate-request';

const router = express.Router();

router.post(
    '/',
    auth(UserRole.Admin),
    validateRequest(SlotValidations.createSlotSchema),
    SlotControllers.createNewSlots
);

router.get('/availability', SlotControllers.getAvailableSlots);

export const SlotRoutes = router;
