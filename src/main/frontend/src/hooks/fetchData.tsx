// hooks/useFetchData.js
import { useState, useEffect } from "react";
import axios from "axios";
import { getAuthToken } from "../auth/authToken";

/**
 * Custom hook for fetching data with authorization token.
 * @param {string} url The URL to fetch from.
 */
export const useFetchData = (url: string) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = getAuthToken();
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    axios
      .get(url, { headers })
      .then((response) => setData(response.data))
      .catch((error) => setError(error));
  }, [url]);

  return { data, error };
};
