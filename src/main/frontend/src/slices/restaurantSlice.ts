import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../env";
import { Restaurant } from "../models/restaurant.model";

interface RestaurantState {
  restaurants: Restaurant[];
  favoriteRestaurants: Restaurant[];
  bestInTownRestaurants: Restaurant[];
  nearestRestaurants: Restaurant[];
}

const initialState: RestaurantState = {
  restaurants: [],
  favoriteRestaurants: [],
  bestInTownRestaurants: [],
  nearestRestaurants: [],
};

export const fetchRestaurants = createAsyncThunk(
  "restaurant/fetchRestaurants",
  async () => {
    const response = await axios.get(`${API_URL}/restaurants`);
    return response.data;
  }
);

export const fetchBestInTownRestaurants = createAsyncThunk(
  "restaurant/fetchBestInTownRestaurants",
  async (city: string) => {
    const response = await axios.get(`${API_URL}/restaurants/town/${city}`);
    return response.data;
  }
);

export const fetchFavoriteRestaurants = createAsyncThunk(
  "restaurant/fetchFavoriteRestaurants",
  async (userId: string) => {
    const response = await axios.get(
      `${API_URL}/favoriteRestaurants/user/${userId}`
    );
    return response.data;
  }
);

const restaurantSlice = createSlice({
  name: "restaurant",
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<number>) => {
      const restaurant = state.restaurants.find(
        (restaurant) => restaurant.id === action.payload
      );
      if (restaurant) {
        const isFavorite = state.favoriteRestaurants.some(
          (fav) => fav.id === restaurant.id
        );
        if (isFavorite) {
          state.favoriteRestaurants = state.favoriteRestaurants.filter(
            (fav) => fav.id !== restaurant.id
          );
        } else {
          state.favoriteRestaurants.push(restaurant);
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchRestaurants.fulfilled, (state, action) => {
      state.restaurants = action.payload;
    });
    builder.addCase(fetchBestInTownRestaurants.fulfilled, (state, action) => {
      state.bestInTownRestaurants = action.payload;
    });
    builder.addCase(fetchFavoriteRestaurants.fulfilled, (state, action) => {
      state.favoriteRestaurants = action.payload;
    });
  },
});

export const { toggleFavorite } = restaurantSlice.actions;
export default restaurantSlice.reducer;
