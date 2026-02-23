import { Request, NextFunction, Response, RequestHandler } from 'express';

export const tryCatch = (fn: RequestHandler): RequestHandler => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res, next);
    } catch (error: any) {
      res.status(500).json({
        message: error instanceof Error ? error.message : 'Server error',
      });
    }
  };
};
