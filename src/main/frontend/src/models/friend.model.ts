export type Friend = {
  id: number;
  profile: {
    id: number;
    bio: string;
    picturePath: string;
    visitedPlaces: number;
  };
  email: string;
  username: string;
  role: string;
  profileId: number;
};
