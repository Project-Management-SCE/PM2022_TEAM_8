import React, { FC, useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Home from "./Routes/Home";
import MainNavigation from "./NavBar/MainNavigation";
import MainFooter from "./Footer/MainFooter";
import Login from "./Routes/Login";
import Register from "./Routes/Register";
import UserProfile from "./Routes/UserProfile";
import AdminLogin from "./admin/AdminLogin";
import Movies from "./Routes/Movies";
import Series from "./Routes/Series";
import AdminControl from "./admin/AdminControl";
import { UsersList } from "./admin/UsersList";
import { ReviewsList } from "./admin/ReviewsList";

function App() {
  const [adminON, setAdminON] = useState<boolean>(false);
  var pathArray, adminUrl;
  useEffect(() => {
    pathArray = window.location.pathname.split("/");
    adminUrl = pathArray[1];
    if (
      adminUrl == "admin" ||
      adminUrl == "users-list" ||
      adminUrl == "reviews-list"
    ) {
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
        <Route path="/admin" element={<AdminControl />} />
        <Route path="/reviews-list" element={<ReviewsList />} />
        <Route path="/users-list" element={<UsersList />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/series" element={<Series />} />
        <Route path="/admin_login" element={<AdminLogin />} />
        <Route path="/" element={<Navigate replace to="/" />} />
      </Routes>
      {!adminON && <MainFooter />}
    </BrowserRouter>
  );
}

export default App;
