import React from "react";
import { NavLink } from "react-router-dom";
import "../Style/registerStyle.css";

export const RecoverPassword = () => {
  return (
    <div className="container">
      <h1>Password Recovery</h1>

      <form>
        <div className="formDiv">
          <input
            type="email"
            className="formInput"
            placeholder="Email"
            // onChange={(e) => setEmailInput(e.target.value)}
          />
        </div>
        <input
          type="submit"
          value="Send"
          className="submit"
          //   onClick={onFinish}
        />
      </form>
    </div>
  );
};
