import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  userId: string | null;
}

const initialState: UserState = {
  userId: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<string>) => {
      state.userId = action.payload;
    },
    clearUser: (state) => {
      state.userId = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
