import React, { FC, useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Home from "./Pages/Home";
import MainNavigation from "./NavBar/MainNavigation";
import MainFooter from "./Footer/MainFooter";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import UserProfile from "./Pages/UserProfile";
import Admin from "./Pages/Admin";
import AdminLogin from "./admin/AdminLogin";
import Movies from "./Pages/Movies";
import Series from "./Pages/Series";
import {AppRouter} from "./Routes/AppRouter";


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
      <AppRouter/>
      {!adminON && <MainFooter />}
    </BrowserRouter>
  );
}

export default App;
