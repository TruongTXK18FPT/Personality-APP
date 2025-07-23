// types/auth.ts
export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export interface UserProfile {
    email: string;
    fullName: string;
    role: number;
}

export interface LoginResponse {
    token: string;
    message: string;
    userProfile: UserProfile;
}

export interface LogoutResponse {
    message: string;
    success: boolean;
    email: string;
}

export interface ApiError {
    message: string;
    status?: number;
}

// services/authApi.ts
const BASE_URL = 'http://localhost:8080/api/auth'; // Replace with your actual backend URL

class AuthApiService {
    private async handleResponse<T>(response: Response): Promise<T> {
        if (!response.ok) {
            const errorText = await response.text();
            let errorMessage = 'An error occurred';

            try {
                const errorJson = JSON.parse(errorText);
                errorMessage = errorJson.message || errorMessage;
            } catch {
                errorMessage = errorText || `HTTP ${response.status}`;
            }

            throw new Error(errorMessage);
        }

        const data = await response.json();
        return data;
    }

    async login(loginData: LoginRequest): Promise<LoginResponse> {
        try {
            const response = await fetch(`${BASE_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData),
            });

            return await this.handleResponse<LoginResponse>(response);
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    }

    async register(registerData: RegisterRequest): Promise<string> {
        try {
            const response = await fetch(`${BASE_URL}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(registerData),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || `HTTP ${response.status}`);
            }

            return await response.text(); // Returns "Registration successful"
        } catch (error) {
            console.error('Register error:', error);
            throw error;
        }
    }

    async logout(token: string): Promise<LogoutResponse> {
        try {
            const response = await fetch(`${BASE_URL}/logout`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            return await this.handleResponse<LogoutResponse>(response);
        } catch (error) {
            console.error('Logout error:', error);
            throw error;
        }
    }

    async getUserProfile(token: string): Promise<UserProfile> {
        try {
            const response = await fetch(`${BASE_URL}/profile`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            return await this.handleResponse<UserProfile>(response);
        } catch (error) {
            console.error('Get profile error:', error);
            throw error;
        }
    }
}

export const authApi = new AuthApiService();

// context/AuthContext.tsx - Updated version with the API calls
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authApi } from '../services/authApi';
import type { UserProfile, LoginRequest, RegisterRequest } from '../types/auth';

interface AuthContextType {
    user: UserProfile | null;
    token: string | null;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (fullName: string, email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const TOKEN_KEY = 'auth_token';
const USER_KEY = 'user_profile';

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<UserProfile | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const isAuthenticated = !!token && !!user;

    useEffect(() => {
        loadStoredAuth();
    }, []);

    const loadStoredAuth = async () => {
        try {
            const [storedToken, storedUser] = await Promise.all([
                AsyncStorage.getItem(TOKEN_KEY),
                AsyncStorage.getItem(USER_KEY),
            ]);

            if (storedToken && storedUser) {
                setToken(storedToken);
                setUser(JSON.parse(storedUser));
            }
        } catch (error) {
            console.error('Error loading stored auth:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const login = async (email: string, password: string) => {
        try {
            setIsLoading(true);
            const loginData: LoginRequest = { email, password };
            const response = await authApi.login(loginData);

            setToken(response.token);
            setUser(response.userProfile);

            // Store in AsyncStorage
            await Promise.all([
                AsyncStorage.setItem(TOKEN_KEY, response.token),
                AsyncStorage.setItem(USER_KEY, JSON.stringify(response.userProfile)),
            ]);
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const register = async (fullName: string, email: string, password: string) => {
        try {
            setIsLoading(true);
            const registerData: RegisterRequest = {
                fullName,
                email,
                password,
                confirmPassword: password, // Assuming frontend already validated this
            };

            await authApi.register(registerData);

            // After successful registration, automatically log in
            await login(email, password);
        } catch (error) {
            console.error('Registration failed:', error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const logout = async () => {
        try {
            setIsLoading(true);

            if (token) {
                // Call backend logout endpoint
                await authApi.logout(token);
            }
        } catch (error) {
            console.error('Logout error:', error);
            // Continue with local logout even if backend call fails
        } finally {
            // Clear local state and storage
            setToken(null);
            setUser(null);

            await Promise.all([
                AsyncStorage.removeItem(TOKEN_KEY),
                AsyncStorage.removeItem(USER_KEY),
            ]);

            setIsLoading(false);
        }
    };

    const value: AuthContextType = {
        user,
        token,
        isLoading,
        login,
        register,
        logout,
        isAuthenticated,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
            </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

// hooks/useAuthAPI.ts - Alternative hook-based approach
import { useState } from 'react';
import { authApi } from '../services/authApi';
import type { LoginRequest, RegisterRequest, UserProfile } from '../types/auth';

export function useAuthAPI() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const loginUser = async (loginData: LoginRequest) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await authApi.login(loginData);
            return response;
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Login failed';
            setError(errorMessage);
            throw new Error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    const registerUser = async (registerData: RegisterRequest) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await authApi.register(registerData);
            return response;
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Registration failed';
            setError(errorMessage);
            throw new Error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    const logoutUser = async (token: string) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await authApi.logout(token);
            return response;
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Logout failed';
            setError(errorMessage);
            throw new Error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    const getUserProfile = async (token: string) => {
        setIsLoading(true);
        setError(null);
        try {
            const profile = await authApi.getUserProfile(token);
            return profile;
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to get profile';
            setError(errorMessage);
            throw new Error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        loginUser,
        registerUser,
        logoutUser,
        getUserProfile,
        isLoading,
        error,
    };
}