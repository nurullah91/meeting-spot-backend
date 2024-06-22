import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { SlotsValidation } from './slots.validation';
import { SlotControllers } from './slots.controller';

const router = express.Router();

router.post(
  '/',
  auth('admin'),
  validateRequest(SlotsValidation.createSlotValidationSchema),
  SlotControllers.createSlots,
);

router.get('/availability', SlotControllers.getAvailableSlots);
export const SlotRoutes = router;
