import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  id: number;
  username: string;
  role: string;
}

const initialState: UserState = {
  id: 0,
  username: "",
  role: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserState>) {
      state.id = action.payload.id;
      state.username = action.payload.username;
      state.role = action.payload.role;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
