import httpStatus from 'http-status';
import { BookingServices } from './booking.service';
import catchAsync from '../../utils/cathAsync';
import sendResponse from '../../utils/sendResponse';

const createBooking = catchAsync(async (req, res) => {
  const result = await BookingServices.createBooking(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking created successfully',
    data: result,
  });
});

const getAllBookings = catchAsync(async (req, res) => {
  const result = await BookingServices.getAllBookings();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All bookings retrieved successfully',
    data: result,
  });
});

const getUserBookings = catchAsync(async (req, res) => {
  const userId = req.user._id;
  const result = await BookingServices.getUserBookings(userId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User bookings retrieved successfully',
    data: result,
  });
});

const updateBooking = catchAsync(async (req, res) => {
  const bookingId = req.params.id;
  const result = await BookingServices.updateBooking(bookingId, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking updated successfully',
    data: result,
  });
});

const deleteBooking = catchAsync(async (req, res) => {
  const bookingId = req.params.id;
  const result = await BookingServices.deleteBooking(bookingId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking deleted successfully',
    data: result,
  });
});

export const BookingControllers = {
  createBooking,
  getAllBookings,
  getUserBookings,
  updateBooking,
  deleteBooking,
};
