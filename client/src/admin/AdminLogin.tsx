import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Eye } from "react-bootstrap-icons";
import "../Style/registerStyle.css";

export const AdminLogin = () => {
  const [passwordInput, setPasswordInput] = useState<string>("password");

  return (
    <div className="container">
      {" "}
      <h1>Manager Control Panel</h1>
      <form>
        <div className="formDiv">
          <input type="email" className="formInput" placeholder="Admin Email" />
        </div>
        <div className="formDiv">
          <input
            type={passwordInput}
            className="formInput"
            placeholder="Password"
          />
          <Eye
            size={20}
            onMouseEnter={() => setPasswordInput("text")}
            onMouseLeave={() => setPasswordInput("password")}
            onClick={() => {
              if (passwordInput === "password") {
                setPasswordInput("text");
              } else {
                setPasswordInput("password");
              }
            }}
          />
        </div>

        <input type="submit" value="Connect" className="submit" />
      </form>
    </div>
  );
};

export default AdminLogin;
