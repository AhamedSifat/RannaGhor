import express from 'express';
import {
  createMenuItem,
  getMenuItems,
  deleteMenuItem,
  toggleMenuItemAvailability,
  getMenuItemById,
  updateMenuItem,
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
router.get('/:itemId', authenticate, getMenuItemById);
router.put('/update/:itemId', authenticate, isSeller, updateMenuItem);

export default router;
