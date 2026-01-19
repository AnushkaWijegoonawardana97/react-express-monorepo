import axios, { AxiosError } from 'axios';
import type { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { API_BASE_URL } from '../constants/api';
import type { ApiError } from '../types';

const createAxiosInstance = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = localStorage.getItem('auth_token');
      
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },
    (error: AxiosError) => {
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error: AxiosError<ApiError>) => {
      if (error.response) {
        const apiError: ApiError = {
          message: error.response.data?.message || 'An error occurred',
          statusCode: error.response.status,
          errors: error.response.data?.errors,
        };

        if (error.response.status === 401) {
          localStorage.removeItem('auth_token');
          window.location.href = '/login';
        }

        return Promise.reject(apiError);
      }

      if (error.request) {
        const apiError: ApiError = {
          message: 'Network error. Please check your connection.',
        };
        return Promise.reject(apiError);
      }

      const apiError: ApiError = {
        message: error.message || 'An unexpected error occurred',
      };
      return Promise.reject(apiError);
    }
  );

  return instance;
};

export const apiClient = createAxiosInstance();
