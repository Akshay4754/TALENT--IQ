import { useEffect } from "react";
import { useAuth } from "@clerk/clerk-react";
import axiosInstance from "../lib/axios";

/**
 * Sets up an Axios request interceptor that attaches the Clerk session JWT
 * as a Bearer token on every outgoing API request.
 * Must be rendered inside <ClerkProvider>.
 */
function AuthInterceptor({ children }) {
  const { getToken } = useAuth();

  useEffect(() => {
    const interceptor = axiosInstance.interceptors.request.use(async (config) => {
      try {
        const token = await getToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      } catch {
        // If token fetch fails, proceed without auth header
      }
      return config;
    });

    return () => axiosInstance.interceptors.request.eject(interceptor);
  }, [getToken]);

  return children;
}

export default AuthInterceptor;
