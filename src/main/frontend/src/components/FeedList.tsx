import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { Review, FeedItemsProps } from "../models/review.model";
import { ListItemText, Rating } from "@mui/material";

const FeedItem: React.FC<FeedItemsProps> = ({ reviews }) => {
  return (
    <List sx={{ width: "70vw", bgcolor: "background.paper", mx: "auto" }}>
      {reviews.map((review, index) => (
        <React.Fragment key={review.id}>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar
                alt={review.user.username}
                src={review.user.profile.picturePath}
              />
            </ListItemAvatar>
            <ListItemText
              primary={
                <React.Fragment>
                  {review.restaurant.name}
                  <Rating
                    name="read-only"
                    value={review.rating}
                    readOnly
                    size="small"
                  />
                </React.Fragment>
              }
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {review.user.username}
                  </Typography>
                  {` — ${review.comment}`}
                </React.Fragment>
              }
            />
          </ListItem>
          {index < reviews.length - 1 && (
            <Divider variant="inset" component="li" />
          )}
        </React.Fragment>
      ))}
    </List>
  );
};

export default FeedItem;
