export interface User {
  id: string;
  email: string;
  name: string;
}

export interface ApiResponse<T = unknown> {
  data: T;
  message?: string;
  success: boolean;
}

export interface ApiError {
  message: string;
  statusCode?: number;
  errors?: Record<string, string[]>;
}

export type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
};

export type { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from './auth.types';
