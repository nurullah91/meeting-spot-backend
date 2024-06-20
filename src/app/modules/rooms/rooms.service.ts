import { IRooms } from './rooms.interface';
import Room from './rooms.model';

const createRoomsIntoDB = async (payload: IRooms) => {
  const result = await Room.create(payload);

  return result;
};

export const RoomServices = {
  createRoomsIntoDB,
};
