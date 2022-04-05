import React from "react";
import AdminControl from "./AdminControl";
import { Table, Tag, Space } from "antd";
import "antd/dist/antd.css";
import "./admin.css";
const data = [
  {
    key: "1",
    first_name: "Tal",
    last_name: "Ohana",
    phone: "0544436188",
    address: "New York No. 1 Lake Park(I Wish)",
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
    title: "Phone",
    dataIndex: "phone",
    key: "phone",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
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
        <a>Ban {record.first_name}</a>
        <a>Delete</a>
      </Space>
    ),
  },
];
export const UsersList = () => {
  return (
    <div>
      <AdminControl />
      <div className="info_container">
        <h2>Users List</h2>
        <Table columns={columns} dataSource={data} />
      </div>
    </div>
  );
};
