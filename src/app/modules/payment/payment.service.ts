import { verifyPayment } from '../../utils/payments';
import Booking from '../bookings/booking.model';

const confirmationService = async (txnId: string) => {
  const verifyPaymentResponse = await verifyPayment(txnId);

  let result;
  if (
    verifyPaymentResponse &&
    verifyPaymentResponse.pay_status === 'Successful'
  ) {
    result = await Booking.findOneAndUpdate(
      { txnId },
      {
        paymentStatus: 'Paid',
      },
    )
      .populate('room')
      .populate('user')
      .populate('slots');
  }
  return result;
};

export const paymentServices = {
  confirmationService,
};
