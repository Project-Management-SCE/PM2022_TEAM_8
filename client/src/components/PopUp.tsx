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
          <h2>Benefits of your W2W (free!) account</h2>
          <div className="benefits">
            <span>Keep track of your currently watched content in your watchlist!</span>
            <p>Discover content you'll love, and keep track of it!</p>
            <span>Your Reviews</span>
            <p>
              Write what you thought about the content, for everyone to see!
            </p>
            <span>Full access</span>
            <p>Unlimited access the site, browse all the series and movies, and look at all the expanded info about our content!</p>
          </div>
          <NavLink to="/register" className="linkStyle">
            <button>Create Account</button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};
