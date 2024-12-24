import { Types } from 'mongoose';

export type TReviews = {
  _id: Types.ObjectId;
  room: Types.ObjectId;
  user: Types.ObjectId;
  review: string;
  isDeleted: boolean;
};
