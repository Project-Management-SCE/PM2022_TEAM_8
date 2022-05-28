import React, {FC, useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClose, faThumbsDown, faThumbsUp} from "@fortawesome/free-solid-svg-icons";
import { Modal } from 'antd';
import {NewReview} from "../api/internalAPI/internalApiTypes";


interface AddReviewModalProps {
    isModalVisible: boolean;
    setModalVisible: (value:boolean) => void;
    onFinish: (review:NewReview) => void;
    type: "TVSERIES" | "MOVIE"
    contentId: string;
    contentTitle: string;

}
const AddReviewModal:FC<AddReviewModalProps> = ({isModalVisible,
                                                    setModalVisible,onFinish,
                                                    type,contentId,contentTitle}) => {
    const [text,setText] = useState('');
    const [recommend,setRecommend] = useState(false);
    const colorRec = recommend ? '#52c41a' : '#989898';
    const colorNotRec = recommend ? '#989898' : '#f5222d';
    return (
        <Modal
            title={`Review`}
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
                    onFinish({
                    type,
                    movieID: contentId,
                    recommendation: recommend,
                    text,
                    movieTitle: contentTitle
                    })
                }
                }>
                    <div className="textAreaDiv">
                     <textarea
                         data-testid="text"
                         onChange={(e)=>setText(e.target.value)}
                         value={text}
                         className="formInput textArea"
                         placeholder={"Write your review here"}
                         required={true}
                     />
                    </div>
                    <div className="formDiv">
                        <h4 style={{marginLeft:"1rem"}}>Do you recommend this content?</h4>
                        <FontAwesomeIcon  style={{height:30,marginLeft:"1rem",color:colorRec,cursor:"pointer"}}
                                          className="like-icon" icon={faThumbsUp} onClick={()=>setRecommend(true)}/>
                        <FontAwesomeIcon  style={{height:30,marginLeft:"1rem",color:colorNotRec,cursor:"pointer"}}
                                          className="like-icon" icon={faThumbsDown} onClick={()=>setRecommend(false)}/>
                    </div>
                    <input type="submit" value="Post Review" className="submit"/>
                </form>
            </div>
        </Modal>
    );
};

export default AddReviewModal;