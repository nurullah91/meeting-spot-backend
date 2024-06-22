import { Router } from 'express';
import { UserRoutes } from '../modules/user/user.route';
import { RoomRoutes } from '../modules/rooms/rooms.route';
import { SlotRoutes } from '../modules/slots/slots.route';
import { BookingRoutes } from '../modules/bookings/booking.route';

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
  {
    path: '/slots',
    route: SlotRoutes,
  },
  {
    path: '/bookings',
    route: BookingRoutes,
  },
];

allRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
