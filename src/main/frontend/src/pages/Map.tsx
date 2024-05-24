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
import { Restaurant } from "../models/restaurant.model";

const foodIcon = new Icon({
  iconUrl: "https://img.icons8.com/doodle/48/apple.png",
  iconSize: [35, 35],
  popupAnchor: [-3, -76],
  anchor: [0.5, 35],
  anchorXUnits: "fraction",
  anchorYUnits: "pixels",
});

const Map: React.FC = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  useEffect(() => {
    fetch(`${API_URL}/restaurants`)
      .then((response) => response.json())
      .then((data) => {
        setRestaurants(data);
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

      {restaurants.map((restaurant) => (
        <Marker
          key={restaurant.id}
          position={[
            restaurant.location.latitude,
            restaurant.location.longitude,
          ]}
          icon={foodIcon}
        >
          <Popup>{restaurant.name}</Popup>
        </Marker>
      ))}
      <ZoomControl position="bottomright"></ZoomControl>
    </MapContainer>
  );
};

export default Map;
