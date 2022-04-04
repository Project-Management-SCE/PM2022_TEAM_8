import React, {FC} from "react";
import "./NavLinks.css";
import {Navigate, NavLink, Route, Routes} from "react-router-dom";
import IconContainer from "../util/IconContainer";
import { colors } from "../Style/colors";
import home from "../assets/icons/home.png";
import logoutImg from "../assets/icons/logout.png";

import user from "../assets/icons/user.png";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../redux/reducers/auth-reducer";
import {adminRoutes, publicRoutes, RouteNames, userRoutes} from "../Routes/routes";
import {AppStateType} from "../redux/Store";

const NavLinks : FC = () => {
    const isAuth = useSelector<AppStateType>(state => state.auth.isAuth) as boolean
    const type = useSelector<AppStateType>(state => state.auth.user?.type) as string
    const dispatch = useDispatch()
    const onLogout = () => {
        dispatch(logout())
    }
  return (

    <div className="nav-links">
        {isAuth && type === "User" ?
            <NavLink to="/user_profile" >

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
        : ''}
      <NavLink to="/" >
          <IconContainer
              image={home}
              width={45}
              height={45}
              backgroundColor={colors.primaryColor}
              border={true}
              borderColor={colors.white}
              imageDimensions={{width: 25, height: 25}}
          />
      </NavLink>
      <NavLink to="/"  onClick={onLogout}>
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

      <NavLink to="/login" >
        <button className="login-btn">Log In</button>
      </NavLink>

    </div>
  );
};

export default NavLinks;
//
//
// isAuth &&   type === "User" ?
//     <Routes>
//         {userRoutes.map(route =>
//             <Route path={route.path}
//                    element={<route.element/>}
//                    key={route.path}
//             />
//         )}
//         <Route path="*" element={<Navigate replace to={RouteNames.HOME} />} />
//     </Routes>
//     :
//     isAuth &&   type === "Admin" ?
//         <Routes>
//             {adminRoutes.map(route =>
//                 <Route path={route.path}
//                        element={<route.element/>}
//                        key={route.path}
//                 />
//             )}
//             <Route path="*" element={<Navigate replace to={RouteNames.HOME} />} />
//         </Routes>
//         :
//         <Routes>
//             {publicRoutes.map(route =>
//                 <Route path={route.path}
//                        element={<route.element/>}
//                        key={route.path}
//                 />
//             )}
//             <Route path="*" element={<Navigate replace to={RouteNames.HOME} />} />
//         </Routes>