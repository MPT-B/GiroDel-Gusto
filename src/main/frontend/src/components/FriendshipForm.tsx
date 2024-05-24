import React, { useState } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Container,
  Typography,
} from "@mui/material";
import { API_URL } from "../env";
import { getAuthToken } from "../auth/authToken";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

interface AddFriendProps {
  currentFriends: string[];
  onFriendAdded: () => void;
}

const AddFriend: React.FC<AddFriendProps> = ({
  currentFriends,
  onFriendAdded,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  const userId = useSelector((state: RootState) => state.user.id);

  const handleSearch = () => {
    if (searchTerm.trim() === "") {
      setError("Please enter a username to search.");
      return;
    }

    axios
      .get(`${API_URL}/users/username/${searchTerm}`, {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setSearchResults(
          response.data.filter(
            (user: any) => !currentFriends.includes(user.username)
          )
        );
        setError(null);
      })
      .catch((error) => {
        console.error("Error:", error);
        setError("User not found. Please try again.");
        setSearchResults([]);
      });
  };

  const handleAddFriend = (friendId: string) => {
    const headers = { Authorization: `Bearer ${getAuthToken()}` };

    axios
      .post(`${API_URL}/friends/${userId}/${friendId}`, {}, { headers })
      .then((response) => {
        console.log(response.data);
        alert("Friend added successfully!");
        onFriendAdded();
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Failed to add friend. Please try again.");
      });
  };

  return (
    <Container sx={{ marginTop: 4, marginBottom: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Add Friend
      </Typography>
      <TextField
        label="Search by Username"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      <Button variant="contained" color="primary" onClick={handleSearch}>
        Search
      </Button>
      {error && (
        <Typography variant="body1" color="error" sx={{ marginTop: 2 }}>
          {error}
        </Typography>
      )}
      <List>
        {searchResults.map((user) => (
          <ListItem key={user.id}>
            <ListItemText primary={user.username} />
            <Button
              variant="contained"
              color="secondary"
              onClick={() => handleAddFriend(user.id)}
            >
              Add Friend
            </Button>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default AddFriend;
