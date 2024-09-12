import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const getAccessToken = (): string | null => localStorage.getItem('accessToken');
export const getRefreshToken = (): string | null => localStorage.getItem('refreshToken');

export const setAccessToken = (token: string) => localStorage.setItem('accessToken', token);
export const setRefreshToken = (token: string) => localStorage.setItem('refreshToken', token);

export const isTokenExpired = (token: string): boolean => {
    const payload = JSON.parse(atob(token.split('.')[1])); // Decode JWT
    const exp = payload.exp * 1000; // Convert to milliseconds
    return Date.now() > exp; // Check if the token is expired
};

export const refreshAccessToken = async (): Promise<void> => {
    const refreshToken = getRefreshToken();

    if (!refreshToken) {
        throw new Error("No refresh token available");
    }

    try {
        const response = await axios.post(`${API_URL}/auth/refresh`, { refreshToken });
        const newAccessToken = response.data.accessToken;
        setAccessToken(newAccessToken);
    } catch (error) {
        console.error('Failed to refresh access token:', error);
        throw error;
    }
};
