import express from 'express';
import {
  createMenuItem,
  getMenuItems,
  deleteMenuItem,
  toggleMenuItemAvailability,
} from '../controllers/MenuItem.js';
import { authenticate, isSeller } from '../middlewares/isAuth.js';
import uploadFile from '../middlewares/multer.js';
const router = express.Router();

router.post('/new', authenticate, isSeller, uploadFile, createMenuItem);
router.get('/all/:restaurantId', authenticate, getMenuItems);
router.delete('/delete/:itemId', authenticate, isSeller, deleteMenuItem);
router.put(
  '/toggle/:itemId',
  authenticate,
  isSeller,
  toggleMenuItemAvailability,
);

export default router;
