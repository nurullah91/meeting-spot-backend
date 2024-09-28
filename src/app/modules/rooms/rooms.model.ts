import mongoose, { Schema } from 'mongoose';
import { TRooms } from './rooms.interface';

const roomSchema = new Schema(
  {
    name: { type: String, required: true },
    img: { type: String, required: true },
    detailImages: { type: [String], required: true },
    roomNo: { type: Number, required: true, unique: true },
    floorNo: { type: Number, required: true },
    capacity: { type: Number, required: true },
    pricePerSlot: { type: Number, required: true },
    amenities: { type: [String], required: true },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

roomSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

roomSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
roomSchema.pre('findOneAndUpdate', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
roomSchema.pre('findOneAndDelete', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

const Room = mongoose.model<TRooms>('Room', roomSchema);
export default Room;
