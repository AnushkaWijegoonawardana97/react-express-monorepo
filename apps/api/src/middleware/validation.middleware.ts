import type { Request, Response, NextFunction } from 'express';
import { z, ZodError } from 'zod';
import { sendError } from '../utils/response.util';
import { HTTP_STATUS } from '../constants';
import { API_MESSAGES } from '../constants';

export const validate = <T extends z.ZodTypeAny>(schema: T) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      const result = schema.parse({ body: req.body, params: req.params, query: req.query });
      if (result.body) {
        req.body = result.body;
      }
      if (result.params) {
        req.params = result.params;
      }
      if (result.query) {
        req.query = result.query;
      }
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errors: Record<string, string[]> = {};
        error.errors.forEach((err) => {
          const path = err.path.join('.');
          if (!errors[path]) {
            errors[path] = [];
          }
          errors[path].push(err.message);
        });

        sendError(
          res,
          API_MESSAGES.VALIDATION_ERROR,
          HTTP_STATUS.BAD_REQUEST,
          errors
        );
        return;
      }
      sendError(res, API_MESSAGES.VALIDATION_ERROR, HTTP_STATUS.BAD_REQUEST);
    }
  };
};
