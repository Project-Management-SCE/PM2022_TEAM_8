import React, { FC, useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Home from "./Routes/Home";
import MainNavigation from "./NavBar/MainNavigation";
import Login from "./Routes/Login";
import Register from "./Routes/Register";
import UserProfile from "./Routes/UserProfile";
import Admin from "./Routes/Admin";

function App() {
  const [adminON, setAdminON] = useState<boolean>(false);
  var pathArray, adminUrl;
  useEffect(() => {
    pathArray = window.location.pathname.split("/");
    adminUrl = pathArray[1];
    if (adminUrl == "admin") {
      setAdminON(true);
    }
  }, [pathArray]);

  return (
    <BrowserRouter>
      {!adminON && <MainNavigation />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/user_profile" element={<UserProfile />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/" element={<Navigate replace to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
