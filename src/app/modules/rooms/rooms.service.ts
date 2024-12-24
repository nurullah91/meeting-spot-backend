import mongoose from 'mongoose';
import QueryBuilder from '../../../builder/QueryBuilder';
import { TRooms } from './rooms.interface';
import Room from './rooms.model';

const createRoomsIntoDB = async (payload: TRooms) => {
  const result = await Room.create(payload);

  return result;
};

const getAllRoomsFromDB = async (query: Record<string, unknown>) => {
  const roomQuery = new QueryBuilder(Room.find(), query)
    .search(['name', 'amenities'])
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await roomQuery.countTotal();
  // Execute the query

  // Add avgRatings field to each room
  const result = await Room.aggregate([
    {
      $match: roomQuery.modelQuery.getFilter(),
    },
    {
      $addFields: {
        avgRatings: {
          $cond: [{ $eq: [{ $size: '$ratings' }, 0] }, 0, { $avg: '$ratings' }],
        },
      },
    },
  ]);

  return {
    meta,
    result,
  };
};

const getSingleRoomsFromDB = async (id: string) => {
  const result = await Room.aggregate([
    {
      $match: { _id: new mongoose.Types.ObjectId(id), isDeleted: false },
    },
    {
      $addFields: {
        avgRatings: {
          $cond: [{ $eq: [{ $size: '$ratings' }, 0] }, 0, { $avg: '$ratings' }],
        },
      },
    },
    {
      $lookup: {
        from: 'reviews', // Collection name for reviews
        localField: '_id', // Field in Room collection
        foreignField: 'room', // Field in Review collection
        as: 'reviews',
      },
    },
  ]);

  return result[0] || null;
};

const updateSingleRoomsIntoDB = async (
  id: string,
  payload: Partial<TRooms>,
) => {
  const result = await Room.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteSingleRoomFromDB = async (id: string) => {
  const result = await Room.findByIdAndUpdate(
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
export const RoomServices = {
  createRoomsIntoDB,
  getAllRoomsFromDB,
  getSingleRoomsFromDB,
  updateSingleRoomsIntoDB,
  deleteSingleRoomFromDB,
};
