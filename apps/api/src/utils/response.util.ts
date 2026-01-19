import type { Response } from 'express';
import { HTTP_STATUS } from '../constants';
import type { ApiResponse } from '../types';

export const sendSuccess = <T>(
  res: Response,
  data: T,
  message = 'Operation successful',
  statusCode: number = HTTP_STATUS.OK
): void => {
  const response: ApiResponse<T> = {
    success: true,
    message,
    data,
  };
  res.status(statusCode).json(response);
};

export const sendError = (
  res: Response,
  message: string,
  statusCode: number = HTTP_STATUS.INTERNAL_SERVER_ERROR,
  errors?: Record<string, string[]>
): void => {
  const response: ApiResponse = {
    success: false,
    message,
    errors,
  };
  res.status(statusCode).json(response);
};
