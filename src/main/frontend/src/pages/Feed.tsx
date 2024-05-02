import React from "react";
import { useFetchData } from "../hooks/fetchData";
import FeedList from "../components/FeedList";
import { Review } from "../models/review.model";
import { API_URL } from "../env";

const Feed: React.FC = () => {
  const {
    data: reviews,
    isLoading,
    error,
  } = useFetchData(`${API_URL}/reviews`);

  if (isLoading) return <div>Loading...</div>;
  if (error) {
    console.error("Error: ", error);
  }

  return (
    <div style={{ marginTop: "15vh", paddingInline: "3rem" }}>
      {reviews && <FeedList reviews={reviews} />}
    </div>
  );
};

export default Feed;
