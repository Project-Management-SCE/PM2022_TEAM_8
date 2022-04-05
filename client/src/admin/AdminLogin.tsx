import React, { useState } from "react";
import { Eye } from "react-bootstrap-icons";
import "../Style/registerStyle.css";
import {useDispatch} from "react-redux";
import { login } from "../redux/reducers/auth-reducer";

export const AdminLogin = () => {
  const dispatch = useDispatch()
  const [passwordInput, setPasswordInput] = useState<string>("password");
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const handleSubmit = (e:any)=> {
      e.preventDefault();
      dispatch(login(email,password,true));
  }
  return (
    <div className="container">
      {" "}
      <h1>Manager Control Panel</h1>
      <form>
        <div className="formDiv">
          <input type="email"
                 className="formInput"
                 placeholder="Admin Email"
                 onChange={e=>setEmail(e.target.value)}
                 value={email}
          />
        </div>
        <div className="formDiv">
          <input
            onChange={(e)=>setPassword(e.target.value)}
            value={password}
            type={passwordInput}
            className="formInput"
            placeholder="Password"
          />
          <Eye
            size={20}
            onClick={() => {
              if (passwordInput === "password") {
                setPasswordInput("text");
              } else {
                setPasswordInput("password");
              }
            }}
          />
        </div>

        <input type="submit" value="Connect" className="submit" onClick={handleSubmit}/>
      </form>
    </div>
  );
};

export default AdminLogin;
