import React, {FC, useEffect} from "react";
import {Table, Space} from "antd";
import "./admin.css";
import {deleteUser, getUsers, banUser, unbanUser} from "../redux/reducers/admin-reducer";
import {AppStateType} from "../redux/Store";
import {useDispatch, useSelector} from "react-redux";
import {IUser} from "../api/internalAPI/internalApiTypes";
let today = new Date();
let until = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + 7
);


export const UsersList: FC = () => {
    const dispatch = useDispatch();
    const onDelete = (email: string) => {
        dispatch(deleteUser(email));
    };

    const onBan = (email: string, date: Date) => {
        dispatch(banUser(email, date));
    };
    const onUnban = (email: string) => {
        dispatch(unbanUser(email));
    };
    const isFetching = useSelector(
        (state: AppStateType) => state.admin.isFetching
    ) as boolean;
    const columns = [
        //Fit data structure to backend
        {
            title: "First Name",
            dataIndex: "firstName",
            key: "email",
        },
        {
            title: "Last Name",
            key: "email",
            dataIndex: "lastName",
        },
        {
            title: "Phone",
            dataIndex: "phone",
            key: "email",
        },
        {
            title: "Address",
            dataIndex: "address",
            key: "email",
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Is Blocked",
            dataIndex: "isBlocked",
            key: "email",
            render: (_: any, record: IUser) =>
                record.isBlocked ? "Blocked" : "Not blocked",
        },
        {
            title: "Action",
            key: "email",
            render: (_: any, record: IUser) => (
                <Space size="middle">
                    {record.isBlocked ?
                        <a
                            onClick={() => {
                                onUnban(record.email!);
                            }}
                        >
                            Unban
                        </a>
                        :
                        <a
                            onClick={() => {
                                onBan(record.email!, until);
                            }}
                        >
                            Ban
                        </a>
                    }

                    <a
                        data-testid={record.email!}
                        onClick={() => {
                            onDelete(record.email!);
                        }}
                    >
                        Delete
                    </a>
                </Space>
            ),
        },
    ];
    const users = useSelector<AppStateType>(
        (state) => state.admin.users
    ) as IUser[];
    useEffect(() => {
        dispatch(getUsers());
    }, []);
    return (
        <div>
            <div className="info_container">
                <h2>Users List</h2>
                <Table
                    columns={columns}
                    rowKey={(record) => record.email!}
                    dataSource={users}
                    loading={isFetching}
                    pagination={false}
                />
            </div>
        </div>
    );
};
