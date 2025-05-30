/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import { TSlots } from './slots.interface';
import { Slot } from './slots.model';
import AppError from '../../errors/AppError';
import Room from '../rooms/rooms.model';
import mongoose from 'mongoose';

const createSlotsIntoDB = async (payload: TSlots) => {
  const { date, room, startTime, endTime } = payload;

  const isExistRoom = await Room.findById(room);
  if (!isExistRoom) {
    throw new AppError(httpStatus.NOT_FOUND, 'Room not found');
  }

  const slotDuration = 60; // slot duration in minutes
  let start = new Date(`${date}T${startTime}:00`);
  const end = new Date(`${date}T${endTime}:00`);

  const slots = [];
  while (start < end) {
    const endSlot = new Date(start.getTime() + slotDuration * 60000);

    if (endSlot > end) break;

    slots.push({
      room,
      date,
      startTime: start.toTimeString().substr(0, 5),
      endTime: endSlot.toTimeString().substr(0, 5),
      isBooked: false,
    });
    start = endSlot; // Update start to the end of the current slot
  }

  const result = await Slot.insertMany(slots);
  return result;
};

// const getAvailableSlotsFromDB = async (query: Record<string, unknown>) => {

//   const availableSotsQuery = new QueryBuilder(
//     Slot.find().populate('room'),
//     query,
//   )
//     .search(['date'])
//     .filter()
//     .sort()
//     .paginate()
//     .fields();

//   const meta = await availableSotsQuery.countTotal();
//   const result = await availableSotsQuery.modelQuery;

//   return {
//     meta,
//     result,
//   };
//   // const query: any = { isBooked: false };
//   // if (date) {
//   //   query.date = date;
//   // }
//   // if (roomId) {
//   //   query.room = roomId;
//   // }

//   // const slots = await Slot.find(query).populate('room');

//   // return slots;
// };

const getAvailableSlotsFromDB = async (filters: {
  date?: string;
  roomId?: string;
}) => {
  const { date, roomId } = filters;

  const query: any = { isBooked: false, isDeleted: false };
  if (date) {
    query.date = date;
  }
  if (roomId) {
    query.room = roomId;
  }

  const slots = await Slot.find(query).populate('room');

  return slots;
};
const updateSlotIntoDB = async (id: string, payload: Partial<TSlots>) => {
  const result = await Slot.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteSlotFromDB = async (id: string) => {
  const result = await Slot.findByIdAndUpdate(
    id,
    {
      isDeleted: true,
    },
    {
      new: true,
    },
  );

  return result;
};

const getAvailableSlotDates = async (roomId: string) => {
  const result = await Slot.aggregate([
    {
      $match: {
        room: new mongoose.Types.ObjectId(roomId), // Match the room ID
        isBooked: false,
        isDeleted: false,
      },
    },
    {
      $group: {
        _id: '$date', // Group by date
      },
    },
    {
      $project: {
        _id: 0, // Exclude the `_id` field from the output
        date: '$_id', // Rename `_id` to `date`
      },
    },
  ]);
  return result.map((doc) => doc.date); // Return only the dates
};

export const SlotServices = {
  updateSlotIntoDB,
  deleteSlotFromDB,
  createSlotsIntoDB,
  getAvailableSlotsFromDB,
  getAvailableSlotDates,
};
