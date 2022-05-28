import React, {FC, useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClose} from "@fortawesome/free-solid-svg-icons";
import { Modal } from 'antd';

interface AddReviewModalProps {
    isModalVisible: boolean;
    setModalVisible: (value:boolean) => void;
    onFinish: (reviewId :string,
               subject :string,
               text:string) => void;
    reviewId: string;

}
const AddReviewModal:FC<AddReviewModalProps> = ({isModalVisible,
                                                    setModalVisible,onFinish,
                                                   reviewId}) => {
    const [text,setText] = useState('');
    const [subject,setSubject] = useState("");
    console.log(reviewId);
    return (
        <Modal
            title={`Report Review`}
            visible={isModalVisible}
            width={1000}
            onCancel={()=>setModalVisible(false)}
            footer={null}
            destroyOnClose={true}
            closeIcon={<FontAwesomeIcon className="fa-icon" icon={faClose} />}
            bodyStyle={{ background: "#eeeeee" }}
        >
            <div className="container">
                <form onSubmit={(e) => {
                    e.preventDefault();
                    onFinish(
                        reviewId,
                        subject,
                        text
                    )
                    setText('');
                    setSubject('');
                    setModalVisible(false);
                }
                }>
                    <div className="formDiv">
                        <input
                            type="text"
                            className="formInput"
                            placeholder="Report Reason"
                            data-testid="subject"
                            name="subject"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                        />
                    </div>
                    <div className="textAreaDiv">
                     <textarea
                         data-testid="text"
                         onChange={(e)=>setText(e.target.value)}
                         value={text}
                         className="formInput textArea"
                         placeholder={"Describe your report"}
                         required={true}
                     />
                    </div>

                    <input type="submit" value="Report" className="submit"/>
                </form>
            </div>
        </Modal>
    );
};

export default AddReviewModal;