import React, {useState} from "react";
import "../Style/registerStyle.css";
import {getRecoveryToken} from "../redux/reducers/user-reducer";
import {useDispatch} from "react-redux";


export const RecoverPassword = () => {
    const dispatch = useDispatch()
    const [email, setEmail] = useState("");
    const onFinish = () => {
        dispatch(getRecoveryToken(email))
    }
  return (
      <div className="container">
          <h1>Password Recovery</h1>

          <form>
              <div className="formDiv">
                  <input
                      type="email"
                      className="formInput"
                      value={email}
                      placeholder="Email"
                       onChange={(e) => setEmail(e.target.value)}
                  />
              </div>
              <input
                  type="submit"
                  value="Send"
                  className="submit"
                     onClick={onFinish}
              />
          </form>
      </div>
  );
};
