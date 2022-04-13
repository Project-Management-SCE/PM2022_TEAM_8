import React, { useState } from "react";
import "../Style/registerStyle.css";
import {useDispatch} from "react-redux";
import { login } from "../redux/reducers/auth-reducer";

export const AdminLogin = () => {
  const dispatch = useDispatch()
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  function onFinish (e:any) {
      e.preventDefault();
      if(email !=="" && password !==""){
          dispatch(login(email, password, true));
      }

  }
  return (
    <div className="container">
      <h1>Manager Control Panel</h1>
      <form onSubmit={onFinish}>
        <div className="formDiv">
          <input type="email"
                 data-testid="email"
                 className="formInput"
                 placeholder="Admin Email"
                 onChange={e=>setEmail(e.target.value)}
                 value={email}
                 required={true}
          />
        </div>
        <div className="formDiv">
          <input
            data-testid="password"
            onChange={(e)=>setPassword(e.target.value)}
            value={password}
            type={"password"}
            className="formInput"
            placeholder="Password"
            required={true}
          />
        </div>

        <input type="submit" value="Connect" className="submit"/>
      </form>
    </div>
  );
};

export default AdminLogin;
