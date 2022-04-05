import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Eye } from "react-bootstrap-icons";
import "../Style/registerStyle.css";
import { useDispatch } from "react-redux";
import { login } from "../redux/reducers/auth-reducer";

const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState<string>("password");
  function onFinish() {
    dispatch(login(email, passwordInput));
  }
  return (
    <div className="container">
      {" "}
      <h1>Log in to your account</h1>
      <form>
        <div className="formDiv">
          <input
            type="email"
            className="formInput"
            placeholder="Email"
            onChange={(e) => setEmailInput(e.target.value)}
          />
        </div>
        <div className="formDiv">
          <input
            type={"password"}
            className="formInput"
            placeholder="Password"
            onChange={(e) => setPasswordInput(e.target.value)}
          />
        </div>
        <div className="checkBoxDiv">
          <input type="checkbox" />
          <span>
            By using this form you agree to the storage and handling of your
            data by this site.
          </span>
        </div>
        <input
          type="submit"
          value="Connect"
          className="submit"
          onClick={onFinish}
        />
      </form>
      <NavLink to="/register" className="linkStyle">
        <button>Create Account</button>
      </NavLink>
    </div>
  );
};

export default Login;
