import React, {FC} from "react";
import "./NavLinks.css";
import {Link} from "react-router-dom";
import IconContainer from "../util/IconContainer";
import { colors } from "../Style/colors";
import home from "../assets/icons/home.png";
import logoutImg from "../assets/icons/logout.png";
import user from "../assets/icons/user.png";
import {useDispatch, useSelector} from "react-redux";
import  {logout} from "../redux/reducers/auth-reducer";
import {AppStateType} from "../redux/Store";
import {IUser} from "../api/internalAPI/internalApiTypes";

const NavLinks : FC = () => {
    const isAuth = useSelector<AppStateType>(state => state.auth.isAuth) as boolean
    const curr_user = useSelector<AppStateType>(state => state.auth.user) as IUser
    const dispatch = useDispatch()
    const onLogout = () => {
        dispatch(logout())
    }
    return (

    <div className="nav-links">
        {isAuth && (curr_user.type === "User" || curr_user.type === "Admin")?
            <>
                <Link to="/user_profile" >

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
            </Link>
                <Link to="/"  onClick={onLogout}>
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
                </Link>
                <p className={"user-welcome"}>Welcome, {curr_user.firstName}</p>
            </>

        : <>
                <Link to="/" >
                    <IconContainer
                        image={home}
                        width={45}
                        height={45}
                        backgroundColor={colors.primaryColor}
                        border={true}
                        borderColor={colors.white}
                        imageDimensions={{width: 25, height: 25}}
                    />
                </Link>
                <Link to="/login" >
                    <button className="login-btn">Log In</button>
                </Link>
                <Link to="/register" >
                    <button className="register-btn">Register</button>
                </Link>
            </>


        }


    </div>
  );
};

export default NavLinks;
