// import React, { useState, useEffect } from "react";
// import RestaurantCard from "../components/RestaurantCard";
// import { Restaurant } from "../models/restaurant.model";
// import { Grid, Typography, Box } from "@mui/material";
// import "../styles/main.css";
// import { API_URL } from "../env";
// import axios from "axios";

// const Main: React.FC = () => {
//   const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
//   const [bestInTownRestaurants, setBestInTownRestaurants] = useState<
//     Restaurant[]
//   >([]);
//   const [bestRestaurants, setNearestRestaurants] = useState<Restaurant[]>([]);
//   const [favoriteRestaurants, setFavoriteRestaurants] = useState<Restaurant[]>(
//     []
//   );
//   const [currentCity, setCurrentCity] = useState<string>("Gdansk");

//   navigator.geolocation.getCurrentPosition((position) => {
//     const { latitude, longitude } = position.coords;

//     fetch(
//       `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
//     )
//       .then((response) => response.json())
//       .then((data) => {
//         const city =
//           data.address.city || data.address.town || data.address.village;
//         setCurrentCity(city);
//       })
//       .catch((error) => console.error(error));
//   });

//   useEffect(() => {
//     axios
//       .get(`${API_URL}/restaurants`)
//       .then((response) => {
//         setRestaurants(response.data);
//       })
//       .catch((error) => console.error("error", error));
//   }, []);

//   useEffect(() => {
//     // Fetch best restaurants in town
//     axios
//       .get(`${API_URL}/restaurants/town/${currentCity}`)
//       .then((response) => {
//         setBestInTownRestaurants(response.data);
//       })
//       .catch((error) =>
//         console.error("Error fetching best restaurants:", error)
//       );

//     // Fetch nearest restaurants
//     axios
//       .get(`${API_URL}/favoriteRestaurants/user/1`)
//       .then((response) => {
//         setNearestRestaurants(response.data);
//       })
//       .catch((error) =>
//         console.error("Error fetching nearest restaurants:", error)
//       );

//     // Fetch user's favorite restaurants
//     axios
//       .get(`${API_URL}/favoriteRestaurants/user/1`)
//       .then((response) => {
//         setFavoriteRestaurants(response.data);
//       })
//       .catch((error) =>
//         console.error("Error fetching favorite restaurants:", error)
//       );
//   }, [currentCity]);

//   return (
//     <Grid
//       container
//       spacing={2}
//       style={{
//         justifyContent: "center",
//         marginTop: "12vh",
//         paddingInline: "3rem",
//       }}
//     >
//       <Typography variant="h4">Favorite</Typography>
//       <Box sx={{ display: "flex", overflowX: "auto", width: "100%" }}>
//         {favoriteRestaurants.length > 0 ? (
//           favoriteRestaurants.map((restaurant, index) => (
//             <Box key={index} sx={{ flex: "0 0 auto", marginRight: 2 }}>
//               <RestaurantCard
//                 key={restaurant.id}
//                 title={restaurant.name}
//                 subheader={`${restaurant.location.address}, ${restaurant.location.city.name}`}
//                 imagePath={restaurant.imagePath}
//                 restaurantId={restaurant.id}
//               />
//             </Box>
//           ))
//         ) : (
//           <Typography variant="h6" style={{ margin: "20px" }}>
//             No favorite restaurants found.
//           </Typography>
//         )}
//       </Box>

//       <Typography variant="h4">Nearest</Typography>
//       <Box sx={{ display: "flex", overflowX: "auto", width: "100%" }}>
//         {bestRestaurants.length > 0 ? (
//           bestRestaurants.map((restaurant, index) => (
//             <Box key={index} sx={{ flex: "0 0 auto", marginRight: 2 }}>
//               <RestaurantCard
//                 key={restaurant.id}
//                 title={restaurant.name}
//                 subheader={`${restaurant.location.address}, ${restaurant.location.city.name}`}
//                 imagePath={restaurant.imagePath}
//                 restaurantId={restaurant.id}
//               />
//             </Box>
//           ))
//         ) : (
//           <Typography variant="h6" style={{ margin: "20px" }}>
//             No nearest restaurants found.
//           </Typography>
//         )}
//       </Box>

//       <Typography variant="h4">Best In Town</Typography>
//       <Box sx={{ display: "flex", overflowX: "auto", width: "100%" }}>
//         {bestInTownRestaurants.length > 0 ? (
//           bestInTownRestaurants.map((restaurant, index) => (
//             <Box key={index} sx={{ flex: "0 0 auto", marginRight: 2 }}>
//               <RestaurantCard
//                 key={restaurant.id}
//                 title={restaurant.name}
//                 subheader={`${restaurant.location.address}, ${restaurant.location.city.name}`}
//                 imagePath={restaurant.imagePath}
//                 restaurantId={restaurant.id}
//               />
//             </Box>
//           ))
//         ) : (
//           <Typography variant="h6" style={{ margin: "20px" }}>
//             No best in town restaurants found.
//           </Typography>
//         )}
//       </Box>
//     </Grid>
//   );
// };

// export default Main;

import React, { useEffect } from "react";
import RestaurantCard from "../components/RestaurantCard";
import { Grid, Typography, Box } from "@mui/material";
import "../styles/main.css";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchRestaurants,
  fetchFavoriteRestaurants,
  fetchBestInTownRestaurants,
} from "../slices/restaurantSlice";
import { RootState, AppDispatch } from "../store/store";

const Main: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { favoriteRestaurants, nearestRestaurants, bestInTownRestaurants } =
    useSelector((state: RootState) => state.restaurant);
  const [currentCity, setCurrentCity] = React.useState<string>("Gdansk");
  const userId = useSelector((state: RootState) => state.user.userId);

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
    console.log(userId);
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
      <Typography variant="h4">Favorite</Typography>
      <Box sx={{ display: "flex", overflowX: "auto", width: "100%" }}>
        {favoriteRestaurants.length > 0 ? (
          favoriteRestaurants.map((restaurant, index) => (
            <Box key={index} sx={{ flex: "0 0 auto", marginRight: 2 }}>
              <RestaurantCard
                title={restaurant.name}
                subheader={`${restaurant.location.address}, ${restaurant.location.city.name}`}
                imagePath={restaurant.imagePath}
                restaurantId={restaurant.id}
              />
            </Box>
          ))
        ) : (
          <Typography variant="h6" style={{ margin: "20px" }}>
            No favorite restaurants found.
          </Typography>
        )}
      </Box>

      <Typography variant="h4">Nearest</Typography>
      <Box sx={{ display: "flex", overflowX: "auto", width: "100%" }}>
        {nearestRestaurants.length > 0 ? (
          nearestRestaurants.map((restaurant, index) => (
            <Box key={index} sx={{ flex: "0 0 auto", marginRight: 2 }}>
              <RestaurantCard
                title={restaurant.name}
                subheader={`${restaurant.location.address}, ${restaurant.location.city.name}`}
                imagePath={restaurant.imagePath}
                restaurantId={restaurant.id}
              />
            </Box>
          ))
        ) : (
          <Typography variant="h6" style={{ margin: "20px" }}>
            No nearest restaurants found.
          </Typography>
        )}
      </Box>

      <Typography variant="h4">Best In Town</Typography>
      <Box sx={{ display: "flex", overflowX: "auto", width: "100%" }}>
        {bestInTownRestaurants.length > 0 ? (
          bestInTownRestaurants.map((restaurant, index) => (
            <Box key={index} sx={{ flex: "0 0 auto", marginRight: 2 }}>
              <RestaurantCard
                title={restaurant.name}
                subheader={`${restaurant.location.address}, ${restaurant.location.city.name}`}
                imagePath={restaurant.imagePath}
                restaurantId={restaurant.id}
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
