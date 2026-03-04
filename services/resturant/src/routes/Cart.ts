import express from 'express';
import { addToCart } from '../controllers/Cart.js';
import { authenticate } from '../middlewares/isAuth.js';

const router = express.Router();

router.post('/add', authenticate, addToCart);
export default router;
