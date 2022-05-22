import React, {FC, useEffect} from 'react';
import {Modal, Table} from "antd";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClose} from "@fortawesome/free-solid-svg-icons";
interface ReportsModalProps {
    isModalVisible: boolean;
    setModalVisible: (value:boolean) => void;
    reviewID: string;
}

const data = [
    {
        reviewID: '1',
        userID: '1',
        subject: 'Lorem ipsum dolor sit amet',
        text: ', consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    },
    {
        reviewID: '1',
        userID: '1',
        subject: 'Lorem ipsum dolor sit amet',
        text: ', consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    },



   ]
const columns = [

    {
        title: "Report Reason",
        key: "text",
        dataIndex: "subject",
        width: "20%",
    },
    {
        title: "Description",
        key: "text",
        dataIndex: "text",

    }
];

const ReportsModal:FC<ReportsModalProps> = ({isModalVisible,setModalVisible,reviewID}) => {
    useEffect(() => {
        console.log(reviewID)
    },[reviewID])
    return (
        <Modal
            title={`${data.length} Reports for review`}
            visible={isModalVisible}
            width={1000}
            onCancel={()=>setModalVisible(false)}
            footer={null}
            destroyOnClose={true}
            closeIcon={<FontAwesomeIcon className="fa-icon" icon={faClose} />}
            bodyStyle={{ background: "#eeeeee" }}
        >
            <Table  columns={columns} dataSource={data} pagination={false} />
        </Modal>
    );
};

export default ReportsModal;