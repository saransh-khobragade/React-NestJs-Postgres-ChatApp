export interface User {
  id: string;
  name: string;
  password?: string;
  email: string;
  age?: number;
  isActive?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserData {
  name: string;
  email: string;
  password?: string | undefined;
  age?: number | undefined;
  isActive?: boolean | undefined;
}

export interface UpdateUserData {
  name?: string;
  email?: string;
  age?: number | undefined;
  isActive?: boolean | undefined;
}
