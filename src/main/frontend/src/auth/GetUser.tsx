import axios from "axios";
import { getAuthToken } from "./authToken";
import { API_URL } from "../env";
import { setUser } from "../slices/userSlice";
import { useDispatch } from "react-redux";

type User = {
  id: number;
  username: string;
  role: string;
};

async function fetchUserDetails(
  dispatch: React.Dispatch<any>
): Promise<User | null> {
  try {
    const response = await axios.get<User>(`${API_URL}/users/me`, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });

    dispatch(setUser(response.data));

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
}

export { fetchUserDetails, User };
