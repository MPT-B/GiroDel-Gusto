import React, { useState, useEffect } from "react";
import axios from "axios";
import RestaurantCard from "../components/RestaurantCard";
import { Restaurant } from "../models/restaurant.model";
import { Grid, Typography } from "@mui/material";
import "../styles/main.css";

const Main: React.FC = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  // useEffect(() => {
  //   axios
  //     .get("http://127.0.0.1:8080/restaurants")
  //     .then((response) => {
  //       setRestaurants(response.data);
  //     })
  //     .catch((error) => console.error("Error:", error));
  // }, []);

  useEffect(() => {
    fetch("http://127.0.0.1:8080/restaurants")
      .then((response) => response.json())
      .then((data: Restaurant[]) => setRestaurants(data))
      .catch((error) => console.error("error"));
  }, []);

  return (
    <Grid
      container
      spacing={2}
      style={{
        justifyContent: "center",
        marginTop: "15vh",
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
            style={{ display: "flex", justifyContent: "center" }}
          >
            <div>
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
        <Typography variant="h6" style={{ margin: "20px" }}>
          No restaurants found.
        </Typography>
      )}
    </Grid>
  );
};

export default Main;
