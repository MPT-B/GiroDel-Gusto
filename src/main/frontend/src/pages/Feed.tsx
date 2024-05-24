import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchReviews, fetchFriendReviews } from "../slices/reviewSlice";
import FeedList from "../components/FeedList";
import AddReviewForm from "../components/ReviewForm";
import { AppDispatch, RootState } from "../store/store";
import { Button } from "@mui/material";
import connectWebSocket from "../services/WebSocket";

const Feed: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { reviews, friendReviews, status, error } = useSelector(
    (state: RootState) => state.reviews
  );
  const userRole = useSelector((state: RootState) => state.user.role);
  const userId = useSelector((state: RootState) => state.user.id);

  const [showFriendReviews, setShowFriendReviews] = useState(false);

  useEffect(() => {
    if (showFriendReviews) {
      dispatch(fetchFriendReviews(userId));
    } else {
      dispatch(fetchReviews());
    }

    const stompClient = connectWebSocket((message: string) => {
      if (showFriendReviews) {
        dispatch(fetchFriendReviews(userId));
      } else {
        dispatch(fetchReviews());
      }
    });

    return () => {
      stompClient.deactivate();
    };
  }, [dispatch, showFriendReviews, userId]);

  const toggleShowFriendReviews = () => {
    setShowFriendReviews(!showFriendReviews);
  };

  if (status === "loading") return <div>Loading...</div>;
  if (status === "failed") {
    console.error("Error: ", error);
    return <div>Error loading reviews</div>;
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "10vh",
        paddingInline: "3rem",
      }}
    >
      <Button
        variant="contained"
        color="primary"
        onClick={toggleShowFriendReviews}
        sx={{
          margin: "20px",
        }}
      >
        {showFriendReviews ? "Show All Reviews" : "Show Friend Reviews"}
      </Button>
      {reviews && (
        <FeedList
          reviews={showFriendReviews ? friendReviews : reviews}
          userRole={userRole}
        />
      )}
      <AddReviewForm />
    </div>
  );
};

export default Feed;
