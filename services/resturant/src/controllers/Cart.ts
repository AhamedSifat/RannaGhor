import mongoose from 'mongoose';
import { AuthenticatedRequest } from '../middlewares/isAuth.js';
import { tryCatch } from '../middlewares/trycatch.js';
import { Response } from 'express';
import Cart from '../models/Cart.js';

export const addToCart = tryCatch(
  async (req: AuthenticatedRequest, res: Response) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    if (req.user.role !== 'customer') {
      return res.status(403).json({ message: 'Forbidden' });
    }

    const userId = req.user._id;
    const { restaurantId, itemId } = req.body;

    if (
      !mongoose.Types.ObjectId.isValid(restaurantId) ||
      !mongoose.Types.ObjectId.isValid(itemId)
    ) {
      return res
        .status(400)
        .json({ message: 'Invalid restaurantId or itemId' });
    }

    const cartFromDifferentRestaurant = await Cart.findOne({
      userId,
      restaurantId: { $ne: restaurantId },
    });

    if (cartFromDifferentRestaurant) {
      return res.status(400).json({
        message:
          'You have items from a different restaurant in your cart. Please clear your cart before adding items from another restaurant.',
      });
    }

    const cartItem = await Cart.findOneAndUpdate(
      { userId, restaurantId, itemId },
      { $inc: { quantity: 1 }, $setOnInsert: { userId, restaurantId, itemId } },

      { new: true, upsert: true, setDefaultsOnInsert: true },
    );

    res.status(200).json({ message: 'Item added to cart', cart: cartItem });
  },
);

export const fetchMyCart = tryCatch(
  async (req: AuthenticatedRequest, res: Response) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    if (req.user.role !== 'customer') {
      return res.status(403).json({ message: 'Forbidden' });
    }

    const cartItems = await Cart.find({ userId: req.user._id })
      .populate('itemId')
      .populate('restaurantId');

    let subTotal = 0;
    let cartLength = 0;

    for (const cartItem of cartItems) {
      const item: any = cartItem.itemId;
      subTotal += item.price * cartItem.quantity;
      cartLength += cartItem.quantity;
    }

    return res.json({
      success: true,
      cartLength,
      subTotal,
      cart: cartItems,
    });
  },
);
