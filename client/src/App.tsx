import React, { FC, useEffect } from "react";
import "./App.css";
import { BrowserRouter} from "react-router-dom";
import MainNavigation from "./NavBar/MainNavigation";
import MainFooter from "./Footer/MainFooter";
import {AppRouter} from "./Routes/AppRouter";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "./redux/Store";
import {initializeApp} from "./redux/reducers/app-reducer";
import AdminControl from "./admin/AdminControl";
import Notifications from "./util/Notifications";


const App:FC = ()=>{
  const dispatch = useDispatch()
  const isLoading = useSelector<AppStateType>(state => state.app.isLoading) as boolean
  const userType =useSelector<AppStateType>(state=>state.auth.user?.type) as string
  useEffect(()=>{
    dispatch(initializeApp())
  },[])

  return (
    <BrowserRouter>
      {isLoading ? <h1>Loading...</h1>
          :
          <>
            <Notifications/>
            {userType!=="Admin" ?
                <MainNavigation />
                :
                <AdminControl />
            }
            <AppRouter/>
            {userType!=="Admin" &&  <MainFooter />}
          </>}
    </BrowserRouter>
  );
}

export default App;
