import express from 'express';
import { loginUser, addUserRole, myProfile } from '../controllers/auth.js';
import { authenticate } from '../middlewares/isAuth.js';

const router = express.Router();

router.post('/login', loginUser);
router.put('/add/role', authenticate, addUserRole);
router.get('/me', authenticate, myProfile);

export default router;
