export interface UserRequest {
  email: string;
  password: string;
}

export interface UserResponse {
  message: string;
  user: User;
}

export interface User {
  token: string;
  email: string;
}
