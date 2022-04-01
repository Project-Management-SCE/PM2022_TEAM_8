import React, { FC } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Home from "./Routes/Home";
import MainNavigation from "./NavBar/MainNavigation";
import Login from "./Routes/Login";
import Register from "./Routes/Register";
import UserProfile from "./Routes/UserProfile";

function App() {
  return (
    <BrowserRouter>
      <MainNavigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/user_profile" element={<UserProfile />} />
        <Route path="/" element={<Navigate replace to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
