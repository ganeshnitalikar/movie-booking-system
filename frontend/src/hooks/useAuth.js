import { useDispatch, useSelector } from "react-redux"
import { 
    clearError, 
    loginFailure, 
    loginStart, 
    loginSuccess, 
    registerStart,
    registerSuccess,
    registerFailure,
    logout,
    refreshToken
} from "../redux/slices/authSlice";

import { buildApiUrl, getAuthHeaders, API_CONFIG } from '../config/api';

// Helper function to make API calls
const apiCall = async (endpoint, options = {}) => {
    const url = buildApiUrl(endpoint);
    const config = {
        headers: {
            ...API_CONFIG.DEFAULT_HEADERS,
            ...options.headers,
        },
        ...options,
    };

    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'An error occurred');
    }

    return data;
};

export const useAuth = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const token = useSelector((state) => state.auth.token);
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const loading = useSelector((state) => state.auth.loading);
    const error = useSelector((state) => state.auth.error);


    // Login function
    const login = async (credentials) => {
        try {
            dispatch(loginStart());
            
            // TODO: Replace with real API call when backend is ready
            // const response = await apiCall(API_CONFIG.ENDPOINTS.AUTH.LOGIN, {
            //     method: 'POST',
            //     body: JSON.stringify(credentials),
            // });
            
            // Mock response for now - replace with real API call
            const mockResponse = {
                success: true,
                user: {
                    id: 1,
                    email: credentials.email,
                    name: credentials.email.split('@')[0], // Use email prefix as name
                    role: credentials.email.includes('admin') ? 'admin' : 
                          credentials.email.includes('owner') ? 'owner' : 'user'
                },
                token: 'mock-jwt-token-' + Date.now() // Mock JWT token
            };

            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 1000));

            if (mockResponse.success) {
                dispatch(loginSuccess({
                    user: mockResponse.user,
                    token: mockResponse.token
                }));
                return { success: true, user: mockResponse.user };
            } else {
                throw new Error('Login failed');
            }
        } catch (error) {
            dispatch(loginFailure(error.message));
            return { success: false, error: error.message };
        }
    };

    // Register function
    const register = async (userData) => {
        try {
            dispatch(registerStart());
            
            // TODO: Replace with real API call when backend is ready
            // const response = await apiCall(API_CONFIG.ENDPOINTS.AUTH.REGISTER, {
            //     method: 'POST',
            //     body: JSON.stringify(userData),
            // });
            
            // Mock response for now - replace with real API call
            const mockResponse = {
                success: true,
                user: {
                    id: Date.now(),
                    email: userData.email,
                    name: userData.name,
                    role: 'user' // Default role for new users
                },
                token: 'mock-jwt-token-' + Date.now() // Mock JWT token
            };

            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 1000));

            if (mockResponse.success) {
                dispatch(registerSuccess({
                    user: mockResponse.user,
                    token: mockResponse.token
                }));
                return { success: true, user: mockResponse.user };
            } else {
                throw new Error('Registration failed');
            }
        } catch (error) {
            dispatch(registerFailure(error.message));
            return { success: false, error: error.message };
        }
    };

    // Logout function
    const logoutUser = () => {
        dispatch(logout());
    };

    // Clear error function
    const clearAuthError = () => {
        dispatch(clearError());
    };

    // Refresh token function
    const refreshAuthToken = async () => {
        try {
            if (!token) return false;
            
            // TODO: Replace with real API call when backend is ready
            // const response = await apiCall(API_CONFIG.ENDPOINTS.AUTH.REFRESH, {
            //     method: 'POST',
            //     headers: getAuthHeaders(token)
            // });
            
            // Mock token refresh
            const newToken = 'refreshed-jwt-token-' + Date.now();
            dispatch(refreshToken(newToken));
            return true;
        } catch (error) {
            // If refresh fails, logout user
            dispatch(logout());
            return false;
        }
    };

    // Get auth headers for API calls
    const getAuthHeadersForApi = () => {
        return getAuthHeaders(token);
    };

    return {
        user,
        token,
        isAuthenticated,
        loading,
        error,
        login,
        register,
        logout: logoutUser,
        clearError: clearAuthError,
        refreshToken: refreshAuthToken,
        getAuthHeaders: getAuthHeadersForApi
    };
};
