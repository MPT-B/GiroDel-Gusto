export interface Review {
  id: number;
  user: {
    username: string;
    profile: {
      picturePath: string;
    };
  };
  restaurant: {
    name: string;
  };
  rating: number;
  comment: string;
}

export interface FeedItemsProps {
  reviews: Review[];
}
