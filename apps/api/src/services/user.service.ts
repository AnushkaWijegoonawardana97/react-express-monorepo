import { User } from '../models/User.model';
import { USER_MESSAGES } from '../constants/messages';
import type { CreateUserInput, UpdateUserInput } from '../schemas/user.schema';
import type { User as UserType } from '../types/user.types';

export const createUserService = async (
  input: CreateUserInput
): Promise<UserType> => {
  const existingUser = await User.findOne({ email: input.email });

  if (existingUser) {
    throw new Error('User with this email already exists');
  }

  const user = new User({
    email: input.email,
    password: input.password,
    name: input.name,
  });

  await user.save();

  return {
    id: user._id.toString(),
    email: user.email,
    name: user.name,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};

export const getUserByIdService = async (id: string): Promise<UserType> => {
  const user = await User.findById(id).select('-password');

  if (!user) {
    throw new Error(USER_MESSAGES.USER_NOT_FOUND);
  }

  return {
    id: user._id.toString(),
    email: user.email,
    name: user.name,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};

export const getAllUsersService = async (): Promise<UserType[]> => {
  const users = await User.find().select('-password');

  return users.map((user) => ({
    id: user._id.toString(),
    email: user.email,
    name: user.name,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  }));
};

export const updateUserService = async (
  id: string,
  input: UpdateUserInput
): Promise<UserType> => {
  const user = await User.findById(id);

  if (!user) {
    throw new Error(USER_MESSAGES.USER_NOT_FOUND);
  }

  if (input.name) {
    user.name = input.name;
  }

  if (input.email) {
    user.email = input.email;
  }

  await user.save();

  return {
    id: user._id.toString(),
    email: user.email,
    name: user.name,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};

export const deleteUserService = async (id: string): Promise<void> => {
  const user = await User.findByIdAndDelete(id);

  if (!user) {
    throw new Error(USER_MESSAGES.USER_NOT_FOUND);
  }
};
