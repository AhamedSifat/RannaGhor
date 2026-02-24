import mongoose, { Schema, Document } from 'mongoose';

export interface IRestaurant extends Document {
  name: string;
  description?: string;
  image: string;
  ownerId: string;
  phone: number;
  isVerified: boolean;
  autoLocation: {
    type: 'Point';
    coordinates: [number, number];
    formattedAddress: string;
  };

  isOpen: boolean;
  createdAt: Date;
}

const RestaurantSchema: Schema<IRestaurant> = new Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String },
    image: { type: String, required: true },
    ownerId: { type: String, required: true },
    phone: { type: Number, required: true },
    isVerified: { type: Boolean, default: false },
    autoLocation: {
      type: {
        type: String,
        enum: ['Point'],
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
      },
      formattedAddress: { type: String, required: true },
    },
    isOpen: { type: Boolean, default: false },
  },
  { timestamps: true },
);

const Restaurant = mongoose.model<IRestaurant & Document>(
  'Restaurant',
  RestaurantSchema,
);

export default Restaurant;
