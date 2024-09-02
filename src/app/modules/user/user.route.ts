import express from 'express';
import { UserControllers } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from './user.validation';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post(
  '/signup',
  validateRequest(UserValidation.userValidationSchema),
  UserControllers.createUser,
);
router.post('/login', UserControllers.loginUser);
router.patch(
  '/update-user/:userId',
  auth('admin'),
  validateRequest(UserValidation.updateUserValidationSchema),
  UserControllers.updateUser,
);

export const UserRoutes = router;
