/* eslint-disable @typescript-eslint/no-explicit-any */

import httpStatus from 'http-status';
import Room from '../rooms/rooms.model';
import AppError from '../../errors/AppError';
import { Slot } from '../slots/slots.model';
import Booking from './booking.model';
import { User } from '../user/user.model';
import QueryBuilder from '../../../builder/QueryBuilder';

const createBooking = async (payload: any) => {
  const { date, slots, room, user } = payload;

  // Validate room
  const userExists = await User.findById(user);
  if (!userExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }
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

  const booking = await Booking.create(payload);

  // Mark slots as booked
  await Slot.updateMany({ _id: { $in: slots } }, { isBooked: true });

  return booking;
};

const getAllBookings = async (query: Record<string, unknown>) => {
  const allBookingsQuery = new QueryBuilder(
    Booking.find().populate('room').populate('user').populate('slots'),
    query,
  )
    .search(['date'])
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await allBookingsQuery.countTotal();
  const result = await allBookingsQuery.modelQuery;
  return {
    meta,
    result,
  };
};

const getUserBookings = async (email: string) => {
  const user = await User.findOne({ email });

  const userId = user?._id;
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

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
