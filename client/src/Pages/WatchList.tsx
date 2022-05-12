import React, {useEffect} from "react";
import DashboardRoutesReusableTemplate from "../components/DashboardRoutesReusableTemplate";
import "../Style/userProfile.css";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../redux/Store";
import {IUser, Watchlist} from "../api/internalAPI/internalApiTypes";
import {getWatchlist} from "../redux/reducers/user-reducer";

export const WatchList = () => {
    const dispatch = useDispatch();
    const watchlist = useSelector(
        (state: AppStateType) => state.user.watchlist
    ) as Watchlist[];

    const curr_user = useSelector<AppStateType>(
        (state) => state.auth.user
    ) as IUser;

    useEffect(() => {
        dispatch(getWatchlist(curr_user.id!));
    }, []);
  return (
    <DashboardRoutesReusableTemplate
      children={
        <div className="dashboard-container">
          <h1>WatchList</h1>
        </div>
      }
    />
  );
};
