import express from 'express';
import { addToCart, fetchMyCart } from '../controllers/Cart.js';
import { authenticate } from '../middlewares/isAuth.js';

const router = express.Router();

router.post('/add', authenticate, addToCart);
router.post('/all', authenticate, fetchMyCart);
export default router;
