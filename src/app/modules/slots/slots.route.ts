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
router.patch(
  '/:id',
  auth('admin'),
  validateRequest(SlotsValidation.updateSlotValidationSchema),
  SlotControllers.updateSingleSlot,
);
router.delete('/:id', auth('admin'), SlotControllers.deleteSingleSlot);

router.get('/availability', SlotControllers.getAvailableSlots);
router.get('/:roomId/available-dates', SlotControllers.getAvailableSlotsDates);
export const SlotRoutes = router;
