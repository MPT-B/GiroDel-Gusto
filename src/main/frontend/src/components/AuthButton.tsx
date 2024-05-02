import Button from "@mui/material/Button";
import React from "react";

interface AuthButtonProps {
  children: React.ReactNode;
}

const AuthButton: React.FC<AuthButtonProps> = ({ children }) => (
  <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
    {children}
  </Button>
);

export default AuthButton;
