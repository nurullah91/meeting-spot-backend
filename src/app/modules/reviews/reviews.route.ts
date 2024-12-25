import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { reviewValidation } from './reviews.validation';
import { ReviewControllers } from './reviews.controller';

const router = express.Router();

router.post(
  '/',
  auth('admin', 'user'),
  validateRequest(reviewValidation.createReviewValidationSchema),
  ReviewControllers.createReview,
);

router.get('/:id', ReviewControllers.getSingleRoomsReviews);

router.put(
  '/:id',
  auth('admin', 'user'),
  validateRequest(reviewValidation.updateReviewValidationSchema),
  ReviewControllers.updateSingleReview,
);
router.delete(
  '/:id',
  auth('admin', 'user'),
  ReviewControllers.deleteSingleReview,
);
export const ReviewRoutes = router;
