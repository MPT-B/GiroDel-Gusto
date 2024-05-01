import React, { useState, useEffect } from "react";
import { Grid, Typography } from "@mui/material";
import CuisineFilter from "../components/CuisineFilter";
import RestaurantCard from "../components/RestaurantCard";
import { useFetchData } from "../hooks/fetchData";
import axios from "axios";
import { getAuthToken } from "../auth/authToken";
import { CuisineType } from "../models/cuisine.model";
import { Restaurant } from "../models/restaurant.model";

const RestaurantList: React.FC = () => {
  const [selectedCuisineId, setSelectedCuisineId] = useState<number | null>(
    null
  );
  const { data: cuisineTypes } = useFetchData(
    "http://localhost:8080/cuisineTypes"
  );

  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  useEffect(() => {
    if (selectedCuisineId) {
      const fetchRestaurants = async () => {
        try {
          const response = await axios.get<Restaurant[]>(
            `http://localhost:8080/restaurantCuisines/${selectedCuisineId}`,
            {
              headers: {
                Authorization: `Bearer ${getAuthToken()}`,
              },
            }
          );
          setRestaurants(response.data);
        } catch (error) {
          console.error("Error fetching restaurants:", error);
        }
      };

      fetchRestaurants();
    }
  }, [selectedCuisineId]);

  const handleCuisineClick = (cuisineId: number) => {
    setSelectedCuisineId(cuisineId);
  };

  return (
    <div>
      <CuisineFilter
        cuisineTypes={cuisineTypes || []}
        onCuisineClick={handleCuisineClick}
        selectedCuisineId={selectedCuisineId}
      />
      <Grid
        container
        spacing={2}
        className="restaurantGrid"
        justifyContent="center"
      >
        {restaurants.length > 0 ? (
          restaurants.map((restaurant) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={2}
              key={restaurant.id}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <RestaurantCard
                title={restaurant.name}
                subheader={restaurant.location.address}
                imagePath={restaurant.imagePath}
              />
            </Grid>
          ))
        ) : (
          <Typography variant="h6" style={{ margin: "20px" }}>
            No restaurants found.
          </Typography>
        )}
      </Grid>
    </div>
  );
};

export default RestaurantList;
