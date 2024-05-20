import React, { useState, useEffect } from "react";
import { Grid, Typography } from "@mui/material";
import CuisineFilter from "../components/CuisineFilter";
import RestaurantCard from "../components/RestaurantCard";
import { useFetchData } from "../hooks/fetchData";
import axios from "axios";
import { getAuthToken } from "../auth/authToken";
import { Restaurant } from "../models/restaurant.model";
import { API_URL } from "../env";

const RestaurantList: React.FC = () => {
  const [selectedCuisineId, setSelectedCuisineId] = useState<number | null>(
    null
  );
  const { data: cuisineTypes, isLoading: isLoadingCuisines } = useFetchData(
    `${API_URL}/cuisineTypes`
  );

  const [restaurants, setRestaurants] = useState<Restaurant[]>(
    [] as Restaurant[]
  );

  useEffect(() => {
    if (selectedCuisineId) {
      const fetchRestaurants = async () => {
        try {
          const response = await axios.get<Restaurant[]>(
            `${API_URL}/restaurantCuisines/${selectedCuisineId}`,
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
    <div style={{ marginTop: "10vh" }}>
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
        style={{
          justifyContent: "center",
          paddingInline: "3rem",
        }}
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
                restaurantId={restaurant.id}
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

// import React, { useEffect } from "react";
// import { Grid, Typography } from "@mui/material";
// import CuisineFilter from "../components/CuisineFilter";
// import RestaurantCard from "../components/RestaurantCard";
// import { useFetchData } from "../hooks/fetchData";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchRestaurants } from "../slices/restaurantSlice";
// import { RootState } from "../store/store";
// import { API_URL } from "../env";

// const RestaurantList: React.FC = () => {
//   const [selectedCuisineId, setSelectedCuisineId] = React.useState<
//     number | null
//   >(null);
//   const { data: cuisineTypes, isLoading: isLoadingCuisines } = useFetchData(
//     `${API_URL}/cuisineTypes`
//   );

//   const dispatch = useDispatch();
//   const restaurants = useSelector(
//     (state: RootState) => state.restaurant.restaurants
//   );

//   useEffect(() => {
//     dispatch(fetchRestaurants());
//   }, [dispatch]);

//   const handleCuisineClick = (cuisineId: number) => {
//     setSelectedCuisineId(cuisineId);
//   };

//   return (
//     <div style={{ marginTop: "10vh" }}>
//       <CuisineFilter
//         cuisineTypes={cuisineTypes || []}
//         onCuisineClick={handleCuisineClick}
//         selectedCuisineId={selectedCuisineId}
//       />
//       <Grid
//         container
//         spacing={2}
//         className="restaurantGrid"
//         justifyContent="center"
//         style={{
//           justifyContent: "center",
//           paddingInline: "3rem",
//         }}
//       >
//         {restaurants.length > 0 ? (
//           restaurants.map((restaurant) => (
//             <Grid
//               item
//               xs={12}
//               sm={6}
//               md={4}
//               lg={2}
//               key={restaurant.id}
//               style={{ display: "flex", justifyContent: "center" }}
//             >
//               <RestaurantCard
//                 title={restaurant.name}
//                 subheader={restaurant.location.address}
//                 imagePath={restaurant.imagePath}
//                 restaurantId={restaurant.id}
//               />
//             </Grid>
//           ))
//         ) : (
//           <Typography variant="h6" style={{ margin: "20px" }}>
//             No restaurants found.
//           </Typography>
//         )}
//       </Grid>
//     </div>
//   );
// };

// export default RestaurantList;
