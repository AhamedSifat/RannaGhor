import { AuthenticatedRequest } from '../middlewares/isAuth.js';
import { Response } from 'express';
import { tryCatch } from '../middlewares/trycatch.js';
import Restaurant from '../models/Restaurant.js';
import getBufferDataUri from '../config/datauri.js';
import axios from 'axios';
import jwt from 'jsonwebtoken';

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

    const newRestaurant = await Restaurant.create({
      name,
      description,
      phone,
      autoLocation: {
        type: 'Point',
        coordinates: [Number(longitude), Number(latitude)],
        formattedAddress,
      },
      image: uploadResult?.url,
      ownerId: user._id,
      isVerified: false,
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

export const fetchMyRestaurant = tryCatch(
  async (req: AuthenticatedRequest, res: Response) => {
    const user = req.user;
    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'Unauthorized',
      });
    }

    const restaurant = await Restaurant.findOne({ ownerId: user._id });

    if (!restaurant) {
      return res.status(404).json({
        success: false,
        error: 'Restaurant not found',
      });
    }

    if (!req.user?.resturantId) {
      const token = jwt.sign(
        {
          user: {
            ...req.user,
            resturantId: restaurant._id,
          },
        },
        process.env.JWT_SECRET!,
        {
          expiresIn: '15d',
        },
      );

      res.status(200).json({
        success: true,
        restaurant,
        token,
      });
      return;
    }

    res.status(200).json({
      success: true,
      restaurant,
    });
  },
);

export const updateRestaurantStatus = tryCatch(
  async (req: AuthenticatedRequest, res: Response) => {
    const user = req.user;
    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'Unauthorized',
      });
    }

    const { status } = req.body;
    if (typeof status !== 'boolean') {
      return res.status(400).json({
        success: false,
        error: 'Invalid status value',
      });
    }

    const restaurant = await Restaurant.findOneAndUpdate(
      { ownerId: user._id },
      { isOpen: status },
      { new: true },
    );
    if (!restaurant) {
      return res.status(404).json({
        success: false,
        error: 'Restaurant not found',
      });
    }

    res.status(200).json({
      success: true,
      restaurant,
    });
  },
);
