import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ReviewServices } from './reviews.service';

const createReview = catchAsync(async (req, res) => {
  const result = await ReviewServices.createReviewsIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Review is created successfully',
    data: result,
  });
});

// const getAllReviews = catchAsync(async (req, res) => {
//   const result = await ReviewServices.getAllReviews(req.query);
//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'All reviews are retrieved successfully',
//     data: result,
//   });
// });

const getSingleRoomsReviews = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ReviewServices.getSingleRoomsReviewsFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Reviews are retrieved successfully',
    data: result,
  });
});

const updateSingleReview = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ReviewServices.updateSingleReviewIntoDB(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Review is updated successfully',
    data: result,
  });
});

const deleteSingleReview = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ReviewServices.deleteSingleReviewFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Review is deleted successfully',
    data: result,
  });
});

export const ReviewControllers = {
  createReview,
  getSingleRoomsReviews,
  updateSingleReview,
  deleteSingleReview,
};
