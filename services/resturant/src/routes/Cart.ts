import express from 'express';
import {
  addToCart,
  fetchMyCart,
  incrementCartItem,
  decrementCartItem,
  clearCart,
} from '../controllers/Cart.js';
import { authenticate } from '../middlewares/isAuth.js';

const router = express.Router();

router.post('/add', authenticate, addToCart);
router.get('/all', authenticate, fetchMyCart);
router.put('/inc', authenticate, incrementCartItem);
router.put('/dec', authenticate, decrementCartItem);
router.delete('/clear', authenticate, clearCart);

export default router;
