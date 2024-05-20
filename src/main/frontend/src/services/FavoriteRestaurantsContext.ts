// import { createContext, useState } from "react";

// export const FavoriteRestaurantsContext = createContext({
//   favoriteRestaurants: [],
//   addFavorite: (restaurantId: number) => {},
// });

// export const FavoriteRestaurantsProvider = ({ children }) => {
//   const [favoriteRestaurants, setFavoriteRestaurants] = useState<number[]>([]);

//   const addFavorite = (restaurantId: number) => {
//     setFavoriteRestaurants([...favoriteRestaurants, restaurantId]);
//   };

//   return (
//     <FavoriteRestaurantsContext.Provider
//       value={{ favoriteRestaurants, addFavorite }}
//     >
//       {children}
//     </FavoriteRestaurantsContext.Provider>
//   );
// };
