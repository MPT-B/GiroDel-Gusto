import axios from "axios";
import { getAuthToken } from "./AuthToken";
import { API_URL } from "../env";

type User = {
  id: number;
  username: string;
};

async function fetchUserDetails(): Promise<User | null> {
  try {
    const response = await axios.get<User>(`${API_URL}/users/me`, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
}

export { fetchUserDetails, User };
