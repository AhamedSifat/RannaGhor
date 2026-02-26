import mongoose, { Schema, Document } from 'mongoose';

export interface IMenuItems extends Document {
  restaurantId: mongoose.Types.ObjectId;
  name: string;
  price: number;
  description: string;
  category: string;
  image?: string;
  isAvailable: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const MenuItemsSchema: Schema = new Schema<IMenuItems>(
  {
    restaurantId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'Restaurant',
      index: true,
    },
    name: { type: String, required: true , trim: true},
    price: { type: Number, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    image: { type: String },
    isAvailable: { type: Boolean, default: true },
  },
  { timestamps: true },
);

 const MenuItems = mongoose.model<IMenuItems>('MenuItems', MenuItemsSchema);

export default MenuItems;