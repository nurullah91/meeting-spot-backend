import catchAsync from '../../utils/cathAsync';
import { RoomServices } from './rooms.service';

const createRooms = catchAsync(async (req, res) => {
  const result = await RoomServices.createRoomsIntoDB(req.body);
});

export const RoomControllers = {
  createRooms,
};
