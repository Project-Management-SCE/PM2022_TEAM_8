import React, {FC, useEffect, useState} from "react";
import {Table, Space, Button, Tooltip} from "antd";
import "./admin.css";
import {AppStateType} from "../redux/Store";
import {useDispatch, useSelector} from "react-redux";
import { MailOutlined } from "@ant-design/icons";
import ResponseModal from "../components/ResponseModal";
import {getMessages} from "../redux/reducers/admin-reducer";


export interface Message{
    ticketID:string
    email:string
    subject:string
    text:string
    status:string
}


export const AdminResponse: FC = () => {

    const dispatch = useDispatch();
    const [isModalVisible,setModalVisible] = useState(false);
    const [currentTicket,setCurrentTicket] = useState<Message | undefined>(undefined)
    const onResponse = (ticket:Message) => {
        setCurrentTicket(ticket);
        setModalVisible(true);
    };
    const messages = useSelector<AppStateType>(
        (state) => state.admin.messages
    ) as Message[];
    useEffect(() => {
        dispatch(getMessages());
    }, []);
    const isFetching = useSelector(
        (state: AppStateType) => state.admin.isFetching
    ) as boolean;
    const columns = [
        {
            title: "Ticket #",
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
            render: (_: any, record: Message) => (
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
                <h2>Tickets List</h2>
                <Table
                    columns={columns}
                    dataSource={messages}
                    loading={isFetching}
                    rowKey={(record) => record.ticketID!}
                    pagination={false}
                />
            </div>
        </div>
    );
};
