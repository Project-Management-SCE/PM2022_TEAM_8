import React from "react";
import { NavLink } from "react-router-dom";

export const ChangePassword = () => {
  return (
    <div className="container">
      {" "}
      <h1>Change Password</h1>
      <form>
        <div className="formDiv">
          <input
            type={"password"}
            className="formInput"
            placeholder="New Password"
            // onChange={(e) => setPasswordInput(e.target.value)}
          />
        </div>
        <div className="formDiv">
          <input
            type={"password"}
            className="formInput"
            placeholder="Confirm Password"
            // onChange={(e) => setPasswordInput(e.target.value)}
          />
        </div>

        <input
          type="submit"
          value="Change"
          className="submit"
          //   onClick={onFinish}
        />
      </form>
     
    </div>
  );
};
