import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchReviews } from "../slices/reviewSlice";
import FeedList from "../components/FeedList";
import AddReviewForm from "../components/ReviewForm";
import { AppDispatch, RootState } from "../store/store";

const Feed: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { reviews, status, error } = useSelector(
    (state: RootState) => state.reviews
  );
  const userRole = useSelector((state: RootState) => state.user.role);

  useEffect(() => {
    dispatch(fetchReviews());
  }, [dispatch]);

  if (status === "loading") return <div>Loading...</div>;
  if (status === "failed") {
    console.error("Error: ", error);
    return <div>Error loading reviews</div>;
  }

  return (
    <div style={{ marginTop: "15vh", paddingInline: "3rem" }}>
      {reviews && <FeedList reviews={reviews} userRole={userRole} />}
      <AddReviewForm />
    </div>
  );
};

export default Feed;
