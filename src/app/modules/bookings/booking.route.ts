import express from 'express';
import { BookingControllers } from './booking.controller';
import auth from '../../middlewares/auth';
import { BookingValidation } from './booking.validation';
import validateRequest from '../../middlewares/validateRequest';

const router = express.Router();

router.post(
  '/',
  auth('user'),
  validateRequest(BookingValidation.createBooking),
  BookingControllers.createBooking,
);
router.get('/', auth('admin'), BookingControllers.getAllBookings);
router.get('/my-bookings', auth('user'), BookingControllers.getUserBookings);
router.put(
  '/:id',
  auth('admin'),
  validateRequest(BookingValidation.updateBooking),
  BookingControllers.updateBooking,
);
router.delete('/:id', auth('admin'), BookingControllers.deleteBooking);

export const BookingRoutes = router;
