import express from 'express';
import { addRestaurant } from '../controllers/resturant.js';
import { authenticate, isSeller } from '../middlewares/isAuth.js';
const router = express.Router();

router.post('/new', authenticate, isSeller, addRestaurant);

export default router;
