import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {resetPassword} from "../redux/reducers/user-reducer";
import {useNavigate, useParams} from "react-router-dom";


export const ChangePassword = () => {
  let navigate = useNavigate()
  const dispatch = useDispatch()
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const {token}= useParams()
  if(!token){
    navigate('/')
  }
  const onFinish = () => {
    if(password === password2) {
      dispatch(resetPassword(password, token!))
      navigate('/login')
    }
    else{
      //TODO: Passwords dont match
    alert("Passwords don't match!")
    }
  };
  return (
    <div className="container">
      {" "}
      <h1>Change Password</h1>
      <form>
        <div className="formDiv">
          <input
            type={"password"}
            value={password}
            className="formInput"
            placeholder="New Password"
             onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="formDiv">
          <input
            type={"password"}
            value={password2}
            className="formInput"
            placeholder="Confirm Password"
             onChange={(e) => setPassword2(e.target.value)}
          />
        </div>

        <input
          type="submit"
          value="Change"
          className="submit"
             onClick={onFinish}
        />
      </form>
     
    </div>
  );
};
