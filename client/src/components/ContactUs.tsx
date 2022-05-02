import React, {FC, useState } from "react";
import "../Style/registerStyle.css";
import {useDispatch} from "react-redux";
import {sendMessage} from "../redux/reducers/message-reducer";

export const ContactUs:FC = () => {
    const dispatch = useDispatch()
    const [subject, setSubject] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [text, setText] = useState<string>("");
    function onFinish (e:any) {
        e.preventDefault();
        if(email !=="" && subject !=="" && text !==""){
            dispatch(sendMessage(email,subject,text));
        }
    }
    return (
        <div className="container">
            <form onSubmit={onFinish}>
                <div className="formDiv">
                    <input type="email"
                           data-testid="email"
                           className="formInput"
                           placeholder="Your Email"
                           onChange={e=>setEmail(e.target.value)}
                           value={email}
                           required={true}
                    />
                </div>
                <div className="formDiv">
                    <input
                        data-testid="subject"
                        onChange={(e)=>setSubject(e.target.value)}
                        value={subject}
                        type={"text"}
                        className="formInput"
                        placeholder="Subject"
                        required={true}
                    />
                </div>
                <div className="textAreaDiv">
                     <textarea
                         data-testid="text"
                         onChange={(e)=>setText(e.target.value)}
                         value={text}
                         className="formInput textArea"
                         placeholder={"About"}
                         required={true}
                     />
                </div>


                <input type="submit" value="Send" className="submit"/>
            </form>
        </div>
    );
};

export default ContactUs;
