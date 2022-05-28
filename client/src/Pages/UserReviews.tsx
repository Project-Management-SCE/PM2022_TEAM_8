import React, {useEffect} from "react";
import DashboardRoutesReusableTemplate from "../components/DashboardRoutesReusableTemplate";
import "../Style/userProfile.css";
import {Comment, List} from "antd";
import {IReview, IUser} from "../api/internalAPI/internalApiTypes";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faThumbsDown, faThumbsUp} from "@fortawesome/free-solid-svg-icons";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../redux/Store";
import {getReviews} from "../redux/reducers/user-reducer";
export const UserReviews = () => {
  const user = useSelector<AppStateType>(state=>state.auth.user) as IUser;
  const reviews = useSelector<AppStateType>(state=>state.user.reviews) as IReview[];
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(getReviews(user.id!))
  },[])
  return (
    <DashboardRoutesReusableTemplate
      children={
            <div className={"user-reviews-container"}>
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
                            author={<h4>{rev.movieTitle}</h4>}
                            content={rev.text}
                            actions={[
                                <FontAwesomeIcon  className="like-icon review-recommend" icon={rev.recommendation?
                                    faThumbsUp: faThumbsDown} style={{color:rev.recommendation?"green":"red"}}/>
                            ]}
                        />


                    )}
                />
            </div>
      }
    />
  );
};
