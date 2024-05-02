import React, { useState, useEffect } from "react";
import RestaurantCard from "../components/RestaurantCard";
import { Restaurant } from "../models/restaurant.model";
import { Grid, Typography } from "@mui/material";
import "../styles/main.css";
import { API_URL } from "../env";
import axios from "axios";

const Main: React.FC = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  useEffect(() => {
    axios
      .get(`${API_URL}/restaurants`)
      .then((response) => {
        setRestaurants(response.data);
      })
      .catch((error) => console.error("error", error));
  }, []);

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
      {restaurants.length > 0 ? (
        restaurants.map((restaurant, index) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            lg={2}
            key={index}
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div style={{ width: "100%", height: "100%" }}>
              <RestaurantCard
                key={restaurant.id}
                title={restaurant.name}
                subheader={restaurant.location.address}
                imagePath={restaurant.imagePath}
              />
            </div>
          </Grid>
        ))
      ) : (
        <Grid item xs={12}>
          <Typography variant="h6" style={{ margin: "20px" }}>
            No restaurants found.
          </Typography>
        </Grid>
      )}
    </Grid>
  );
};

export default Main;
