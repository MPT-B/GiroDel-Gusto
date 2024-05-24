import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import MainLayout from "./components/Main-layout";
import MainMenu from "./pages/Main";
import RestaurantList from "./pages/RestaurantList";
import Feed from "./pages/Feed";
import Map from "./pages/Map";
import Friends from "./pages/Friends";
import UserProfile from "./pages/UserProfile";
import LogIn from "./pages/Login";
import { useAuth } from "./auth/AuthContext";
import Signup from "./pages/Signup";
import Faq from "./pages/Faq";
import RestaurantManage from "./pages/RestaurantManage";

function App() {
  const { isAuthenticated } = useAuth();
  console.log("isAuth:" + isAuthenticated());

  return (
    <Routes>
      <Route path="/login" element={<LogIn />} />
      <Route path="/signup" element={<Signup />} />

      <Route path="/" element={<MainLayout />}>
        <Route path="main" element={<MainMenu />} />
        <Route
          path="restaurantList"
          element={
            isAuthenticated() ? <RestaurantList /> : <Navigate to="/login" />
          }
        />
        <Route
          path="feed"
          element={isAuthenticated() ? <Feed /> : <Navigate to="/login" />}
        />
        <Route
          path="map"
          element={isAuthenticated() ? <Map /> : <Navigate to="/login" />}
        />
        <Route
          path="friends"
          element={isAuthenticated() ? <Friends /> : <Navigate to="/login" />}
        />
        <Route
          path="FAQ"
          element={isAuthenticated() ? <Faq /> : <Navigate to="/faq" />}
        />
        <Route
          path="RestaurantManage"
          element={
            isAuthenticated() ? (
              <RestaurantManage />
            ) : (
              <Navigate to="/restaurantManage" />
            )
          }
        />
        <Route
          path="userProfile/:userId"
          element={
            isAuthenticated() ? <UserProfile /> : <Navigate to="/login" />
          }
        />
        <Route path="/*" element={<MainMenu />} />
      </Route>
    </Routes>
  );
}

export default App;
