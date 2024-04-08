import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import MainLayout from "./components/Main-layout.tsx";

import MainMenu from "./pages/Main.tsx";
import RestaurantList from "./pages/RestaurantList.tsx";
import Feed from "./pages/Feed.tsx";
import Map from "./pages/Map.tsx";
import Friends from "./pages/Friends.tsx";
import UserProfile from "./pages/UserProfile.tsx";
import LogIn from "./pages/Login.tsx";
import SignUp from "./pages/Signup.tsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />

        <Route
          path="/*"
          element={
            <MainLayout>
              <Routes>
                <Route path="/" element={<Navigate to="/main" />} />
                <Route path="/main" element={<MainMenu />} />
                <Route path="/restaurantList" element={<RestaurantList />} />
                <Route path="/feed" element={<Feed />} />
                <Route path="/map" element={<Map />} />
                <Route path="/friends" element={<Friends />} />
                <Route path="/UserProfile" element={<UserProfile />} />
              </Routes>
            </MainLayout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
