import express from 'express';
import {
  addRestaurant,
  fetchMyRestaurant,
  updateRestaurantStatus,
} from '../controllers/resturant.js';
import { authenticate, isSeller } from '../middlewares/isAuth.js';
import uploadFile from '../middlewares/multer.js';
const router = express.Router();

router.post('/new', authenticate, isSeller, uploadFile, addRestaurant);
router.get('/my', authenticate, isSeller, fetchMyRestaurant);
router.put('/update', authenticate, isSeller, updateRestaurantStatus);

export default router;
