import { useEffect, useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import axiosInstance from "../lib/axios";

/**
 * Sets up an Axios request interceptor that attaches the Clerk session JWT
 * as a Bearer token on every outgoing API request.
 * Must be rendered inside <ClerkProvider>.
 */
function AuthInterceptor({ children }) {
  const { getToken } = useAuth();
  const [isInterceptorReady, setIsInterceptorReady] = useState(false);

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

    setIsInterceptorReady(true);

    return () => {
      axiosInstance.interceptors.request.eject(interceptor);
      setIsInterceptorReady(false);
    };
  }, [getToken]);

  if (!isInterceptorReady) return null;

  return children;
}

export default AuthInterceptor;
