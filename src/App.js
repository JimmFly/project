import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import NavComponent from "./components/nav-component";
import HomeComponent from "./components/home-component";
import RegisterComponent from "./components/register_component";
import LoginComponent from "./components/login-component";
import ProfileComponent from "./components/profile-component";
import AuthService from "./services/auth.service";

function App() {
  let [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser());
  return (
    <div className="App">
      <NavComponent />
      <Routes>
        <Route path="/" element={<HomeComponent />} />
        <Route path="/register" element={<RegisterComponent />} />
        <Route
          path="/login"
          element={
            <LoginComponent
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
            />
          }
        />
        <Route
          path="/profile"
          element={
            <ProfileComponent
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
