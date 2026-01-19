import {
  createUserService,
  getUserByIdService,
  getAllUsersService,
  updateUserService,
  deleteUserService,
} from '../services/user.service';
import { sendSuccess } from '../utils/response.util';
import { HTTP_STATUS } from '../constants';
import { USER_MESSAGES } from '../constants/messages';
import type { CreateUserInput, UpdateUserInput } from '../schemas/user.schema';
import type { AsyncRequestHandler } from '../types';

export const createUser: AsyncRequestHandler = async (req, res, next) => {
  try {
    const input: CreateUserInput = req.body;
    const result = await createUserService(input);
    sendSuccess(res, result, USER_MESSAGES.USER_CREATED, HTTP_STATUS.CREATED);
  } catch (error) {
    next(error);
  }
};

export const getUserById: AsyncRequestHandler = async (req, res, next) => {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    if (!id) {
      throw new Error('User ID is required');
    }
    const result = await getUserByIdService(id);
    sendSuccess(res, result, USER_MESSAGES.USER_FETCHED);
  } catch (error) {
    next(error);
  }
};

export const getAllUsers: AsyncRequestHandler = async (_req, res, next) => {
  try {
    const result = await getAllUsersService();
    sendSuccess(res, result, USER_MESSAGES.USERS_FETCHED);
  } catch (error) {
    next(error);
  }
};

export const updateUser: AsyncRequestHandler = async (req, res, next) => {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    if (!id) {
      throw new Error('User ID is required');
    }
    const input: UpdateUserInput = req.body;
    const result = await updateUserService(id, input);
    sendSuccess(res, result, USER_MESSAGES.USER_UPDATED);
  } catch (error) {
    next(error);
  }
};

export const deleteUser: AsyncRequestHandler = async (req, res, next) => {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    if (!id) {
      throw new Error('User ID is required');
    }
    await deleteUserService(id);
    sendSuccess(res, null, USER_MESSAGES.USER_DELETED);
  } catch (error) {
    next(error);
  }
};
