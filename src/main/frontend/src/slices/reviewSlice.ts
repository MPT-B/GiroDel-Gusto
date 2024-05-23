// src/slices/reviewSlice.ts
import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  createAction,
} from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store/store";
import { Review } from "../models/review.model";
import { getAuthToken } from "../auth/authToken";
import { API_URL } from "../env";

interface ReviewState {
  reviews: Review[];
  friendReviews: Review[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ReviewState = {
  reviews: [],
  friendReviews: [],
  status: "idle",
  error: null,
};

export const reviewAdded = createAction<Review>("reviews/reviewAdded");

export const fetchReviews = createAsyncThunk<Review[]>(
  "reviews/fetchReviews",
  async () => {
    const response = await axios.get(`${API_URL}/reviews`, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });
    return response.data;
  }
);

export const fetchFriendReviews = createAsyncThunk<Review[], number>(
  "reviews/fetchFriendReviews",
  async (userId, { dispatch }) => {
    const response = await axios.get(`${API_URL}/reviews/friends/${userId}`, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });
    return response.data;
  }
);

export const addReview = createAsyncThunk<
  Review,
  Omit<Review, "id" | "user" | "restaurant">
>("reviews/addReview", async (review, { dispatch }) => {
  const token = localStorage.getItem("auth_token");
  const response = await axios.post(
    "http://localhost:8080/reviews/add",
    review,
    {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    }
  );
  dispatch(fetchReviews());
  return response.data;
});

export const deleteReview = createAsyncThunk<{ id: number }, number>(
  "reviews/deleteReview",
  async (reviewId, { dispatch }) => {
    await axios.delete(`http://localhost:8080/reviews/remove/${reviewId}`);
    dispatch(fetchReviews());
    return { id: reviewId };
  }
);

const reviewSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviews.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchReviews.fulfilled,
        (state, action: PayloadAction<Review[]>) => {
          state.status = "succeeded";
          state.reviews = action.payload;
        }
      )
      .addCase(fetchReviews.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch reviews";
      })
      .addCase(addReview.fulfilled, (state, action: PayloadAction<Review>) => {
        state.reviews.push(action.payload);
      })
      .addCase(
        fetchFriendReviews.fulfilled,
        (state, action: PayloadAction<Review[]>) => {
          state.status = "succeeded";
          state.friendReviews = action.payload;
        }
      )
      .addCase(
        deleteReview.fulfilled,
        (state, action: PayloadAction<{ id: number }>) => {
          state.reviews = state.reviews.filter(
            (review) => review.id !== action.payload.id
          );
          state.friendReviews = state.friendReviews.filter(
            (review) => review.id !== action.payload.id
          );
        }
      );
  },
});

export default reviewSlice.reducer;
