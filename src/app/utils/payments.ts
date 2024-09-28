import axios from 'axios';
import config from '../config';
import { TPaymentData } from '../modules/bookings/booking.interface';
import AppError from '../errors/AppError';
import httpStatus from 'http-status';

export const initiatePayment = async (paymentData: TPaymentData) => {
  try {
    const response = await axios.post(config.paymentUrl!, {
      store_id: config.storeId,
      signature_key: config.signature_key,
      tran_id: paymentData.transactionId,
      success_url: `https://meeting-spot-backend.vercel.app/api/payment/confirmation?txnId=${paymentData.transactionId}&status=success`,
      fail_url: `https://meeting-spot-backend.vercel.app/api/payment/confirmation?status=failed`,
      cancel_url: 'https://meeting-spot.netlify.app/',
      amount: paymentData.totalAmount,
      currency: 'BDT',
      desc: 'Room Booking Payment',
      cus_name: paymentData.user.name,
      cus_email: paymentData.user.email,
      cus_add1: paymentData.user.address,
      cus_add2: 'N/A',
      cus_city: 'N/A',
      cus_state: 'N/A',
      cus_postcode: 'N/A',
      cus_country: 'Bangladesh',
      cus_phone: paymentData.user.phone,
      type: 'json',
    });
    return response;
  } catch (error) {
    throw new AppError(
      httpStatus.EXPECTATION_FAILED,
      'Payment initiation Failed',
    );
  }
};

export const verifyPayment = async (txnId: string) => {
  try {
    const response = await axios.get(config.payment_verify_url!, {
      params: {
        store_id: config.storeId,
        signature_key: config.signature_key,
        type: 'json',
        request_id: txnId,
      },
    });
    return response.data;
  } catch (error) {
    throw new AppError(
      httpStatus.EXPECTATION_FAILED,
      'Payment Verification Failed',
    );
  }
};
