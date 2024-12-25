import { Schema, model } from 'mongoose';
import { TReviews } from './reviews.interface';

const SlotSchema = new Schema<TReviews>(
  {
    room: {
      type: Schema.Types.ObjectId,
      ref: 'Room',
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    review: {
      type: String,
      default: '',
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

export const Review = model<TReviews>('Review', SlotSchema);
