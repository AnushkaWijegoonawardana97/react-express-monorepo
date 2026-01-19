import { loginService, registerService } from '../services/auth.service';
import { sendSuccess } from '../utils/response.util';
import { HTTP_STATUS } from '../constants';
import { AUTH_MESSAGES } from '../constants/messages';
import type { LoginInput, RegisterInput } from '../schemas/auth.schema';
import type { AsyncRequestHandler } from '../types';

export const login: AsyncRequestHandler = async (req, res, next) => {
  try {
    const input: LoginInput = req.body;
    const result = await loginService(input);
    sendSuccess(res, result, AUTH_MESSAGES.LOGIN_SUCCESS);
  } catch (error) {
    next(error);
  }
};

export const register: AsyncRequestHandler = async (req, res, next) => {
  try {
    const input: RegisterInput = req.body;
    const result = await registerService(input);
    sendSuccess(res, result, AUTH_MESSAGES.REGISTER_SUCCESS, HTTP_STATUS.CREATED);
  } catch (error) {
    next(error);
  }
};

export const logout: AsyncRequestHandler = async (_req, res, next) => {
  try {
    sendSuccess(res, null, AUTH_MESSAGES.LOGOUT_SUCCESS);
  } catch (error) {
    next(error);
  }
};
