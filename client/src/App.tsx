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


const App:FC = ()=>{
  //const [adminON, setAdminON] = useState<boolean>(false);
  const dispatch = useDispatch()
  const isLoading = useSelector<AppStateType>(state => state.app.isLoading) as boolean
  //var pathArray, adminUrl;
  //useEffect(() => {
    //athArray = window.location.pathname.split("/");
    //adminUrl = pathArray[1];
   // if (adminUrl == "admin") {
   //   setAdminON(true);
   // }
 //}, [pathArray]);
  useEffect(()=>{
    dispatch(initializeApp())
  },[])

  return (
    <BrowserRouter>
      {isLoading ? <h1>Loading...</h1>
          :
          <>
            <Notifications/>
            <MainNavigation />
            <AppRouter/>
            <MainFooter />
          </>}
    </BrowserRouter>
  );
}

export default App;
