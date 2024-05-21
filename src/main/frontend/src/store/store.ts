import { configureStore } from "@reduxjs/toolkit";
import restaurantReducer from "../slices/restaurantSlice";
import userReducer from "../slices/userSlice";
import reviewReducer from "../slices/reviewSlice";

export const store = configureStore({
  reducer: {
    restaurant: restaurantReducer,
    user: userReducer,
    reviews: reviewReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
