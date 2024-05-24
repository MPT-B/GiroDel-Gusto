import React, { useState } from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Paper,
  Box,
  Grid,
  Typography,
  ThemeProvider,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "@emotion/react";
import { handleAuthRequest } from "../auth/AuthRequest";

export default function SignUp() {
  const navigate = useNavigate();
  const theme = useTheme();
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    repassword: "",
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const username = data.get("username") as string;
    const email = data.get("email") as string;
    const password = data.get("password") as string;
    const repassword = data.get("repassword") as string;

    let formErrors: {
      username: string;
      email: string;
      password: string;
      repassword: string;
    } = { username: "", email: "", password: "", repassword: "" };

    if (!username.trim()) {
      formErrors.username = "Username is required";
    }

    if (!email.trim()) {
      formErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      formErrors.email = "Email is invalid";
    }

    if (!password.trim()) {
      formErrors.password = "Password is required";
    } else if (
      password.length < 8 ||
      !/[!@#$%^&*(),.?":{}|<>]/.test(password)
    ) {
      formErrors.password =
        "Password must be at least 8 characters long and contain at least one special character";
    }

    if (!repassword.trim()) {
      formErrors.repassword = "Repeat Password is required";
    } else if (password !== repassword) {
      formErrors.repassword = "Passwords do not match";
    }

    setErrors(formErrors);

    if (Object.values(formErrors).some((error) => error !== "")) {
      return;
    }

    try {
      const result = await handleAuthRequest("signup", {
        username,
        email,
        password,
      });

      if (result.success) {
        navigate("/login");
      } else {
        throw Error(result.error);
      }
    } catch (error: any) {
      console.log("erroer" + error);
      setError(true);
      setErrorMessage(error.message);
    }
  };

  return (
    <ThemeProvider theme={theme}>
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
              Sign Up
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                error={!!errors.username}
                helperText={(errors.username, errorMessage)}
              />

              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                error={!!errors.email}
                helperText={errors.email}
              />

              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                error={!!errors.password}
                helperText={errors.password}
              />

              <TextField
                margin="normal"
                required
                fullWidth
                name="repassword"
                label="Repeat Password"
                type="password"
                id="repassword"
                error={!!errors.repassword}
                helperText={errors.repassword}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container>
                <Grid item>
                  <Link to="/login">{"Already have an account? Log In"}</Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
