import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { useDispatch } from "react-redux";
import { setUser } from "../slices/userSlice";
import {
  Avatar,
  Box,
  Grid,
  Paper,
  TextField,
  Typography,
  CssBaseline,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import AuthButton from "../components/AuthButton";
import { handleAuthRequest } from "../auth/AuthRequest";
import { setAuthHeader } from "../services/BackendService";

const defaultTheme = createTheme();

const Login = () => {
  const [username, setUsername] = useState("CreativeUser1");
  const [password, setPassword] = useState("kwakwa");
  const [errorMessage, setErrorMessage] = useState("");
  const [error, setError] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  if (isAuthenticated()) {
    return <Navigate to="/main" />;
  }

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const username = data.get("username") as string;
    const password = data.get("password") as string;

    try {
      const result = await handleAuthRequest("login", { username, password });

      if (result.success) {
        setAuthHeader(result.data.token);
        const userId = result.data.id;
        dispatch(setUser(userId));
        window.location.href = "/main";
      } else {
        throw Error(result.error);
      }
    } catch (error: any) {
      setError(true);
      setErrorMessage(error.message);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url('../giro.webp')",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
          </Box>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <form onSubmit={handleLogin}>
              <TextField
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setError(false);
                  setErrorMessage("");
                }}
                error={error}
                sx={{
                  mb: 4,
                  width: "80%",
                }}
              />
              <TextField
                id="password"
                label="Password"
                name="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError(false);
                  setErrorMessage("");
                }}
                error={error}
                sx={{
                  mb: 4,
                  width: "80%",
                }}
              />
              {error && (
                <Typography variant="body2" color="error" sx={{ mb: 2 }}>
                  {errorMessage}
                </Typography>
              )}
              <AuthButton>Sign In</AuthButton>

              <Grid container>
                <Grid item>
                  <Link to="/signup">{"Don't have an account? Sign Up"}</Link>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default Login;
