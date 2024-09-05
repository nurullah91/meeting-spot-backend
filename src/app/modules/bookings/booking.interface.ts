export interface IBooking {
  date: string;
  slots: string[];
  room: string;
  user: string;
  email: string;
  paymentMethod: string;
  paymentStatus: 'Pending' | 'Paid';
  totalAmount: number;
  isConfirmed: 'unconfirmed' | 'confirmed';
  isDeleted: boolean;
}
