import React from "react";
import { NavLink } from "react-router-dom";
import "../Style/userProfile.css";
import {ButtonGroup, ToggleButton} from "react-bootstrap";
import profileImg from "../assets/icons/userProfile.png";
import {IUser} from "../api/internalAPI/internalApiTypes";
import {AppStateType} from "../redux/Store";
import {useSelector} from "react-redux";
type ReusableDashboardProps = {
  children: any;
};
const DashboardRoutesReusableTemplate = ({
  children,
}: ReusableDashboardProps) => {
  const curr_user = useSelector<AppStateType>(
      (state) => state.auth.user
  ) as IUser;
  const [selected, setSelected] = React.useState("Dashboard");
  const handleSelect = (value: any) => {
    setSelected(value);
  };
  return (
    <div className="profile-container">
      <div className="left">
        <p className="profile-email">{curr_user.email}</p>
        <div className="iconDiv">
          <img src={profileImg} alt="profileImg" />
        </div>
        <div className="profile-links">
          <ButtonGroup vertical={true}>
                  <ToggleButton
                      key="Watch List"
                      type="radio"
                      value="Watch List"
                      variant={selected=== "Watch List" ? "danger": "outline-dark" }
                      onClick={()=>handleSelect("Watch List")}
                  >
                    <NavLink className="user-links" to="/user_profile/watch_list">
                      WatchList
                    </NavLink>
                  </ToggleButton>
            <ToggleButton
                key="My Reviews"
                type="radio"
                value="My Reviews"
                variant={selected=== "My Reviews" ? "danger": "outline-dark" }
                onClick={()=>handleSelect("My Reviews")}
            >
              <NavLink className="user-links" to="/user_profile/user_reviews">
                My Reviews
              </NavLink>
            </ToggleButton>
            <ToggleButton
                key="Dashboard"
                type="radio"
                value="Dashboard"
                variant={selected=== "Dashboard" ? "danger": "outline-dark" }
                onClick={()=>handleSelect("Dashboard")}


            >
              <NavLink className="user-links" to="/user_profile">
                Dashboard
              </NavLink>
            </ToggleButton>
          </ButtonGroup>
        </div>
      </div>
      <div className="right">{children}</div>
    </div>
  );
};

export default DashboardRoutesReusableTemplate;
