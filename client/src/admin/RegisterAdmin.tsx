import React, { useState } from "react";
import "../Style/registerStyle.css";
import {useDispatch} from "react-redux";
import {registerAdmin} from "../redux/reducers/admin-reducer";

const RegisterAdmin = () => {
    const dispatch = useDispatch()
    const [registerForm, setRegisterForm] = useState<any>({
        email: "",
        password: ""
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
        if(registerForm.email !== "" && registerForm.password !==  ""){
            dispatch(registerAdmin(registerForm.email,registerForm.password))
        }
    };
    return (
        <div>
            <div className="container">
                <h1>Register New Admin</h1>
                <form onSubmit={on_submit}>
                    <div className="formDiv">
                        <input
                            required={true}
                            type="email"
                            className="formInput"
                            data-testid="email"
                            placeholder="Email"
                            name="email"
                            value={registerForm.email}
                            onChange={handle_change}
                        />
                    </div>
                    <div className="formDiv">
                        <input
                            required={true}
                            type="password"
                            className="formInput"
                            data-testid="password"
                            placeholder="Password"
                            name="password"
                            value={registerForm.password}
                            onChange={handle_change}
                        />
                    </div>
                    <input type="submit" value="Create Admin Account" className="submit" />
                </form>

            </div>
        </div>
    );
};

export default RegisterAdmin;
