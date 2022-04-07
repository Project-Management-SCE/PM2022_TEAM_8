import React from "react";
import { NavLink } from "react-router-dom";
import "../Style/popUp.css";

//handle close type element = React.MouseEventHandler<HTMLButtonElement> | undefined; ???
export const PopUp = (props: { handleClose: any }) => {
  return (
    <div className="popup-box">
      <div className="box">
        <button className="btn-close" onClick={props.handleClose}></button>
        <div className="popup-content">
          <h2>Benefits of your W2W account</h2>
          <div className="benefits">
            <span>Personalized Recommendations</span>
            <p>Discover shows you'll love.</p>
            <span>Your Watchlist</span>
            <p>
              Track everything you want to watch and receive e-mail when movies
              open in theaters.
            </p>
            <span>Your Reviews</span>
            <p>Rate and remember everything you've seen.</p>
          </div>
          <NavLink to="/register" className="linkStyle">
            <button>Create Account</button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};
