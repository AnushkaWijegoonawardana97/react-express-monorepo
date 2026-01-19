import { apiClient } from '../config/axios';
import { LoginRequestDto, RegisterRequestDto, LoginResponseDto, RegisterResponseDto } from '../dto/auth.dto';
import type { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from '../types';
import type { ApiResponse } from '../types';

export const authService = {
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    const dto = new LoginRequestDto(credentials);
    const validation = dto.validate();
    
    if (!validation.isValid) {
      throw new Error(validation.errors.join(', '));
    }

    const response = await apiClient.post<ApiResponse<LoginResponse>>(
      '/auth/login',
      dto.toJSON()
    );
    
    return LoginResponseDto.fromJSON(response.data.data).toJSON();
  },

  register: async (data: RegisterRequest): Promise<RegisterResponse> => {
    const dto = new RegisterRequestDto(data);
    const validation = dto.validate();
    
    if (!validation.isValid) {
      throw new Error(validation.errors.join(', '));
    }

    const response = await apiClient.post<ApiResponse<RegisterResponse>>(
      '/auth/register',
      dto.toJSON()
    );
    
    return RegisterResponseDto.fromJSON(response.data.data).toJSON();
  },

  logout: async (): Promise<void> => {
    await apiClient.post('/auth/logout');
  },

  getCurrentUser: async () => {
    const response = await apiClient.get<ApiResponse>('/auth/me');
    return response.data.data;
  },
};
