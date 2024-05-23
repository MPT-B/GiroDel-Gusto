import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { API_URL } from "../env";
import { fetchUserDetails } from "../auth/GetUser";
import { Friend } from "../models/friend.model";
import { useDispatch } from "react-redux";
import { getAuthToken } from "../auth/authToken";
import { Avatar } from "@mui/material";

const Friends: React.FC = () => {
  const [friends, setFriends] = useState<Friend[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userId, setUserId] = useState<number | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const getUser = async () => {
      const userDetails = await fetchUserDetails(dispatch);
      if (userDetails) {
        setUserId(userDetails.id);
      } else {
        setError("Failed to fetch user details");
      }
    };

    getUser();
  }, []);

  useEffect(() => {
    if (userId) {
      setIsLoading(true);
      fetch(`${API_URL}/friends/user/${userId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch friends");
          }
          return response.json();
        })
        .then((data) => {
          setFriends(data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching friends:", error);
          setError(error.message);
          setIsLoading(false);
        });
    }
  }, [userId]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} justifyContent="center" marginTop={"8rem"}>
        {friends.map((friend) => (
          <Grid item xs={12} sm={6} md={4} lg={2} key={friend.id}>
            <Card variant="outlined">
              <CardContent>
                <Avatar
                  alt={friend.username}
                  src={friend.profile.picturePath}
                  sx={{ mr: 2 }}
                />
                <Typography
                  variant="h5"
                  component="div"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {friend.username}
                </Typography>
                <Typography sx={{ my: 1.5 }} color="text.secondary">
                  {friend.profile.bio}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Friends;
