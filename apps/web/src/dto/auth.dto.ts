import type { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from '../types/auth.types';
import type { User } from '../types';
import { validateEmail, validatePassword } from '../utils';

export class LoginRequestDto {
  email: string;
  password: string;

  constructor(data: LoginRequest) {
    this.email = data.email.trim().toLowerCase();
    this.password = data.password;
  }

  static fromJSON(data: unknown): LoginRequestDto {
    if (!data || typeof data !== 'object') {
      throw new Error('Invalid login request data');
    }

    const obj = data as Record<string, unknown>;
    if (!obj.email || typeof obj.email !== 'string') {
      throw new Error('Email is required');
    }
    if (!obj.password || typeof obj.password !== 'string') {
      throw new Error('Password is required');
    }

    return new LoginRequestDto({
      email: obj.email,
      password: obj.password,
    });
  }

  validate(): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!this.email) {
      errors.push('Email is required');
    } else if (!validateEmail(this.email)) {
      errors.push('Invalid email format');
    }

    if (!this.password) {
      errors.push('Password is required');
    } else if (!validatePassword(this.password)) {
      errors.push('Password must be at least 8 characters');
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  toJSON(): LoginRequest {
    return {
      email: this.email,
      password: this.password,
    };
  }
}

export class RegisterRequestDto {
  email: string;
  password: string;
  name: string;

  constructor(data: RegisterRequest) {
    this.email = data.email.trim().toLowerCase();
    this.password = data.password;
    this.name = data.name.trim();
  }

  static fromJSON(data: unknown): RegisterRequestDto {
    if (!data || typeof data !== 'object') {
      throw new Error('Invalid register request data');
    }

    const obj = data as Record<string, unknown>;
    if (!obj.email || typeof obj.email !== 'string') {
      throw new Error('Email is required');
    }
    if (!obj.password || typeof obj.password !== 'string') {
      throw new Error('Password is required');
    }
    if (!obj.name || typeof obj.name !== 'string') {
      throw new Error('Name is required');
    }

    return new RegisterRequestDto({
      email: obj.email,
      password: obj.password,
      name: obj.name,
    });
  }

  validate(): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!this.email) {
      errors.push('Email is required');
    } else if (!validateEmail(this.email)) {
      errors.push('Invalid email format');
    }

    if (!this.password) {
      errors.push('Password is required');
    } else if (!validatePassword(this.password)) {
      errors.push('Password must be at least 8 characters');
    }

    if (!this.name) {
      errors.push('Name is required');
    } else if (this.name.length < 2) {
      errors.push('Name must be at least 2 characters');
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  toJSON(): RegisterRequest {
    return {
      email: this.email,
      password: this.password,
      name: this.name,
    };
  }
}

export class LoginResponseDto {
  user: User;
  token: string;

  constructor(data: LoginResponse) {
    this.user = data.user;
    this.token = data.token;
  }

  static fromJSON(data: unknown): LoginResponseDto {
    if (!data || typeof data !== 'object') {
      throw new Error('Invalid login response data');
    }

    const obj = data as Record<string, unknown>;
    if (!obj.user || typeof obj.user !== 'object') {
      throw new Error('User is required');
    }
    if (!obj.token || typeof obj.token !== 'string') {
      throw new Error('Token is required');
    }

    const user = obj.user as Record<string, unknown>;
    if (!user.id || typeof user.id !== 'string') {
      throw new Error('User ID is required');
    }
    if (!user.email || typeof user.email !== 'string') {
      throw new Error('User email is required');
    }
    if (!user.name || typeof user.name !== 'string') {
      throw new Error('User name is required');
    }

    return new LoginResponseDto({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      token: obj.token,
    });
  }

  toJSON(): LoginResponse {
    return {
      user: this.user,
      token: this.token,
    };
  }
}

export class RegisterResponseDto {
  user: User;
  token: string;

  constructor(data: RegisterResponse) {
    this.user = data.user;
    this.token = data.token;
  }

  static fromJSON(data: unknown): RegisterResponseDto {
    if (!data || typeof data !== 'object') {
      throw new Error('Invalid register response data');
    }

    const obj = data as Record<string, unknown>;
    if (!obj.user || typeof obj.user !== 'object') {
      throw new Error('User is required');
    }
    if (!obj.token || typeof obj.token !== 'string') {
      throw new Error('Token is required');
    }

    const user = obj.user as Record<string, unknown>;
    if (!user.id || typeof user.id !== 'string') {
      throw new Error('User ID is required');
    }
    if (!user.email || typeof user.email !== 'string') {
      throw new Error('User email is required');
    }
    if (!user.name || typeof user.name !== 'string') {
      throw new Error('User name is required');
    }

    return new RegisterResponseDto({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      token: obj.token,
    });
  }

  toJSON(): RegisterResponse {
    return {
      user: this.user,
      token: this.token,
    };
  }
}
