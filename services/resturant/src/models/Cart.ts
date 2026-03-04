import mongoose, { Schema, Document } from 'mongoose';

export interface ICart extends Document {
  restaurantId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  itemId: mongoose.Types.ObjectId;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
}

const CartSchema: Schema = new Schema<ICart>(
  {
    restaurantId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'Restaurant',
      index: true,
    },
    userId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'User',
      index: true,
    },
    itemId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'MenuItems',
      index: true,
    },
    quantity: {
      type: Number,
      default: 1,
      min: 1,
    },
  },
  { timestamps: true },
);

CartSchema.index({ userId: 1, restaurantId: 1, itemId: 1 }, { unique: true });

const Cart = mongoose.model<ICart>('Cart', CartSchema);

export default Cart;
