import axios, { AxiosError } from "axios";
import type { AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from "axios";

const API_BASE_URL = "https://your-backend.com/api";

const backendApiRepository = axios.create({
  baseURL: API_BASE_URL,
});

interface RefreshResponse {
  accessToken: string;
}

// Store the refresh request state to prevent multiple refresh attempts
let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

// Function to notify all subscribers when a new token is available
const onTokenRefreshed = (newToken: string): void => {
  refreshSubscribers.forEach((callback) => callback(newToken));
  refreshSubscribers = [];
};

// Attach Access Token to Requests
backendApiRepository.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken && config.headers) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

// Handle Token Expiry and Refresh
backendApiRepository.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (!isRefreshing) {
        isRefreshing = true;
        try {
          const refreshToken = localStorage.getItem("refresh_token");

          if (!refreshToken) {
            throw new Error("No refresh token available.");
          }

          const res = await axios.post<RefreshResponse>(`${API_BASE_URL}/auth/refresh-token`, {
            refreshToken,
          });

          const newAccessToken = res.data.accessToken;
          localStorage.setItem("access_token", newAccessToken);

          isRefreshing = false;
          onTokenRefreshed(newAccessToken);
        } catch (refreshError) {
          isRefreshing = false;
          console.error("Token refresh failed, logging out...");
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          window.location.href = "/login"; // Redirect to login
          return Promise.reject(refreshError);
        }
      }

      // Queue failed requests while refreshing
      return new Promise((resolve) => {
        refreshSubscribers.push((newToken: string) => {
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
          }
          resolve(backendApiRepository(originalRequest));
        });
      });
    } else if (error.response?.status === 403) {
      console.error("403 Forbidden: You do not have permission to access this resource.");
    } else if (error.response?.status === 404) {
      console.error("404 Not Found: The requested resource was not found.");
    } else if (error.response && error.response.status >= 500) {
      console.error("Server Error: Please try again later.");
    } else {
      console.error("Network error or no response from server.");
      alert("Network error. Please check your internet connection.");
    }

    return Promise.reject(error);
  }
);

export default backendApiRepository;
