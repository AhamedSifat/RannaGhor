import express from 'express';
import cloudinary from 'cloudinary';
import { Request, Response } from 'express';

const router = express.Router();

router.post('/upload', async (req: Request, res: Response) => {
  try {
    const { buffer } = req.body;

    const result = await cloudinary.v2.uploader.upload(buffer);
    res.json({ url: result.secure_url });
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    res.status(500).json({ error: 'Failed to upload image' });
  }
});

export default router;
