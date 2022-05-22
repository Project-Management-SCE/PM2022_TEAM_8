import React, {useState} from "react";
import { Table, Space } from "antd";
import "./admin.css";
import ReportsModal from "../components/ReportsModal";
import {IReview} from "../api/internalAPI/internalApiTypes";




const data = [
  {
    reviewID:"231421",
    userID: "12",
    movieID: "2",
    recommendation: true,
    movieTitle: " Wonder-Woman 2021",
    text: "My review stinks enough for you to wipe me to hell",
    userEmail: "taloh13@gmail.com",
  },
  {
    reviewID:"231421",
    movieID: "1",
    userID: "1",
    recommendation: true,
    movieTitle: " Wonder-Woman 2031",
    text: "My review stinks enough for you to wipe me to hell",
    userEmail: "taloh23@gmail.com",
  },
  {
   reviewID:"231421",
    movieID: "1",
    userID: "1",
    recommendation: true,
    movieTitle: " Wonder-Woman 2022",
    text: ` Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi consequatur cumque dignissimos
     dolores fugiat, quos suscipit tempora tenetur unde voluptates. Adipisci dolor 
     eos nemo perferendis perspiciatis quia ratione, sunt veritatis?
     Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi consequatur cumque dignissimos
     dolores fugiat, quos suscipit tempora tenetur unde voluptates. Adipisci dolor 
     eos nemo perferendis perspiciatis quia ratione, sunt veritatis?
     Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi consequatur cumque dignissimos
     dolores fugiat, quos suscipit tempora tenetur unde voluptates. Adipisci dolor 
     eos nemo perferendis perspiciatis quia ratione, sunt veritatis?
     Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi consequatur cumque dignissimos
     dolores fugiat, quos suscipit tempora tenetur unde voluptates. Adipisci dolor 
     eos nemo perferendis perspiciatis quia ratione, sunt veritatis?
     Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi consequatur cumque dignissimos
     dolores fugiat, quos suscipit tempora tenetur unde voluptates. Adipisci dolor 
     eos nemo perferendis perspiciatis quia ratione, sunt veritatis?
     `,
    userEmail: "taloh23@gmail.com",
  }
] as IReview[];


export const ReviewsList = () => {
  const [visible, setVisible] = useState(false);
  const [currentReviewID, setCurrentReviewID] = useState("");
  const handleClose = () => {
    setCurrentReviewID("");
    setVisible(false);
  };
  const handleOpen = (id: string) => {
    setCurrentReviewID(id);
    setVisible(true);
  };
  const columns = [
    {
      title: "Email",
      dataIndex: "userEmail",
      key: "userEmail",
    },
    {
      title: "Movie/Series Name",
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
          report: IReview
      ) => (
          <Space size="middle">
            <a onClick={()=>handleOpen(report.reviewID)}>Reports</a>
            <a>Delete</a>
          </Space>
      ),
    },
  ];

  return (
    <div>
      <div className="info_container">
        {currentReviewID && <ReportsModal setModalVisible={handleClose} isModalVisible={visible} reviewID={currentReviewID}/>}
        <h2>Reviews List</h2>
        <Table columns={columns} dataSource={data} pagination={false}/>
      </div>
    </div>
  );
};
