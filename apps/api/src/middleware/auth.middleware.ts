import type { Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt.util';
import { sendError } from '../utils/response.util';
import { HTTP_STATUS } from '../constants';
import { AUTH_MESSAGES } from '../constants/messages';
import type { AuthRequest } from '../types';

export const authenticate = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      sendError(res, AUTH_MESSAGES.TOKEN_REQUIRED, HTTP_STATUS.UNAUTHORIZED);
      return;
    }

    const token = authHeader.substring(7);
    const decoded = verifyToken(token);

    req.user = {
      id: decoded.userId,
      email: decoded.email,
      name: decoded.email.split('@')[0],
    };

    next();
  } catch (error) {
    sendError(res, AUTH_MESSAGES.TOKEN_INVALID, HTTP_STATUS.UNAUTHORIZED);
  }
};
