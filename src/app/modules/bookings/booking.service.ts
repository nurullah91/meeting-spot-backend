/* eslint-disable @typescript-eslint/no-explicit-any */

import httpStatus from 'http-status';
import Room from '../rooms/rooms.model';
import AppError from '../../errors/AppError';
import { Slot } from '../slots/slots.model';
import Booking from './booking.model';
import { User } from '../user/user.model';

const createBooking = async (payload: any) => {
  const { date, slots, room, user } = payload;

  // Validate room
  const roomExists = await Room.findById(room);
  if (!roomExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Room not found');
  }

  // Validate slots
  const slotDocs = await Slot.find({
    _id: { $in: slots },
    room,
    date,
    isBooked: false,
  });
  if (slotDocs.length !== slots.length) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Some slots are already booked or do not exist',
    );
  }

  // Calculate total amount
  const totalAmount = slotDocs.length * roomExists.pricePerSlot;

  const bookingData = { date, slots, room, user, totalAmount };
  // Create booking
  const booking = await Booking.create(bookingData);

  // Mark slots as booked
  await Slot.updateMany({ _id: { $in: slots } }, { isBooked: true });

  return booking;
};

const getAllBookings = async () => {
  return Booking.find({ isDeleted: false })
    .populate('room')
    .populate('user')
    .populate('slots');
};

const getUserBookings = async (email: string) => {
  const user = await User.findOne({ email });
  const userId = user?._id;
  return Booking.find({ user: userId, isDeleted: false })
    .populate('room')
    .populate('user')
    .populate('slots');
};

const updateBooking = async (bookingId: string, updateData: any) => {
  const booking = await Booking.findByIdAndUpdate(bookingId, updateData, {
    new: true,
  })
    .populate('room')
    .populate('user')
    .populate('slots');
  if (!booking) {
    throw new AppError(httpStatus.NOT_FOUND, 'Booking not found');
  }
  return booking;
};

const deleteBooking = async (bookingId: string) => {
  const booking = await Booking.findByIdAndUpdate(
    bookingId,
    { isDeleted: true },
    { new: true },
  );
  if (!booking) {
    throw new AppError(httpStatus.NOT_FOUND, 'Booking not found');
  }
  return booking;
};

export const BookingServices = {
  createBooking,
  getAllBookings,
  getUserBookings,
  updateBooking,
  deleteBooking,
};
