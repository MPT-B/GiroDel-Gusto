import React from "react";
import { useFetchData } from "../hooks/fetchData";
import FeedList from "../components/FeedList";
import { Review } from "../models/review.model";

const Feed: React.FC = () => {
  const { data: reviews, error } = useFetchData(
    "http://127.0.0.1:8080/reviews"
  );

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
