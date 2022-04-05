import React from "react";
import { NavLink } from "react-router-dom";
import profileImg from "../assets/icons/userProfile.png";
import { IUser } from "../api/internalAPI/internalApiTypes";
import { useSelector } from "react-redux";
import { AppStateType } from "../redux/Store";
import "../Style/userProfile.css";

type ReusableDashboardProps = {
  children: any;
};
const DashboardRoutesReusableTemplate = ({
  children,
}: ReusableDashboardProps) => {
  const img4: string = require("../assets/img/img4.jpg");
  const curr_user = useSelector<AppStateType>(
    (state) => state.auth.user
  ) as IUser;
  return (
    <div className="profile-container">
      <div className="left">
        <div className="iconDiv">
          <img src={profileImg} alt="profileImg" />
        </div>
        <div>
          <p>Hey, {curr_user.firstName}</p>
          <p>Movies watched: 10</p>
          <p>My Reviews: 10</p>
        </div>
        <div className="profile-links">
          <p>
            <NavLink to="/watch_list">WatchList</NavLink>
          </p>
          <p>
            <NavLink to="/user_reviews">My Reviews</NavLink>
          </p>
          <p>
            <NavLink to="/edit_profile">Edit Profile</NavLink>
          </p>
        </div>
      </div>
      <div className="right">{children}</div>
    </div>
  );
};

export default DashboardRoutesReusableTemplate;
