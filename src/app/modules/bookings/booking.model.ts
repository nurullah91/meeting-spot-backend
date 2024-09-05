import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema(
  {
    date: { type: String, required: true },
    slots: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'Slot', required: true },
    ],
    room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users',
      required: true,
    },
    totalAmount: { type: Number, required: true },
    email: { type: String, required: true },
    paymentMethod: { type: String, required: true },
    paymentStatus: {
      type: String,
      enum: ['Pending', 'Paid'],
    },
    isConfirmed: {
      type: String,
      enum: ['unconfirmed', 'confirmed'],
      default: 'unconfirmed',
    },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;
