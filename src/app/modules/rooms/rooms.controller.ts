import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { RoomServices } from './rooms.service';

const createRooms = catchAsync(async (req, res) => {
  const result = await RoomServices.createRoomsIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Room is created successfully',
    data: result,
  });
});

const getAllRooms = catchAsync(async (req, res) => {
  const result = await RoomServices.getAllRoomsFromDB(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All rooms are retrieved successfully',
    data: result,
  });
});

const getSingleRoom = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await RoomServices.getSingleRoomsFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Room is retrieved successfully',
    data: result,
  });
});

const updateSingleRoom = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await RoomServices.updateSingleRoomsIntoDB(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Room is updated successfully',
    data: result,
  });
});

const deleteSingleRoom = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await RoomServices.deleteSingleRoomFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Room is deleted successfully',
    data: result,
  });
});

export const RoomControllers = {
  createRooms,
  getAllRooms,
  getSingleRoom,
  updateSingleRoom,
  deleteSingleRoom,
};
