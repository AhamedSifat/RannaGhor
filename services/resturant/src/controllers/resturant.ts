import { AuthenticatedRequest } from '../middlewares/isAuth.js';
import { Response } from 'express';
import { tryCatch } from '../middlewares/trycatch.js';
import Restaurant from '../models/Restaurant.js';
import getBufferDataUri from '../config/datauri.js';
import axios from 'axios';

export const addRestaurant = tryCatch(
  async (req: AuthenticatedRequest, res: Response) => {
    const user = req.user;

    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'Unauthorized',
      });
    }

    const existingRestaurant = await Restaurant.findOne({ ownerId: user!._id });

    if (existingRestaurant) {
      return res.status(400).json({
        success: false,
        error: 'You already have a restaurant',
      });
    }

    const { name, description, phone, latitude, longitude, formattedAddress } =
      req.body;

    if (!name || !latitude || !longitude || !formattedAddress) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields',
      });
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

    const { data: UploadResult } = await axios.post(
      `${process.env.UTILS_SERVICE}/api/upload`,
      {
        buffer: fileBuffer.content,
      },
    );

    const newRestaurant = await Restaurant.create({
      name,
      description,
      phone,
      autoLocation: {
        type: 'Point',
        coordinates: [Number(longitude), Number(latitude)],
        formattedAddress,
      },
      image: UploadResult.url,
      ownerId: user._id,
    });

    if (!newRestaurant) {
      return res.status(500).json({
        success: false,
        error: 'Failed to create restaurant',
      });
    }

    res.status(201).json({
      success: true,
      restaurant: newRestaurant,
    });
  },
);
