import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { RootState } from "../store/store";
import { toggleFavorite } from "../slices/restaurantSlice";
import { RestaurantCardProps } from "../models/restaurantCardProps.model";

export default function RestaurantCard({
  title,
  subheader,
  imagePath,
  restaurantId,
}: RestaurantCardProps) {
  const dispatch = useDispatch();
  const userId = useSelector((state: RootState) => state.user.id);
  const isFavorite = useSelector((state: RootState) =>
    state.restaurant.favoriteRestaurants.some(
      (restaurant) => restaurant.id === restaurantId
    )
  );

  const handleFavoriteClick = () => {
    if (!userId) {
      alert("User is not logged in");
      return;
    }

    const action = isFavorite ? "remove" : "add";
    const url = `http://localhost:8080/favoriteRestaurants/${action}?userId=${userId}&restaurantId=${restaurantId}`;

    const request = isFavorite ? axios.delete : axios.post;

    request(url)
      .then((response) => {
        console.log(`Updated favorite status: ${action}`);
        dispatch(toggleFavorite(restaurantId));
      })
      .catch((error) => console.error("error", error));
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={title}
        subheader={subheader}
      />
      <CardMedia component="img" height="194" image={imagePath} alt={title} />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {subheader}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites" onClick={handleFavoriteClick}>
          {isFavorite ? (
            <FavoriteIcon style={{ color: "red" }} />
          ) : (
            <FavoriteBorderIcon />
          )}
        </IconButton>
      </CardActions>
    </Card>
  );
}
