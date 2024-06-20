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

export const RoomRoutes = router;
