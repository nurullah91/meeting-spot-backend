import mongoose, { Schema } from 'mongoose';
import { IRooms } from './rooms.interface';

const roomSchema = new Schema({
  name: { type: String, required: true },
  roomNo: { type: Number, required: true, unique: true },
  floorNo: { type: Number, required: true },
  capacity: { type: Number, required: true },
  pricePerSlot: { type: Number, required: true },
  amenities: { type: [String], required: true },
  isDeleted: { type: Boolean, default: false },
});

const Room = mongoose.model<IRooms>('Room', roomSchema);
export default Room;
