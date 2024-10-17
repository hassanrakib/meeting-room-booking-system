import express from 'express';
import { UserRole } from '../user/user.interface';
import validateRequest from '../../middlewares/validate-request';
import { BookingValidations } from './booking.validation';
import { BookingControllers } from './booking.controller';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post('/', auth(UserRole.User), validateRequest(BookingValidations.createBookingSchema), BookingControllers.createANewBooking);

router.get('/', auth(UserRole.Admin), BookingControllers.getAllBookings);

router.put('/:id', auth(UserRole.Admin), validateRequest(BookingValidations.updateBookingStatusSchema), BookingControllers.updateBookingStatus);

router.delete("/:id", auth(UserRole.Admin), BookingControllers.deleteBookingById);

export const BookingRoutes = router;

//**  api/my-bookings route **/
export const myBookingRoute = express.Router();

myBookingRoute.get('/', auth(UserRole.User), BookingControllers.getMyBookings);