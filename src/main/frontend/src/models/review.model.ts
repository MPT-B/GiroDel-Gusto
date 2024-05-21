// export interface Review {
//   id: number;
//   user: {
//     username: string;
//     profile: {
//       picturePath: string;
//     };
//   };
//   restaurant: {
//     name: string;
//   };
//   rating: number;
//   comment: string;
// }

// export interface FeedItemsProps {
//   reviews: Review[];
// }
// src/models/review.model.ts
export interface Review {
  id: number;
  userId: number;
  restaurantId: number;
  rating: number;
  comment: string;
  foodOrdered: string;
  user: {
    username: string;
    profile: {
      picturePath: string;
    };
  };
  restaurant: {
    name: string;
  };
}

export interface FeedItemsProps {
  reviews: Review[];
}
