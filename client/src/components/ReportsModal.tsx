import React, {FC, useEffect} from 'react';
import {Modal, Table} from "antd";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClose} from "@fortawesome/free-solid-svg-icons";
import {useDispatch, useSelector} from "react-redux";
import {getReports} from "../redux/reducers/admin-reducer";
import {AppStateType} from "../redux/Store";
import {IReport} from "../api/internalAPI/internalApiTypes";
interface ReportsModalProps {
    isModalVisible: boolean;
    setModalVisible: (value:boolean) => void;
    reviewID: string;
}

const columns = [

    {
        title: "Report Reason",
        key: "text",
        dataIndex: "subject",
        width: "20%",
    },
    {
        title: "Reported By",
        key: "reportedBy",
        dataIndex: "reportedBy",
        width: "20%",
    },
    {
        title: "Description",
        key: "text",
        dataIndex: "text",

    }
];

const ReportsModal:FC<ReportsModalProps> = ({isModalVisible,setModalVisible,reviewID}) => {
    const dispatch = useDispatch();
    useEffect(() => {
       dispatch(getReports(reviewID))
    },[reviewID])
    const reports = useSelector<AppStateType>(state => state.admin.reports) as IReport[]
    return (
        <Modal
            title={`${reports.length} Reports for review`}
            visible={isModalVisible}
            width={1000}
            onCancel={()=>setModalVisible(false)}
            footer={null}
            destroyOnClose={true}
            closeIcon={<FontAwesomeIcon className="fa-icon" icon={faClose} />}
            bodyStyle={{ background: "#eeeeee" }}
        >
            <Table  columns={columns} dataSource={reports} pagination={false} />
        </Modal>
    );
};

export default ReportsModal;