import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Eye } from "react-bootstrap-icons";
import "../Style/registerStyle.css";
import {register} from "../redux/reducers/auth-reducer";
import {useDispatch} from "react-redux";
// import axios from 'axios'

const Register = () => {
  const dispatch = useDispatch()
  const [passwordInput, setPasswordInput] = useState<string>("password");
  const [checkBoxState, setCheckBoxState] = useState<any>(false);
  const [registerForm, setRegisterForm] = useState<any>({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    address: "",
    phone_number: "",
  });
  const handle_change = (e: any) => {
    const { name, value } = e.target;
    setRegisterForm({
      ...registerForm,
      [name]: value,
    });
  };

  const on_submit = async (e: any) => {
    e.preventDefault();
    dispatch(register(registerForm.email,registerForm.password,registerForm.first_name,registerForm.last_name))
  };
  return (
    <div>
      <div className="container">
        <h1>Create Account</h1>
        <form onSubmit={on_submit}>
          <h2>Personal Information</h2>
          <div className="formDivHalfContainer">
            <div className="formDivHalf">
              <input
                type="text"
                className="formHalfInput"
                placeholder="First Name"
                name="first_name"
                value={registerForm.first_name}
                onChange={handle_change}
              />
            </div>
            <div className="formDivHalf">
              <input
                type="text"
                className="formHalfInput"
                placeholder="Last Name"
                name="last_name"
                value={registerForm.last_name}
                onChange={handle_change}
              />
            </div>
          </div>

          <div className="formDiv">
            <input
              type="number"
              className="formInput"
              placeholder="Phone"
              name="phone_number"
              value={registerForm.phone_number}
              onChange={handle_change}
            />
          </div>
          <div className="formDiv">
            <input
              type="text"
              className="formInput"
              placeholder="Address"
              name="address"
              value={registerForm.address}
              onChange={handle_change}
            />
          </div>

          <h2>Account login information</h2>
          <div className="formDiv">
            <input
              type="email"
              className="formInput"
              placeholder="Email"
              name="email"
              value={registerForm.email}
              onChange={handle_change}
            />
          </div>
          <div className="formDiv">
            <input
              type={passwordInput}
              className="formInput"
              placeholder="Password"
              name="password"
              value={registerForm.password}
              onChange={handle_change}
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
            <input
              type="checkbox"
              value={checkBoxState}
              onChange={() => setCheckBoxState(!checkBoxState)}
            />
            <span>
              By using this form you agree to the storage and handling of your
              data by this site.
            </span>
          </div>
          <input type="submit" value="Create Account" className="submit" />
        </form>

        <NavLink to="/login" className="linkStyle">
          <button>?Do you have an account</button>
        </NavLink>
      </div>
    </div>
  );
};

export default Register;
