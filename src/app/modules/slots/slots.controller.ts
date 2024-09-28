import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { SlotServices } from './slots.service';

const createSlots = catchAsync(async (req, res) => {
  const result = await SlotServices.createSlotsIntoDB(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Slots created successfully',
    data: result,
  });
});

const getAvailableSlots = catchAsync(async (req, res) => {
  const date = req.query.date as string | undefined;
  const roomId = req.query.roomId as string | undefined;

  const slots = await SlotServices.getAvailableSlotsFromDB({ date, roomId });

  res.status(httpStatus.OK).json({
    success: true,
    statusCode: httpStatus.OK,
    message: 'Available slots retrieved successfully',
    data: slots,
  });
});

const updateSingleSlot = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await SlotServices.updateSlotIntoDB(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Slot is updated successfully',
    data: result,
  });
});

const deleteSingleSlot = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await SlotServices.deleteSlotFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Slot is deleted successfully',
    data: result,
  });
});

export const SlotControllers = {
  createSlots,
  getAvailableSlots,
  updateSingleSlot,
  deleteSingleSlot,
};
