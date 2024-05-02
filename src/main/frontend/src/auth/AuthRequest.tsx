import { API_URL } from "../env";

export async function handleAuthRequest(endpoint: string, payload: object) {
  try {
    const response = await fetch(`${API_URL}/${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorBody = await response.json();
      throw new Error(errorBody.message || "Authentication failed");
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error: any) {
    console.error("Authentication Error:", error);
    return { success: false, error: error.message };
  }
}
