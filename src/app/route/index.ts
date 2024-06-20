import { Router } from 'express';
import { UserRoutes } from '../modules/user/user.route';
import { RoomRoutes } from '../modules/rooms/rooms.route';

const router = Router();

const allRoutes = [
  {
    path: '/auth',
    route: UserRoutes,
  },
  {
    path: '/rooms',
    route: RoomRoutes,
  },
];

allRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
