import React, { useEffect } from "react";
import RestaurantCard from "../components/RestaurantCard";
import { Grid, Typography, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchRestaurants,
  fetchFavoriteRestaurants,
  fetchBestInTownRestaurants,
} from "../slices/restaurantSlice";
import { RootState, AppDispatch } from "../store/store";

const Main: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { restaurants, favoriteRestaurants, bestInTownRestaurants } =
    useSelector((state: RootState) => state.restaurant);
  const [currentCity, setCurrentCity] = React.useState<string>("Town");
  const userId = useSelector((state: RootState) => state.user.id);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;

      fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
      )
        .then((response) => response.json())
        .then((data) => {
          const city =
            data.address.city || data.address.town || data.address.village;
          setCurrentCity(city);
        })
        .catch((error) => console.error(error));
    });
  }, []);

  useEffect(() => {
    dispatch(fetchRestaurants());
    if (userId) {
      dispatch(fetchFavoriteRestaurants(userId));
    }
    dispatch(fetchBestInTownRestaurants(currentCity));
  }, [dispatch, userId, currentCity]);

  return (
    <Grid
      container
      spacing={2}
      style={{
        justifyContent: "center",
        marginTop: "12vh",
        paddingInline: "3rem",
      }}
    >
      <Typography variant="h4">Restaurants</Typography>
      <Box sx={{ display: "flex", overflowX: "auto", width: "100%" }}>
        {restaurants.length > 0 ? (
          restaurants.map((restaurant, index) => (
            <Box key={index} sx={{ flex: "0 0 auto", marginRight: 2 }}>
              <RestaurantCard
                title={restaurant.name}
                subheader={`${restaurant.location.address}, ${restaurant.location.city}`}
                imagePath={restaurant.imagePath}
                restaurantId={restaurant.id}
                averageRating={restaurant.averageRating}
              />
            </Box>
          ))
        ) : (
          <Typography variant="h6" style={{ margin: "20px" }}>
            No nearest restaurants found.
          </Typography>
        )}
      </Box>
      <Typography variant="h4">Favorite</Typography>
      <Box sx={{ display: "flex", overflowX: "auto", width: "100%" }}>
        {favoriteRestaurants.length > 0 ? (
          favoriteRestaurants.map((restaurant, index) => (
            <Box key={index} sx={{ flex: "0 0 auto", marginRight: 2 }}>
              <RestaurantCard
                title={restaurant.name}
                subheader={`${restaurant.location.address}, ${restaurant.location.city}`}
                imagePath={restaurant.imagePath}
                restaurantId={restaurant.id}
                averageRating={restaurant.averageRating}
              />
            </Box>
          ))
        ) : (
          <Typography variant="h6" style={{ margin: "20px" }}>
            No favorite restaurants found.
          </Typography>
        )}
      </Box>

      <Typography variant="h4">Best In {currentCity}</Typography>
      <Box sx={{ display: "flex", overflowX: "auto", width: "100%" }}>
        {bestInTownRestaurants.length > 0 ? (
          bestInTownRestaurants.map((restaurant, index) => (
            <Box key={index} sx={{ flex: "0 0 auto", marginRight: 2 }}>
              <RestaurantCard
                title={restaurant.name}
                subheader={`${restaurant.location.address}, ${restaurant.location.city}`}
                imagePath={restaurant.imagePath}
                restaurantId={restaurant.id}
                averageRating={restaurant.averageRating}
              />
            </Box>
          ))
        ) : (
          <Typography variant="h6" style={{ margin: "20px" }}>
            No best in town restaurants found.
          </Typography>
        )}
      </Box>
    </Grid>
  );
};

export default Main;
