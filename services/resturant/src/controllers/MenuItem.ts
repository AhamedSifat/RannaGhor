import { AuthenticatedRequest } from '../middlewares/isAuth.js';
import { tryCatch } from '../middlewares/trycatch.js';

import { Response } from 'express';
import Restaurant from '../models/Restaurant.js';
import getBufferDataUri from '../config/datauri.js';
import axios from 'axios';
import MenuItems from '../models/MenuItems.js';

export const createMenuItem = tryCatch(
  async (req: AuthenticatedRequest, res: Response) => {
    if (!req.user || req.user.role !== 'seller') {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const restaurant = await Restaurant.findOne({ ownerId: req.user._id });

    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    const { name, price, description } = req.body;

    if (!name || !price || !description) {
      return res
        .status(400)
        .json({ message: 'Name, price and description are required' });
    }

    const file = req.file;
    if (!file) {
      return res.status(400).json({
        success: false,
        error: 'Image is required',
      });
    }
    const fileBuffer = getBufferDataUri(file);
    if (!fileBuffer.content) {
      return res.status(500).json({
        success: false,
        error: 'failed to create file buffer',
      });
    }

    // make sure we have a utilities service endpoint configured
    const utilsUrl = process.env.UTILS_SERVICE_URL;
    if (!utilsUrl) {
      console.error('UTILS_SERVICE_URL not set');
      return res.status(500).json({
        success: false,
        error: 'Server configuration error: Upload service unavailable',
      });
    }

    let uploadResult;
    try {
      const response = await axios.post(`${utilsUrl}/api/upload`, {
        buffer: fileBuffer.content,
      });
      uploadResult = response.data;
    } catch (err: any) {
      console.error('Upload to utils service failed', err?.message || err);
      // if utils service returned 413, propagate a meaningful message
      if (err.response?.status === 413) {
        return res.status(413).json({
          success: false,
          error: 'Image payload too large',
        });
      }
      return res.status(502).json({
        success: false,
        error: 'Failed to upload image',
      });
    }

    const newMenuItem = await MenuItems.create({
      name,
      price,
      description,
      image: uploadResult.url,
      restaurantId: restaurant._id,
    });

    return res.status(201).json({
      success: true,
      message: 'Menu item created successfully',
      newMenuItem,
    });
  },
);

export const getMenuItems = tryCatch(
  async (req: AuthenticatedRequest, res: Response) => {
    const { restaurantId } = req.params;

    if (!restaurantId) {
      return res.status(400).json({
        success: false,
        error: 'Restaurant ID is required',
      });
    }

    const menuItems = await MenuItems.find({ restaurantId });
    return res.status(200).json({
      success: true,
      menuItems,
    });
  },
);

export const deleteMenuItem = tryCatch(
  async (req: AuthenticatedRequest, res: Response) => {
    if (!req.user || req.user.role !== 'seller') {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const { itemId } = req.params;

    if (!itemId) {
      return res.status(400).json({
        success: false,
        error: 'Menu item ID is required',
      });
    }

    const menuItem = await MenuItems.findById(itemId);

    if (!menuItem) {
      return res.status(404).json({
        success: false,
        error: 'Menu item not found',
      });
    }

    const restaurant = await Restaurant.findOne({
      _id: menuItem.restaurantId,
      ownerId: req.user._id,
    });

    if (!restaurant) {
      return res.status(404).json({
        success: false,
        error: 'Associated restaurant not found',
      });
    }

    await MenuItems.findByIdAndDelete(itemId);

    return res.status(200).json({
      success: true,
      message: 'Menu item deleted successfully',
    });
  },
);

export const toggleMenuItemAvailability = tryCatch(
  async (req: AuthenticatedRequest, res: Response) => {
    const user = req.user;
    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'Unauthorized',
      });
    }

    const { itemId } = req.params;
    if (!itemId) {
      return res.status(400).json({
        success: false,
        error: 'Menu item ID is required',
      });
    }

    const item = await MenuItems.findById(itemId);

    if (!item) {
      return res.status(404).json({
        success: false,
        error: 'Menu item not found',
      });
    }

    const restaurant = await Restaurant.findOne({
      _id: item.restaurantId,
      ownerId: user._id,
    });

    if (!restaurant) {
      return res.status(404).json({
        success: false,
        error: 'Associated restaurant not found',
      });
    }

    item.isAvailable = !item.isAvailable;
    await item.save();

    return res.status(200).json({
      success: true,
      message: `Menu item is now ${item.isAvailable ? 'available' : 'unavailable'}`,
      item,
    });
  },
);

export const getMenuItemById = tryCatch(
  async (req: AuthenticatedRequest, res: Response) => {
    const { itemId } = req.params;

    const menuItem = await MenuItems.findById(itemId);
    if (!menuItem) {
      return res.status(404).json({
        success: false,
        error: 'Menu item not found',
      });
    }

    return res.status(200).json({
      success: true,
      menuItem,
    });
  },
);
