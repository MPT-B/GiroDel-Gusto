import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { useAuth } from "./AuthContext";

export const LogoutButton = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Button
      color="primary"
      variant="contained"
      size="small"
      onClick={handleLogout}
    >
      Logout
    </Button>
  );
};
