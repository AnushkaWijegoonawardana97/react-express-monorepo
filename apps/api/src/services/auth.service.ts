import { User } from '../models/User.model';
import { hashPassword, comparePassword } from '../utils/bcrypt.util';
import { generateToken } from '../utils/jwt.util';
import { AUTH_MESSAGES } from '../constants/messages';
import type { LoginInput, RegisterInput } from '../schemas/auth.schema';
import type { AuthResponse } from '../types/auth.types';

export const loginService = async (
  input: LoginInput
): Promise<AuthResponse> => {
  const user = await User.findOne({ email: input.email });

  if (!user) {
    throw new Error(AUTH_MESSAGES.INVALID_CREDENTIALS);
  }

  const isPasswordValid = await comparePassword(input.password, user.password);

  if (!isPasswordValid) {
    throw new Error(AUTH_MESSAGES.INVALID_CREDENTIALS);
  }

  const token = generateToken({
    userId: user._id.toString(),
    email: user.email,
  });

  return {
    user: {
      id: user._id.toString(),
      email: user.email,
      name: user.name,
    },
    token,
  };
};

export const registerService = async (
  input: RegisterInput
): Promise<AuthResponse> => {
  const existingUser = await User.findOne({ email: input.email });

  if (existingUser) {
    throw new Error(AUTH_MESSAGES.USER_ALREADY_EXISTS);
  }

  const hashedPassword = await hashPassword(input.password);

  const user = new User({
    email: input.email,
    password: hashedPassword,
    name: input.name,
  });

  await user.save();

  const token = generateToken({
    userId: user._id.toString(),
    email: user.email,
  });

  return {
    user: {
      id: user._id.toString(),
      email: user.email,
      name: user.name,
    },
    token,
  };
};
