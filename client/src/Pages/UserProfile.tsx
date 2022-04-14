import React, { useState } from "react";
import DashboardRoutesReusableTemplate from "../components/DashboardRoutesReusableTemplate";
import { IUser } from "../api/internalAPI/internalApiTypes";
import {useDispatch, useSelector} from "react-redux";
import { AppStateType } from "../redux/Store";
import { Form, Input, Button, Radio, Switch } from "antd";
import "../Style/userProfile.css";
import {updateProfile} from "../redux/reducers/user-reducer";


type SizeType = Parameters<typeof Form>[0]["size"];

//TODO: enter inside user profile main page other stuff like newsletters, user details...
const UserProfile = () => {
  const dispatch = useDispatch()
  const curr_user = useSelector<AppStateType>(
      (state) => state.auth.user
  ) as IUser;
  const [user, setUser] = useState<IUser>(curr_user);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const onUpdate = () => {
    dispatch(updateProfile(user as IUser))
  };
  const handle_change = (e: any) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };
  return (
    <DashboardRoutesReusableTemplate
      children={
        <div className="dashboard-container">
          <h1>Dashboard</h1>
          <Form
            scrollToFirstError
            autoComplete="off"
            className="user-form"
            onFinish={onUpdate}
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}
            layout="horizontal"
          >
            <Form.Item label="Toggle Edit" valuePropName="checked" style={{marginLeft:'50%'}}>
              <Switch data-testid="edit"
                  onChange={() => {
                    setIsDisabled(!isDisabled);
                  }}
              />
            </Form.Item>
            <Form.Item name="firstName" label="First Name" rules={[{
              required: true,
              message: "First name cannot be blank!"
            }]}>
              <Input  data-testid="fname" disabled={isDisabled} placeholder={curr_user.firstName!} onChange={handle_change} value={user.firstName!} name="firstName"/>
            </Form.Item>
            <Form.Item name="lastName" label="Last Name" rules={[{
              required: true,
              message: "Last name cannot be blank!"
            }]}>
              <Input  data-testid="lname" disabled={isDisabled} placeholder={curr_user.lastName!} onChange={handle_change} value={user.lastName!} name="lastName"/>
            </Form.Item>
            <Form.Item label="Email">
              <Input disabled={true} placeholder={curr_user.email!} />
            </Form.Item>
            <Form.Item label="Phone">
              <Input disabled={isDisabled} placeholder={curr_user.phone!} onChange={handle_change} value={user.phone!} name="phone"/>
            </Form.Item>
            <Form.Item label="Address">
              <Input disabled={isDisabled} placeholder={curr_user.address!} onChange={handle_change} value={user.address!} name="address"/>
            </Form.Item>


            <Form.Item data-testid="updateFormItem" label="Save Changes" hidden={isDisabled}>
              <Button data-testid="update" htmlType="submit" >Update</Button>
            </Form.Item>
          </Form>
        </div>
      }
    />
  );
};

export default UserProfile;
