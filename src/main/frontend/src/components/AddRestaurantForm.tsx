import React, { useState } from "react";
import axios from "axios";
import {
  Button,
  FormControl,
  Grid,
  TextField,
  CircularProgress,
  Box,
} from "@mui/material";
import { getAuthToken } from "../auth/authToken";
import { API_URL } from "../env";

const AddRestaurantForm: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [city, setCityName] = useState("");
  const [address, setAddress] = useState("");
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const [imagePath, setImagePath] = useState("");

  const geocodeAddress = async (address: string) => {
    setLoading(true);
    const response = await axios.get(
      "https://nominatim.openstreetmap.org/search",
      {
        params: {
          q: address,
          format: "json",
        },
      }
    );
    setLoading(false);

    if (response.data.length > 0) {
      const { lat, lon } = response.data[0];

      return { latitude: parseFloat(lat), longitude: parseFloat(lon) };
    }

    return null;
  };

  const handleGeocode = async () => {
    const geoData = await geocodeAddress(city + ", " + address);

    if (geoData) {
      setLatitude(geoData.latitude.toString());
      setLongitude(geoData.longitude.toString());
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const restaurantData = {
      name,
      location: {
        city,
        address,
        longitude,
        latitude,
      },
      imagePath,
    };

    try {
      const response = await axios({
        method: "post",
        url: `${API_URL}/restaurants/add`,
        data: restaurantData,
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
          "Content-Type": "application/json",
        },
      });
      setName("");
      setCityName("");
      setAddress("");
      setLongitude("");
      setLatitude("");
      setImagePath("");
    } catch (error) {
      console.error("There was an error adding the restaurant!", error);
    }
  };

  return (
    <Box
      sx={{
        marginTop: "200px",
        paddingInline: { xs: "10px", sm: "10vw" },
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", alignItems: "center" }}
      >
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <FormControl fullWidth>
              <TextField
                label="Restaurant Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </FormControl>
          </Grid>
          <Grid item>
            <FormControl fullWidth>
              <TextField
                label="City Name"
                value={city}
                onChange={(e) => setCityName(e.target.value)}
                required
              />
            </FormControl>
          </Grid>
          <Grid item>
            <FormControl fullWidth>
              <TextField
                label="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
              <Button onClick={handleGeocode} disabled={loading}>
                {loading ? <CircularProgress size={24} /> : "Get Coords"}
              </Button>
            </FormControl>
          </Grid>
          <Grid item>
            <FormControl fullWidth>
              <TextField
                label="Longitude"
                value={longitude}
                InputProps={{
                  readOnly: true,
                }}
              />
            </FormControl>
          </Grid>
          <Grid item>
            <FormControl fullWidth>
              <TextField
                label="Latitude"
                value={latitude}
                InputProps={{
                  readOnly: true,
                }}
              />
            </FormControl>
          </Grid>
          <Grid item>
            <FormControl fullWidth>
              <TextField
                label="Image Path"
                value={imagePath}
                onChange={(e) => setImagePath(e.target.value)}
                required
              />
            </FormControl>
          </Grid>
          <Grid item>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default AddRestaurantForm;
