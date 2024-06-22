import httpStatus from 'http-status';
import catchAsync from '../../utils/cathAsync';
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

export const SlotControllers = {
  createSlots,
  getAvailableSlots,
};
