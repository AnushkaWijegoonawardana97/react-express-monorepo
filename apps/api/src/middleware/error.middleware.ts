import type { Request, Response, NextFunction } from 'express';
import { sendError } from '../utils/response.util';
import { HTTP_STATUS } from '../constants';
import { API_MESSAGES } from '../constants';
import type { ErrorResponse } from '../types';

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  const isDevelopment = process.env.NODE_ENV === 'development';

  const errorResponse: ErrorResponse = {
    success: false,
    message: err.message || API_MESSAGES.SERVER_ERROR,
    ...(isDevelopment && { stack: err.stack }),
  };

  if (err.name === 'ValidationError') {
    sendError(res, err.message, HTTP_STATUS.BAD_REQUEST);
    return;
  }

  if (err.name === 'UnauthorizedError' || err.name === 'JsonWebTokenError') {
    sendError(res, 'Invalid or expired token', HTTP_STATUS.UNAUTHORIZED);
    return;
  }

  sendError(res, errorResponse.message, HTTP_STATUS.INTERNAL_SERVER_ERROR);
};

export const notFoundHandler = (
  req: Request,
  res: Response,
  _next: NextFunction
): void => {
  sendError(res, `Route ${req.originalUrl} not found`, HTTP_STATUS.NOT_FOUND);
};
