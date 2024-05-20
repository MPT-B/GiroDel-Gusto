import axios from "axios";
import { API_URL } from "../env";

// export async function handleAuthRequest(endpoint: string, payload: object) {
//   console.log(payload);
//   try {
//     const response = await fetch(`${API_URL}/${endpoint}`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Accept: "application/json",
//       },
//       body: JSON.stringify(payload),
//     });

//     if (!response.ok) {
//       console.log(response);
//       const errorBody = await response.json();
//       throw new Error(errorBody.message || "Authentication failed");
//     }
//     const data = await response.json();
//     console.log(data);

//     return { success: true, data };
//   } catch (error: any) {
//     console.error("Authentication Error:", error);
//     return { success: false, error: error.message };
//   }
// }import axios from 'axios';

export async function handleAuthRequest(endpoint: string, payload: object) {
  try {
    const response = await axios.post(`${API_URL}/${endpoint}`, payload, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    if (!response.status) {
      const errorBody = await response.data.json();
      throw new Error(errorBody.message || "Authentication failed");
    }

    return { success: true, data: response.data };
  } catch (error: any) {
    console.error("Authentication Error:", error);

    let errorMessage;
    if (error.response) {
      const errorBody = error.response.data;
      errorMessage =
        typeof errorBody === "object" && errorBody.error
          ? errorBody.error
          : JSON.stringify(errorBody);

      if (errorMessage === "Unknown user") {
        errorMessage = "Invalid username or password";
      } else if (errorMessage === "Username already exists") {
        errorMessage = "Username already exists. Please try a different one.";
      }
    } else {
      errorMessage = "Authentication failed";
    }

    return { success: false, error: errorMessage };
  }
}
