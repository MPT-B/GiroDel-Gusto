import * as React from "react";
import { PaletteMode } from "@mui/material";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import ToggleColorMode from "./ToggleColorMode";
import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { LogoutButton } from "../auth/Logout";
import { fetchUserDetails } from "../auth/GetUser";
import { useEffect, useState } from "react";

const logoStyle = {
  width: "60px",
  height: "auto",
  cursor: "pointer",
};

interface AppAppBarProps {
  mode: PaletteMode;
  toggleColorMode: () => void;
}

function AppAppBar({ mode, toggleColorMode }: AppAppBarProps) {
  const [open, setOpen] = useState(false);
  const { isAuthenticated } = useAuth();
  const [userInfo, setUserInfo] = useState<{ username: string } | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const userDetails = await fetchUserDetails();
      if (userDetails) {
        setUserInfo({ username: userDetails.username });
      }
    };

    getUser();
  }, []);

  const userLoggedIn = isAuthenticated();
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  return (
    <div>
      <AppBar
        position="fixed"
        sx={{
          boxShadow: 0,
          bgcolor: "transparent",
          backgroundImage: "none",
          mt: 2,
        }}
      >
        <Container maxWidth="lg" style={{ marginBottom: "15px" }}>
          <Toolbar
            variant="regular"
            sx={(theme) => ({
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexShrink: 0,
              borderRadius: "999px",
              bgcolor:
                theme.palette.mode === "light"
                  ? "rgba(255, 255, 255, 0.4)"
                  : "rgba(0, 0, 0, 0.4)",
              backdropFilter: "blur(24px)",
              maxHeight: 40,
              border: "1px solid",
              borderColor: "divider",
              boxShadow:
                theme.palette.mode === "light"
                  ? `0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)`
                  : "0 0 1px rgba(2, 31, 59, 0.7), 1px 1.5px 2px -1px rgba(2, 31, 59, 0.65), 4px 4px 12px -2.5px rgba(2, 31, 59, 0.65)",
            })}
          >
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                alignItems: "center",
                ml: "-18px",
                px: 0,
              }}
            >
              <img
                src={
                  mode === "light"
                    ? "/data/Logo_dark.png"
                    : "/data/Logo_light.png"
                }
                style={logoStyle}
                alt="logo of GiroDelGusto"
              />
              <Box sx={{ display: { xs: "none", md: "flex" } }}>
                <MenuItem
                  component={Link}
                  to="/main"
                  sx={{ py: "6px", px: "12px" }}
                >
                  <Typography variant="body2" color="text.primary">
                    Menu
                  </Typography>
                </MenuItem>
                <MenuItem
                  component={Link}
                  to="/restaurantList"
                  sx={{ py: "6px", px: "12px" }}
                >
                  <Typography variant="body2" color="text.primary">
                    Restaurant List
                  </Typography>
                </MenuItem>
                <MenuItem
                  component={Link}
                  to="/feed"
                  sx={{ py: "6px", px: "12px" }}
                >
                  <Typography variant="body2" color="text.primary">
                    Feed
                  </Typography>
                </MenuItem>
                <MenuItem
                  component={Link}
                  to="/map"
                  sx={{ py: "6px", px: "12px" }}
                >
                  <Typography variant="body2" color="text.primary">
                    Map
                  </Typography>
                </MenuItem>
                <MenuItem
                  component={Link}
                  to="/friends"
                  sx={{ py: "6px", px: "12px" }}
                >
                  <Typography variant="body2" color="text.primary">
                    Friends
                  </Typography>
                </MenuItem>
              </Box>
            </Box>
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                gap: 0.5,
                alignItems: "center",
              }}
            >
              <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} />
              {userLoggedIn && userInfo ? (
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Button
                    color="primary"
                    variant="text"
                    size="small"
                    component="a"
                    href="/userProfile"
                  >
                    {userInfo.username}
                  </Button>
                  <LogoutButton />
                </Box>
              ) : (
                <div>
                  <Button
                    color="primary"
                    variant="text"
                    size="small"
                    component="a"
                    href="/login"
                  >
                    Sign in
                  </Button>
                  <Button
                    color="primary"
                    variant="contained"
                    size="small"
                    component="a"
                    href="/signup"
                  >
                    Sign up
                  </Button>
                </div>
              )}
            </Box>
            <Box sx={{ display: { sm: "", md: "none" } }}>
              <Button
                variant="text"
                color="primary"
                aria-label="menu"
                onClick={toggleDrawer(true)}
                sx={{ minWidth: "30px", p: "4px" }}
              >
                <MenuIcon />
              </Button>
              <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
                <Box
                  sx={{
                    minWidth: "60dvw",
                    p: 2,
                    backgroundColor: "background.paper",
                    flexGrow: 1,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "end",
                      flexGrow: 1,
                    }}
                  >
                    <ToggleColorMode
                      mode={mode}
                      toggleColorMode={toggleColorMode}
                    />
                  </Box>
                  <MenuItem component={Link} to="/main">
                    Main
                  </MenuItem>
                  <MenuItem component={Link} to="/restaurantList">
                    Restaurant List
                  </MenuItem>
                  <MenuItem component={Link} to="/feed">
                    Feed
                  </MenuItem>
                  <MenuItem component={Link} to="/map">
                    Map
                  </MenuItem>
                  <MenuItem component={Link} to="/friends">
                    Friends
                  </MenuItem>
                  <Divider />
                  {userLoggedIn && userInfo ? (
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <MenuItem>
                        <Typography color="text.primary">
                          {userInfo.username}
                        </Typography>
                      </MenuItem>

                      <MenuItem>
                        <LogoutButton />
                      </MenuItem>
                    </Box>
                  ) : (
                    <div>
                      <MenuItem>
                        <Button
                          color="primary"
                          variant="contained"
                          component="a"
                          href="/login"
                          sx={{ width: "100%" }}
                        >
                          Sign in
                        </Button>
                      </MenuItem>
                      <MenuItem>
                        <Button
                          color="primary"
                          variant="outlined"
                          component="a"
                          href="/signup"
                          sx={{ width: "100%" }}
                        >
                          Sign up
                        </Button>
                      </MenuItem>
                    </div>
                  )}
                </Box>
              </Drawer>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}

export default AppAppBar;
