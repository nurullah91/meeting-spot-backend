export interface IBooking {
  date: string;
  slots: string[];
  room: string;
  user: string;
  totalAmount: number;
  isConfirmed: 'unconfirmed' | 'confirmed';
  isDeleted: boolean;
}
