export interface User {
  id: string;
  email: string;
  name: string;
  password?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CreateUserRequest {
  email: string;
  password: string;
  name: string;
}

export interface UpdateUserRequest {
  name?: string;
  email?: string;
}
