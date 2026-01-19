export const AUTH_MESSAGES = {
  LOGIN_SUCCESS: 'Login successful',
  REGISTER_SUCCESS: 'Registration successful',
  LOGOUT_SUCCESS: 'Logout successful',
  INVALID_CREDENTIALS: 'Invalid email or password',
  USER_ALREADY_EXISTS: 'User with this email already exists',
  USER_NOT_FOUND: 'User not found',
  TOKEN_REQUIRED: 'Authentication token required',
  TOKEN_INVALID: 'Invalid or expired token',
} as const;

export const USER_MESSAGES = {
  USER_CREATED: 'User created successfully',
  USER_UPDATED: 'User updated successfully',
  USER_DELETED: 'User deleted successfully',
  USER_FETCHED: 'User fetched successfully',
  USERS_FETCHED: 'Users fetched successfully',
  USER_NOT_FOUND: 'User not found',
} as const;
