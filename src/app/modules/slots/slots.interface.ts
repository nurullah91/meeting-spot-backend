import { Types } from 'mongoose';

export type TSlots = {
  room: Types.ObjectId;
  date: string;
  startTime: string;
  endTime: string;
  isBooked: boolean;
};
