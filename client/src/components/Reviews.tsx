import {List, Comment} from 'antd';
import React, {FC, useEffect, useState} from 'react';
import {IReview, NewReview} from '../api/internalAPI/internalApiTypes';
import "../Style/Reviews.css";
import {faFlag, faThumbsDown, faThumbsUp} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import messageApi from '../api/internalAPI/messageApi';
import AddReviewModal from "./AddReviewModal";
import {useDispatch} from "react-redux";
import {appActions} from "../redux/reducers/app-reducer";
import AddReportModal from "./AddReportModal";

interface ReviewsProps {
    movieID: string;
    contentTitle:string;
    type: "TVSERIES" | "MOVIE";
    isReviewModalVisible: boolean;
    setIsReviewModalVisible: (isReviewModalVisible: boolean) => void;
}
const Reviews:FC<ReviewsProps> = ({movieID,setIsReviewModalVisible,isReviewModalVisible,contentTitle,type}) => {
    const [reviews, setReviews] = React.useState<IReview[]>([]);
    const [currentReviewId, setReviewId] = React.useState("");
    const [isReportVisible, setReportVisible] = useState(false);
    const onReport = (reviewId: string) => {
        setReviewId(reviewId);
        setReportVisible(true);
    };
    const dispatch = useDispatch()
    const addReview = async (newReview:NewReview) => {
        try {
            const data  = await messageApi.addReview(newReview)
            setReviews([...reviews,data.review])
            dispatch(appActions.setSuccess("Review added successfully"))
        }catch (e:any) {
            dispatch(appActions.setError(e.response?.data?.message || "Error adding review"))
        }finally {
            setIsReviewModalVisible(false);
        }

    };
    const addReport = async (reviewId :string, subject :string, text:string) => {
        try {
            await messageApi.addReport(reviewId,subject,text)
            dispatch(appActions.setSuccess("Reported successfully"))
        }catch (e:any) {
            dispatch(appActions.setError(e.response?.data?.message || "Error reporting"))
        }

    };
    useEffect(() => {
        messageApi.getReviewsByMovie(movieID).
       then(data => {
            console.log(data);
            setReviews(data.reviews)});
    }, [movieID]);
    return (
        <div className={"reviews-container"}>
            <AddReviewModal isModalVisible={isReviewModalVisible }
                            setModalVisible={ setIsReviewModalVisible}
                            onFinish={addReview}
                            contentId={movieID}
                            contentTitle={contentTitle}
                            type={type}
            />
            <AddReportModal isModalVisible={isReportVisible} setModalVisible={setReportVisible} onFinish={addReport} reviewId={currentReviewId} />
        <List<IReview>
            className="review-list"
            bordered={true}
            rowKey={(item: IReview) => item.userEmail}
            header={`${reviews.length} Reviews`}
            itemLayout="horizontal"
            dataSource={reviews}
            renderItem={rev => (
                    <Comment
                        className={'review-item'}
                        author={
                        <>
                            <h4>{rev.userEmail.split('@')[0]}</h4>
                        </>
                       }
                        content={<>
                            <FontAwesomeIcon onClick={()=>onReport(rev.reviewID)} className="like-icon review-report" icon={faFlag} />
                            { rev.text}
                        </>}
                        actions={[
                            <FontAwesomeIcon  className="like-icon review-recommend" icon={rev.recommendation?
                                faThumbsUp: faThumbsDown} style={{color:rev.recommendation?"green":"red"}}/>
                        ]}
                   />


            )}
        />
        </div>
    );
};

export default Reviews;
