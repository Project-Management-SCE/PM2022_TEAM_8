import React from "react";
import { Link, NavLink } from "react-router-dom";
import IconContainer from "../util/IconContainer";
import { colors } from "../Style/colors";
import logoutImg from "../assets/icons/logout.png";
import { logout } from "../redux/reducers/auth-reducer";
import { useDispatch } from "react-redux";
import "./admin.css";

const AdminControl = () => {

  const dispatch = useDispatch();
  const onLogout = () => {
    dispatch(logout());
  };
  return (
    <>
      <nav className="admin_nav">
        <div className="nav-div">
          <h1>Admin Control</h1>
          <Link to="/admin_control/users_list" className="nav-link">
            Users
          </Link>
          <Link to="/admin_control/reviews_list" className="nav-link">
            Reviews
          </Link>
          <Link to="/admin_control/admin_register" className="nav-link">
            Admin Register
          </Link>
          <Link to="/admin_control/admin_response" className="nav-link">
            Response
          </Link>
        </div>
        <div className="admin_service">
          <NavLink to="/" onClick={onLogout} className="admin_btn">
            <IconContainer
              image={logoutImg}
              width={45}
              height={45}
              backgroundColor={colors.darkGray}
              border={true}
              borderColor={colors.white}
              imageDimensions={{ width: 25, height: 25 }}
              title="Log Out"
            />
          </NavLink>
          <span>Hello, Admin</span>
        </div>
      </nav>
    </>
  );
};

export default AdminControl;
