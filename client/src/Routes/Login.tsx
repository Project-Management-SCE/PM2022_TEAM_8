import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Eye } from "react-bootstrap-icons";
import "../Style/registerStyle.css";

const Login = () => {
  const [passwordInput, setPasswordInput] = useState<string>("password");
  return (
    <div className="container">
      {" "}
      <h1>Log in to your account</h1>
      <form>
        <div className="formDiv">
          <input type="email" className="formInput" placeholder="Email" />
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
        <div className="checkBoxDiv">
          <input type="checkbox" />
          <span>
            By using this form you agree to the storage and handling of your
            data by this site.
          </span>
        </div>
        <input type="submit" value="Connect" className="submit" />
      </form>
      <NavLink to="/register" className="linkStyle">
        <button>Create Account</button>
      </NavLink>
    </div>
  );
};

export default Login;
