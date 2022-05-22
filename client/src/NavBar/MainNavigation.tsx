import React, {FC, useEffect, useState} from "react";
import "./MainNavigation.css";
import MainHeader from "./MainHeader";
import {Link, useLocation} from "react-router-dom";
import NavLinks from "./NavLinks";
import SideDrawer from "./SideDrawer";
import Backdrop from "../util/UIElements/Backdrop";
import logo from "../assets/icons/Logo.png"
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { Tooltip } from "antd";


const MainNavigation: FC = () => {
    const [drawerIsOpen, setDrawerIsOpen] = useState(false);
    const [isExtended, setIsExtended] = useState(false);
    const [query, setQuery] = useState("");
    const location = useLocation()
    const openDrawer = () => {
        setDrawerIsOpen(true);
    };
    const closeDrawer = () => {
        setDrawerIsOpen(false);
    };

    useEffect(()=>{
        if(location.pathname.includes("/extended-search")){
            setIsExtended(true)
        }else{
            setIsExtended(false)
        }
    },[location.pathname])
    return (
        <div style={{borderBottom: "1px solid #DA0037"}}>
            {drawerIsOpen && <Backdrop onClick={closeDrawer}/>}
            {
                <SideDrawer show={drawerIsOpen} onClick={closeDrawer}>
                    <nav className="main-navigation__drawer-nav">
                        <NavLinks/>
                    </nav>
                </SideDrawer>
            }
            <MainHeader>
                <div className="main-navigation__title">
                    <div className="logo-container">
                        <Link to={'/'} className="logo-redirect-home">
                            <img src={logo} alt="logo" className="logo-img"/>
                            <span className="logo-title">2</span>
                            <img src={logo} alt="logo" className="logo-img"/>
                        </Link>
                    </div>
                    <div className="search-container">

                        <input type='text'
                               className="searchInput"
                               placeholder="search"
                               value={query}
                               onChange={(e) => setQuery(e.target.value)}/>
                        {!isExtended && <Tooltip title="Click for more criteria">
                            <div className={"extended"}>

                                <Link style={{textDecoration:"none",color:"#d93939"}} to={'/extended-search/'}
                                >Discover </Link>
                            </div>
                        </Tooltip>}



                        <Link to={isExtended ? `extended-search/${query}` : `search/${query}`}>
                            <FontAwesomeIcon className="fa-icon" icon={faSearch}/>
                        </Link>
                    </div>

                    <div>

                        {!drawerIsOpen && <div className="wideScreenLinks">

                            <NavLinks/>


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
                        <span/>
                        <span/>
                        <span/>
                    </button>
                </div>
            </MainHeader>
        </div >
    );
};

export default MainNavigation;
