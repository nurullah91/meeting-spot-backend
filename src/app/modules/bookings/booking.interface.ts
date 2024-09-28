import { IUser } from '../user/user.interface';

export interface IBooking {
  date: string;
  slots: string[];
  room: string;
  user: string;
  email: string;
  paymentMethod: string;
  paymentStatus: 'Pending' | 'Paid';
  txnId?: string;
  totalAmount: number;
  isConfirmed: 'unconfirmed' | 'confirmed';
  isDeleted: boolean;
}

export type TPaymentData = {
  date: string;
  slots: string[];
  room: string;
  user: IUser;
  email: string;
  transactionId: string;
  paymentMethod: string;
  paymentStatus: 'Pending' | 'Paid';
  totalAmount: number;
  isConfirmed: 'unconfirmed' | 'confirmed';
  isDeleted: boolean;
};
