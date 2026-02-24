import type { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
export interface IUser {
  _id: string;
  name: string;
  email: string;
  image: string;
  role: string;
  resturantId: string;
}
export interface AuthenticatedRequest extends Request {
  user?: IUser | null;
}

export const authenticate = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      success: false,
      error: 'Unauthorized, token missing or invalid',
    });
  }

  let token: string | undefined;

  if (authHeader.startsWith('Bearer ')) {
    token = authHeader.split(' ')[1];
  } else {
    token = authHeader;
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      error: 'Unauthorized, token missing or invalid',
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

    if (!decoded.user || !decoded) {
      return res.status(401).json({
        success: false,
        error: 'Invalid token payload',
      });
    }

    req.user = decoded.user;
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      error: 'Unauthorized, token missing or invalid',
    });
  }
};

export const isSeller = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  if (req.user?.role !== 'seller') {
    return res.status(403).json({
      success: false,
      error: 'Forbidden, user is not a seller',
    });
  }
  next();
};
