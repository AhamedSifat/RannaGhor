export interface IRestaurant {
  _id: string;
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
