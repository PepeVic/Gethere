import AppError from '../shared/errors/AppError';
import TokenValidationError from '../shared/errors/TokenValidationError';
import { Express, NextFunction, Request, Response } from 'express';

export default (app: Express): void => {
  app.use((err: Error, req: Request, res: Response, _: NextFunction) => {
    // to remove em prod
    console.error('err', err);

    if (err instanceof AppError) {
      return res.status(err.statusCode).json({
        status: 'expected error',
        message: err.message,
      });
    }

    if (err instanceof TokenValidationError) {
      return res.status(err.statusCode).json({
        status: 'token error',
        message: err.message,
      });
    }

    console.error(err);

    return res.status(500).json({
      status: 'error 500',
      message: 'Internal Server Error',
    });
  });
};
