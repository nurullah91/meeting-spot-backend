import { Schema, model } from 'mongoose';
import { TSlots } from './slots.interface';

const SlotSchema = new Schema<TSlots>(
  {
    room: {
      type: Schema.Types.ObjectId,
      ref: 'Room',
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
    isBooked: {
      type: Boolean,
      default: false,
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

export const Slot = model<TSlots>('Slot', SlotSchema);
