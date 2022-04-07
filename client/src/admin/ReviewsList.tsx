import React from "react";
import { Table, Space } from "antd";
import "./admin.css";

const data = [
  {
    key: "1",
    first_name: "Tal",
    last_name: "Ohana",
    phone: "0544436188",
    movie_name: " Wonder-Woman 2021",
    review: "My review stinks enough for you to wipe me to hell",
    email: "taloh13@gmail.com",
  },
];
const columns = [
  //Fit data structure to backend
  {
    title: "First Name",
    dataIndex: "first_name",
    key: "first_name",
    render: (text: String) => <a>{text}</a>,
  },
  {
    title: "Last Name",
    key: "last_name",
    dataIndex: "last_name",
  },
  {
    title: "Movie/Series Name",
    key: "movie_name",
    dataIndex: "movie_name",
  },
  {
    title: "User Review",
    key: "review",
    dataIndex: "review",
  },

  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },

  {
    title: "Action",
    key: "action",
    render: (
      text: any,
      record: {
        first_name: String;
      }
    ) => (
      <Space size="middle">
        <a>Ban Review</a>
        <a>Delete</a>
      </Space>
    ),
  },
];
export const ReviewsList = () => {
  return (
    <div>
      <div className="info_container">
        <h2>Reviews List</h2>
        <Table columns={columns} dataSource={data} />
      </div>
    </div>
  );
};
