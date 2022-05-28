import React, {useEffect, useState} from "react";
import { Table, Space } from "antd";
import "./admin.css";
import ReportsModal from "../components/ReportsModal";
import {IReview} from "../api/internalAPI/internalApiTypes";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../redux/Store";
import {deleteReview, getReviews} from "../redux/reducers/admin-reducer";

export const ReviewsList = () => {
  const [visible, setVisible] = useState(false);
  const [currentReviewID, setCurrentReviewID] = useState("");
  const dispatch = useDispatch();
  const handleClose = () => {
    setCurrentReviewID("");
    setVisible(false);
  };
  const handleOpen = (id: string) => {
    setCurrentReviewID(id);
    setVisible(true);
  };
  const onDelete = (id: string) => {
    dispatch(deleteReview(id));
  };
  const columns = [
    {
      title: "Email",
      dataIndex: "userEmail",
      key: "userEmail",
    },
    {
      title: "Movie/TVShows Name",
      key: "movieTitle",
      dataIndex: "movieTitle",
    },
    {
      title: "User Review",
      key: "movieTitle",
      dataIndex: "text",
    },


    {
      title: "Action",
      key: "action",
      render: (
          _: any,
          review: IReview
      ) => (
          <Space size="middle">
            <a onClick={()=>handleOpen(review.reviewID)}>Reports</a>
            <a onClick={()=>onDelete(review.reviewID)}>Delete</a>
          </Space>
      ),
    },
  ];
  useEffect(() => {
    dispatch(getReviews());
  }, []);
 const reviews = useSelector<AppStateType>(state => state.admin.reviews) as IReview[];
  return (
    <div>
      <div className="info_container">
        {currentReviewID && <ReportsModal setModalVisible={handleClose} isModalVisible={visible} reviewID={currentReviewID}/>}
        <h2>Reviews List</h2>
        <Table columns={columns} dataSource={reviews} pagination={false}/>
      </div>
    </div>
  );
};
