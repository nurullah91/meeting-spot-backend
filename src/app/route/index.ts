import { Router } from 'express';
import { UserRoutes } from '../modules/user/user.route';
import { RoomRoutes } from '../modules/rooms/rooms.route';
import { SlotRoutes } from '../modules/slots/slots.route';
import { BookingRoutes } from '../modules/bookings/booking.route';
import { PaymentRoutes } from '../modules/payment/payment.route';
import { ReviewRoutes } from '../modules/reviews/reviews.route';

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
  {
    path: '/payment',
    route: PaymentRoutes,
  },
  {
    path: '/review',
    route: ReviewRoutes,
  },
];

allRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
