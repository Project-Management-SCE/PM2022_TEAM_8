import React, {FC, useState} from 'react';
import {Message} from "../admin/AdminResponse";
import {Button, Descriptions, Divider, Modal} from "antd";
import TextArea from 'antd/lib/input/TextArea';
import { ExportOutlined } from '@ant-design/icons';
import {useDispatch} from "react-redux";
import {sendReply} from "../redux/reducers/admin-reducer";

interface ResponseModalProps {
    isModalVisible:boolean
    setModalVisible: React.Dispatch<React.SetStateAction<boolean>>
    ticket?:Message
}

const ResponseModal:FC<ResponseModalProps> = ({ticket,isModalVisible, setModalVisible}) => {
    const dispatch = useDispatch();
    const [reply, setReply] = useState<string>("");

    const onFinish = (e:any) => {
        e.preventDefault()
        dispatch(sendReply(ticket!.email,reply,ticket!.ticketID))
        setModalVisible(false)
    };
    return (
        <>
        {ticket && <Modal
            title={`Contact us`}
            visible={isModalVisible}
            width={800}
            onCancel={()=>setModalVisible(false)}
            footer={null}
            bodyStyle={{ background: "#eeeeee" }}
        >
            <Descriptions
                title={`Ticket #${ticket.ticketID}`}
                bordered
                layout="vertical"
                labelStyle={{ fontWeight: "bold", fontSize: "1.2rem"}}
                column={{xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
            >
                <Descriptions.Item style={{textAlign:"center"}} label="From">{ticket.email}</Descriptions.Item>
                <Descriptions.Item style={{textAlign:"center"}} label="Subject">{ticket.subject}</Descriptions.Item>
                <Descriptions.Item style={{textAlign:"center"}} label="Status">{ticket.status}</Descriptions.Item>
                <Descriptions.Item style={{textAlign:"center"}} label="Description">{ticket.text}</Descriptions.Item>
            </Descriptions>
            <Divider>Reply</Divider>
            <TextArea
                rows={4}
                value={reply}
                onChange={(e)=>setReply(e.target.value)}
                placeholder={"Admin Reply"}
                required={true}
            />
            <Button
                onClick={onFinish}
                type="default"
                icon={<ExportOutlined />}
                style={{margin:"auto",marginTop:15}}
            >
                Send
            </Button >
        </Modal>}
        </>
    );
};

export default ResponseModal;