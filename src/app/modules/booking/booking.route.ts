import express from 'express';
import { UserRole } from '../user/user.interface';
import validateRequest from '../../middlewares/validate-request';
import { BookingValidations } from './booking.validation';
import { BookingControllers } from './booking.controller';
import auth from '../../middlewares/auth';

const router = express.Router();


router.post('/', auth(UserRole.User), validateRequest(BookingValidations.createBookingSchema), BookingControllers.createANewBooking);

router.get('/', auth(UserRole.Admin), BookingControllers.getAllBookings);

export const BookingRoutes = router;