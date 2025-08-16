import { api } from './api';
import type { User, CreateUserData, UpdateUserData } from '@/types/user';

interface ApiUser {
  id: number;
  name: string;
  email: string;
  age?: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  source?: string;
}

// Convert API user format to frontend user format
const convertApiUser = (apiUser: ApiUser): User => ({
  id: String(apiUser.id),
  name: apiUser.name,
  email: apiUser.email,
  isActive: apiUser.isActive,
  ...(apiUser.age !== undefined && { age: apiUser.age }),
  createdAt: apiUser.createdAt,
  updatedAt: apiUser.updatedAt,
});

const getUsers = async (): Promise<User[]> => {
  try {
    const response = await api.get<ApiResponse<ApiUser[]>>('/api/users');
    
    if (!response.success) {
      throw new Error(response.message ?? 'Failed to fetch users');
    }
    
    if (!response.data) {
      throw new Error('Invalid response from server');
    }
    
    return response.data.map(convertApiUser);
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to fetch users');
  }
};

const searchUsers = async (query: string): Promise<User[]> => {
  try {
    const response = await api.get<ApiResponse<ApiUser[]>>(`/api/users?query=${encodeURIComponent(query)}`);
    if (!response.success || !response.data) throw new Error(response.message ?? 'Failed to search users');
    return response.data.map(convertApiUser);
  } catch (error) {
    if (error instanceof Error) throw error;
    throw new Error('Failed to search users');
  }
};

const createUser = async (userData: CreateUserData): Promise<User> => {
  try {
    const response = await api.post<ApiResponse<ApiUser>>('/api/users', userData);
    
    if (!response.success) {
      throw new Error(response.message ?? 'Failed to create user');
    }
    
    if (!response.data) {
      throw new Error('Invalid response from server');
    }
    
    return convertApiUser(response.data);
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to create user');
  }
};

const updateUser = async (
  id: string,
  userData: UpdateUserData,
): Promise<User> => {
  try {
    const response = await api.patch<ApiResponse<ApiUser>>(`/api/users/${id}`, userData);
    
    if (!response.success) {
      throw new Error(response.message ?? 'Failed to update user');
    }
    
    if (!response.data) {
      throw new Error('Invalid response from server');
    }
    
    return convertApiUser(response.data);
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to update user');
  }
};

const deleteUser = async (id: string): Promise<void> => {
  try {
    const response = await api.delete<ApiResponse<ApiUser>>(`/api/users/${id}`);
    
    if (!response.success) {
      throw new Error(response.message ?? 'Failed to delete user');
    }
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to delete user');
  }
};

export const userService = {
  getUsers,
  searchUsers,
  createUser,
  updateUser,
  deleteUser,
};
