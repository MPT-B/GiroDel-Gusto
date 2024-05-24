import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, TextField, Grid, FormControl, Box } from "@mui/material";
import { API_URL } from "../env";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../slices/userSlice";
import { getAuthToken } from "../auth/authToken";

const UserProfile: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [bio, setBio] = useState("");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { userId } = useParams<{ userId: string }>();
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(`${API_URL}/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      })
      .then((response) => {
        console.log(response);
        setUsername(response.data.username);
        setEmail(response.data.email);
        if (response.data.profile) {
          setBio(response.data.profile.bio);
        } else {
          setBio("");
        }
      });
  }, [userId]);

  const handleUpdateProfile = () => {
    axios
      .put(
        `${API_URL}/users/${userId}/profile`,
        {
          username,
          profile: {
            bio,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${getAuthToken()}`,
          },
        }
      )
      .then(() => {
        alert("Profile Updated");
        setOpen(true);
        setTimeout(() => navigate("/main-menu"), 2000);
      });
  };

  const handleUpdateUser = () => {
    if (!password) {
      alert("Password cannot be empty!");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    axios
      .put(
        `${API_URL}/users/${userId}/username-password`,
        {
          username,
          email,
          password,
        },
        {
          headers: {
            Authorization: `Bearer ${getAuthToken()}`,
          },
        }
      )
      .then((response) => {
        dispatch(setUser(response.data));
        alert("Profile Updated");
        setOpen(true);
        setTimeout(() => navigate("/main-menu"), 2000);
      });
  };

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <div>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        padding="10vw"
      >
        <Grid
          container
          direction="column"
          spacing={2}
          marginTop={"150px"}
          maxWidth={"800px"}
        >
          <Grid item>
            <FormControl fullWidth>
              <TextField
                label="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </FormControl>
          </Grid>
          <Grid item>
            <FormControl fullWidth>
              <TextField
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </FormControl>
          </Grid>
          <Grid item>
            <FormControl fullWidth>
              <TextField
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </FormControl>
          </Grid>
          <Grid item>
            <FormControl fullWidth>
              <TextField
                label="Confirm Password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </FormControl>
          </Grid>
          <Grid item>
            <FormControl fullWidth>
              <TextField
                label="Bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                required
                multiline
                rows={4}
              />
            </FormControl>
          </Grid>
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-around"
            alignItems="center"
            marginTop={"10px"}
          >
            <Button
              onClick={handleUpdateProfile}
              variant="contained"
              color="primary"
            >
              Update Profile
            </Button>
            <Button
              onClick={handleUpdateUser}
              variant="contained"
              color="primary"
            >
              Update User
            </Button>
          </Box>
        </Grid>
      </Box>
    </div>
  );
};

export default UserProfile;
