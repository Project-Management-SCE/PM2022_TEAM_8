import React, { FC, useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter} from "react-router-dom";
import MainNavigation from "./NavBar/MainNavigation";
import MainFooter from "./Footer/MainFooter";
import {AppRouter} from "./Routes/AppRouter";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "./redux/Store";
import {initializeApp} from "./redux/reducers/app-reducer";
import Notifications from "./util/Notifications";
import AdminControl from "./admin/AdminControl";


const App:FC = ()=>{
  const [adminON, setAdminON] = useState<boolean>(false);
  // ********************************************TODO: check this.
  //const type = useSelector<AppStateType>(state => state.auth.user?.type) as string
  //const isAdmin = type === "Admin" || undefined
  // ********************************************
  const dispatch = useDispatch()
  const isLoading = useSelector<AppStateType>(state => state.app.isLoading) as boolean
  let pathArray, adminUrl;
  useEffect(() => {
    pathArray = window.location.pathname.split("/");
    adminUrl = pathArray[1];
    if (adminUrl == "admin_control" //&& (isAdmin || isAdmin == undefined )) {
    ){ setAdminON(true);
   }
 }, [pathArray]);
  useEffect(()=>{
    dispatch(initializeApp())
  },[])

  return (
    <BrowserRouter>
      {isLoading ? <h1>Loading...</h1>
          :
          <>
            <Notifications/>
            {!adminON ?  <MainNavigation /> : ''}
            <AppRouter/>
            {!adminON ?  <MainFooter /> : ''}
          </>}
    </BrowserRouter>
  );
}

export default App;
