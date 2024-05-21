// src/components/ReviewForm.tsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRestaurants } from "../slices/restaurantSlice";
import { addReview } from "../slices/reviewSlice";
import {
  FormControl,
  InputLabel,
  Button,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  TextField,
} from "@mui/material";
import { RootState, AppDispatch } from "../store/store";

const AddReviewForm: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");
  const [foodOrdered, setFoodOrdered] = useState<string>("");
  const [restaurantId, setRestaurantId] = useState<string>("");
  const userId = useSelector((state: RootState) => state.user.id);
  const dispatch = useDispatch<AppDispatch>();
  const { restaurants } = useSelector((state: RootState) => state.restaurant);

  useEffect(() => {
    dispatch(fetchRestaurants());
  }, [dispatch]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      !rating ||
      !comment ||
      !foodOrdered ||
      !restaurantId ||
      rating < 0 ||
      rating > 5
    ) {
      alert("Please fill in all fields and ensure rating is between 0 and 5.");
      return;
    }

    const review = {
      userId: userId,
      restaurantId: parseInt(restaurantId),
      rating,
      comment,
      foodOrdered,
    };

    dispatch(addReview(review));
    setOpen(false);
  };

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setOpen(true)}
        sx={{
          position: "fixed",
          bottom: "16px",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        Add Review
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add Review</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <Grid container direction="column" spacing={2}>
              <Grid item>
                <FormControl fullWidth>
                  <TextField
                    label="Rating"
                    type="number"
                    value={rating}
                    onChange={(e) => setRating(parseInt(e.target.value))}
                    required
                    inputProps={{ min: 0, max: 5 }}
                  />
                </FormControl>
              </Grid>
              <Grid item>
                <FormControl fullWidth>
                  <TextField
                    label="Comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    required
                    multiline
                    rows={4}
                  />
                </FormControl>
              </Grid>
              <Grid item>
                <FormControl fullWidth>
                  <TextField
                    label="Food Ordered"
                    value={foodOrdered}
                    onChange={(e) => setFoodOrdered(e.target.value)}
                    required
                  />
                </FormControl>
              </Grid>
              <Grid item>
                <FormControl fullWidth>
                  <InputLabel>Restaurant</InputLabel>
                  <Select
                    value={restaurantId}
                    onChange={(e) => setRestaurantId(e.target.value as string)}
                    required
                  >
                    {restaurants.map((restaurant: any) => (
                      <MenuItem key={restaurant.id} value={restaurant.id}>
                        {restaurant.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item>
                <Button type="submit" variant="contained" color="primary">
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddReviewForm;
