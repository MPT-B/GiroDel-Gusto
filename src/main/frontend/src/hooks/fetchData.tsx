// hooks/useFetchData.js
import { useState, useEffect } from "react";
import axios from "axios";
import { getAuthToken } from "../auth/authToken";

interface FetchOptions {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: any;
  headers?: Record<string, string>;
}

export const useFetchData = (url: string, options?: FetchOptions) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const token = getAuthToken();
      const authHeaders = token ? { Authorization: `Bearer ${token}` } : {};
      const config = {
        method: options?.method || "GET",
        headers: {
          ...authHeaders,
          ...options?.headers,
          "Content-Type": "application/json",
        },
        data: options?.body ? JSON.stringify(options.body) : null,
      };

      try {
        const response = await axios(url, config);
        setData(response.data);
      } catch (error: any) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url, options]);

  return { data, isLoading, error };
};
