// import React from "react";

// const Map: React.FC = () => {
//   return <h1> Kwakwa</h1>;
// };

// export default Map;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Restaurant } from "../models/restaurant.model";
// import { API_URL } from "../env";

// interface RestaurantWithCoordinates extends Restaurant {
//   latitude: number;
//   longitude: number;
// }

// const geocodeAddress = async (address: string) => {
//   const response = await axios.get(
//     "https://nominatim.openstreetmap.org/search",
//     {
//       params: {
//         q: address,
//         format: "json",
//       },
//     }
//   );
//   if (response.data.length > 0) {
//     const { lat, lon } = response.data[0];
//     return { latitude: parseFloat(lat), longitude: parseFloat(lon) };
//   }
//   return null;
// };

// const Map = () => {
//   const [restaurants, setRestaurants] = useState<RestaurantWithCoordinates[]>(
//     []
//   );

//   useEffect(() => {
//     const fetchRestaurants = async () => {
//       try {
//         const response = await axios.get(`${API_URL}/restaurants`);
//         const limitedData = response.data.slice(0, 5);
//         const data = await Promise.all(
//           limitedData.map(async (restaurant: Restaurant) => {
//             const location = await geocodeAddress(
//               `${restaurant.location.address}, ${restaurant.location.city.name}`
//             );
//             if (location) {
//               return {
//                 ...restaurant,
//                 latitude: location.latitude,
//                 longitude: location.longitude,
//               };
//             }
//             return null;
//           })
//         );
//         setRestaurants(
//           data.filter(
//             (restaurant) => restaurant !== null
//           ) as RestaurantWithCoordinates[]
//         );
//       } catch (error) {
//         console.error("There was an error fetching the restaurants", error);
//       }
//     };

//     fetchRestaurants();
//   }, []);

//   return (
//     <div style={{ height: "500px", width: "100%" }}>
//       {restaurants.map((restaurant, index) => (
//         <div key={index}>
//           <h2>{restaurant.name}</h2>
//           <p>Latitude: {restaurant.latitude}</p>
//           <p>Longitude: {restaurant.longitude}</p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Map;
//https://gis.stackexchange.com/questions/250261/marker-appears-in-different-position-when-zooming

import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  ZoomControl,
} from "react-leaflet";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import { API_URL } from "../env";

// Ikona dla pinezki
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png").default,
//   iconUrl: require("leaflet/dist/images/marker-icon.png").default,
//   shadowUrl: require("leaflet/dist/images/marker-shadow.png").default,
// });

const foodIcon = new Icon({
  iconUrl: "https://img.icons8.com/doodle/48/apple.png",
  iconSize: [35, 35], // size of the icon
  popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
  anchor: [0.5, 35],
  anchorXUnits: "fraction",
  anchorYUnits: "pixels",
});

// Typ dla lokalizacji restauracji
interface RestaurantLocation {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}

const Map: React.FC = () => {
  const [locations, setLocations] = useState<RestaurantLocation[]>([]);

  // Przykład danych lokalizacji (możesz pobrać te dane z backendu)
  useEffect(() => {
    //         const response = await axios.get(`${API_URL}/restaurants`);
    fetch(`${API_URL}/restaurants`)
      .then((response) => response.json())
      .then((data) => {
        setLocations(data);
      });
  }, []);

  return (
    <MapContainer
      center={[52.237049, 21.017532]}
      zoom={13}
      style={{ height: "100vh", width: "100%" }}
      zoomControl={false}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />

      <Marker key={12} position={[52.196217, 21.178225]} icon={foodIcon}>
        <Popup>kasdzxc</Popup>
      </Marker>
      <ZoomControl position="bottomright"></ZoomControl>
    </MapContainer>
  );
};

export default Map;
