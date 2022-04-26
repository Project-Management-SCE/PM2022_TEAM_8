import React, {FC} from 'react';
import {ITicket} from "../admin/AdminResponse";
import {Button, Descriptions, Divider, Modal} from "antd";
import TextArea from 'antd/lib/input/TextArea';
import { ExportOutlined } from '@ant-design/icons';

interface ResponseModalProps {
    isModalVisible:boolean
    setModalVisible: React.Dispatch<React.SetStateAction<boolean>>
    ticket?:ITicket
}

const ResponseModal:FC<ResponseModalProps> = ({ticket,isModalVisible, setModalVisible}) => {
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
            <form>
                <TextArea rows={4} />
                <Button
                    type="default"
                    icon={<ExportOutlined />}
                    style={{margin:"auto",marginTop:15}}
                >
                    Send
                </Button >
            </form>

        </Modal>}
        </>
    );
};

export default ResponseModal;