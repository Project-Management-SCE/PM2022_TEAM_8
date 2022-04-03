import React from "react";
import "./NavLinks.css";
import { NavLink } from "react-router-dom";
import IconContainer from "../util/IconContainer";
import { colors } from "../Style/colors";
import home from "../assets/icons/home.png";
import logoutImg from "../assets/icons/logout.png";

import user from "../assets/icons/user.png";
import {useDispatch} from "react-redux";
import {logout} from "../redux/reducers/auth-reducer";

const NavLinks = (props) => {
    const dispatch = useDispatch()
    const onLogout = () => {
        dispatch(logout())
    }
  return (
    <div className="nav-links">

      <NavLink to="/" exact>
        <IconContainer
          image={home}
          width={45}
          height={45}
          backgroundColor={colors.primaryColor}
          border={true}
          borderColor={colors.white}
          imageDimensions={{ width: 25, height: 25 }}
        />
      </NavLink>

      <NavLink to="/user_profile" exact>
        <IconContainer
          image={user}
          width={45}
          height={45}
          backgroundColor={colors.primaryColor}
          border={true}
          borderColor={colors.white}
          imageDimensions={{ width: 25, height: 25 }}
          title="User Profile"
        />
      </NavLink>
      <NavLink to="/" exact onClick={onLogout}>
        <IconContainer
          image={logoutImg}
          width={45}
          height={45}
          backgroundColor={colors.primaryColor}
          border={true}
          borderColor={colors.white}
          imageDimensions={{ width: 25, height: 25 }}
          title="Log Out"
        />
      </NavLink>

      <NavLink to="/login" exact>
        <button className="login-btn">Log In</button>
      </NavLink>

    </div>
  );
};

export default NavLinks;
