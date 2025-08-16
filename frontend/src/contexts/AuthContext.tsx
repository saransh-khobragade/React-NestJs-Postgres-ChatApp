import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '@/services/authService';
import type {
  User,
  LoginCredentials,
  SignupCredentials,
  AuthContextType,
} from '@/types/auth';

const defaultAuthContext: AuthContextType = {
  user: null,
  login: () => {
    throw new Error('AuthContext not initialized');
  },
  signup: () => {
    throw new Error('AuthContext not initialized');
  },
  logout: () => {
    throw new Error('AuthContext not initialized');
  },
  isLoading: true,
};

export const AuthContext = createContext<AuthContextType>(defaultAuthContext);

export const useAuth = (): AuthContextType => {
  return useContext(AuthContext);
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Set loading to false on mount (no persistence)
  useEffect(() => {
    setIsLoading(false);
  }, []);

  const login = async (credentials: LoginCredentials): Promise<void> => {
    setIsLoading(true);
    try {
      const user = await authService.login(credentials);
      setUser(user);
    } catch (error) {
      // Provide more specific error messages
      if (error instanceof Error) {
        throw new Error(error.message || 'Invalid email or password');
      }
      throw new Error('Login failed. Please check your credentials and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (credentials: SignupCredentials): Promise<void> => {
    setIsLoading(true);
    try {
      const user = await authService.signup(credentials);
      setUser(user);
    } catch (error) {
      // Provide more specific error messages
      if (error instanceof Error) {
        throw new Error(error.message || 'Failed to create account');
      }
      throw new Error('Signup failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = (): void => {
    setUser(null);
    try {
      localStorage.removeItem('token');
    } catch {
      // ignore
    }
  };

  const value: AuthContextType = {
    user,
    login,
    signup,
    logout,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
