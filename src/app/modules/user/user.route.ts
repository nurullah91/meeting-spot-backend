import express from 'express';
import { UserControllers } from './user.controller';

const router = express.Router();

router.post('/signup', UserControllers.createUser);
router.post('/login', UserControllers.loginUser);

export const UserRoutes = router;
