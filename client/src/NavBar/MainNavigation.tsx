import React, {FC, useState} from "react";
import "./MainNavigation.css";
import MainHeader from "./MainHeader";
import {Link} from "react-router-dom";
import NavLinks from "./NavLinks";
import SideDrawer from "./SideDrawer";
import Backdrop from "../util/UIElements/Backdrop";
import logo from "../assets/icons/Logo.png"
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";


const MainNavigation:FC = () => {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const openDrawer = () => {
    setDrawerIsOpen(true);
  };
  const closeDrawer = () => {
    setDrawerIsOpen(false);
  };
  return (
    <>
      {drawerIsOpen && <Backdrop onClick={closeDrawer} />}
      {
        <SideDrawer show={drawerIsOpen} onClick={closeDrawer}>
          <nav className="main-navigation__drawer-nav">
            <NavLinks />
          </nav>
        </SideDrawer>
      }
      <MainHeader>
        <div className="main-navigation__title">
          <div className="logo-container">
            <Link to={'/'} className="logo-redirect-home">
              <img src={logo} alt="logo" className="logo-img" />
              <span className="logo-title">2</span>
              <img src={logo} alt="logo" className="logo-img" />
            </Link>
          </div>
          <input type='text'
                 className="searchInput"
                 placeholder="search"
                 value={query}
                 onChange={(e)=>setQuery(e.target.value)}
          />
              <Link to={`search/${query}`}>
                <FontAwesomeIcon className="fa-icon" icon={faSearch}/>
              </Link>
          <div>

            {!drawerIsOpen && <div className="wideScreenLinks">

              <NavLinks />


            </div>
            }
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            width: "5rem",
          }}
        >
          <button className="main-navigation__menu-btn" onClick={openDrawer}>
            <span />
            <span />
            <span />
          </button>
        </div>
      </MainHeader>
    </ >
  );
};

export default MainNavigation;
