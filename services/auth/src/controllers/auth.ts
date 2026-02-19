import User from '../model/User.js';
import jwt from 'jsonwebtoken';
import { tryCatch } from '../middlewares/trycatch.js';
import { AuthenticatedRequest } from '../middlewares/isAuth.js';
import { oauth2Client } from '../config/googleConfig.js';
import axios from 'axios';

export const loginUser = tryCatch(async (req, res) => {
  const { code } = req.body;
  if (!code) {
    return res.status(400).json({ message: 'Authorization code is required' });
  }

  const googleResponse = await oauth2Client.getToken(code);
  oauth2Client.setCredentials(googleResponse.tokens);

  const userResponse = await axios.get(
    `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleResponse.tokens.access_token}`,
  );

  const { email, name, picture } = userResponse.data;
  let user = await User.findOne({ email });

  if (!user) {
    user = await User.create({
      name,
      email,
      image: picture,
    });
  }

  const token = jwt.sign({ user }, process.env.JWT_SECRET as string, {
    expiresIn: '15d',
  });

  res.status(200).json({ message: 'Login successful', token, user });
});

const allowedRoles = ['customer', 'rider', 'seller'] as const;
export type AllowedRoles = (typeof allowedRoles)[number];

export const addUserRole = tryCatch(async (req: AuthenticatedRequest, res) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const { role } = req.body;

  if (!allowedRoles.includes(role)) {
    return res.status(400).json({ message: 'Invalid role' });
  }

  const user = await User.findOneAndUpdate(
    { email: req.user.email },
    { role },
    { new: true },
  );

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  const token = jwt.sign({ user }, process.env.JWT_SECRET as string, {
    expiresIn: '15d',
  });

  res.status(200).json({ message: 'Role added successfully', user, token });
});

export const myProfile = tryCatch(async (req: AuthenticatedRequest, res) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  res.status(200).json({ user: req.user });
});
