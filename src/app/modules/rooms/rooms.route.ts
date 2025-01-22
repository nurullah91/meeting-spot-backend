import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { roomsValidation } from './rooms.validation';
import { RoomControllers } from './rooms.controller';

const router = express.Router();

router.post(
  '/',
  auth('admin'),
  validateRequest(roomsValidation.createRoomsValidationSchema),
  RoomControllers.createRooms,
);

router.get('/', RoomControllers.getAllRooms);
router.get('/test/test-query', RoomControllers.testQuery);

router.get('/:id', RoomControllers.getSingleRoom);
router.get('/categories/all-categories', RoomControllers.getAllRoomCategories);

router.put(
  '/:id',
  auth('admin'),
  validateRequest(roomsValidation.updateRoomsValidationSchema),
  RoomControllers.updateSingleRoom,
);
router.delete('/:id', auth('admin'), RoomControllers.deleteSingleRoom);
export const RoomRoutes = router;
