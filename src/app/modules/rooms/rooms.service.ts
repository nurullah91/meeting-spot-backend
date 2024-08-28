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
  const result = await roomQuery.modelQuery;
  return {
    meta,
    result,
  };
};

const getSingleRoomsFromDB = async (id: string) => {
  const result = await Room.findById(id);
  return result;
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
