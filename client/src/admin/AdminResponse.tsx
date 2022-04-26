import React, {FC, useState} from "react";
import {Table, Space, Button, Tooltip} from "antd";
import "./admin.css";
import {AppStateType} from "../redux/Store";
import {useDispatch, useSelector} from "react-redux";
import { MailOutlined } from "@ant-design/icons";
import ResponseModal from "../components/ResponseModal";


export interface ITicket{
    ticketID:string
    subject:string
    text:string
    email:string
    status:string
}

const data = [
    {
        ticketID: "1",
        subject: "Lorem ipsum dolor",
        text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi 
            ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit
             in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
             occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
        email: "test@gmail.com",
        status:"Opened"

    },
    {
        ticketID: "2",
        subject: "Lorem ipsum dolor 2",
        status:"Opened",
        text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi 
            ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit
             in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
             occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
        email: "test2@gmail.com",

    },
    {
        ticketID: "3",
        subject: "Lorem ipsum dolor 3",
        status:"Opened",
        text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi 
            ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit
             in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
             occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
        email: "test3@gmail.com",

    },
];
export const AdminResponse: FC = () => {
    const dispatch = useDispatch();
    const [isModalVisible,setModalVisible] = useState(false);
    const [currentTicket,setCurrentTicket] = useState<ITicket | undefined>(undefined)
    const onResponse = (ticket:ITicket) => {
        setCurrentTicket(ticket);
        setModalVisible(true);
    };
    const onSubmit = () => {

    };

    const isFetching = useSelector(
        (state: AppStateType) => state.admin.isFetching
    ) as boolean;
    const columns = [
        //Fit data structure to backend
        {
            title: "ticketID",
            dataIndex: "ticketID",
            key: "ticketID"
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "ticketID"
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "ticketID",
        },
        {
            title: "Subject",
            key: "ticketID",
            dataIndex: "subject",
        },
        {
            title: "Text",
            dataIndex: "text",
            key: "ticketID",
        },
        {
            title: "Action",
            key: "email",
            render: (_: any, record: ITicket) => (
                <Space size="middle">
                    <Tooltip title="Response">
                    <Button shape="circle" icon={<MailOutlined />}  onClick={()=>onResponse(record)}/>
                        </Tooltip >
                </Space>
            ),
        },
    ];
    return (
        <div>
            <ResponseModal isModalVisible={isModalVisible}
                           setModalVisible={setModalVisible}
                           ticket={currentTicket}

            />
            <div className="info_container">
                <h2>Users List</h2>
                <Table
                    columns={columns}
                    dataSource={data}
                    loading={isFetching}
                />
            </div>
        </div>
    );
};
