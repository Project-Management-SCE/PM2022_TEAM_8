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
  const [componentSize, setComponentSize] = useState<SizeType | "default">(
    "default"
  );
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const onFormLayoutChange = ({ size }: { size: SizeType }) => {
    setComponentSize(size);
  };
  const onUpdate = async (e: any) => {
    dispatch(updateProfile(curr_user as IUser)) //TODO: Check functionality
  };
  return (
    <DashboardRoutesReusableTemplate
      children={
        <div className="dashboard-container">
          <h1>Dashboard</h1>
          <Form
            className="user-form"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}
            layout="horizontal"
            initialValues={{ size: componentSize }}
            onValuesChange={onFormLayoutChange}
            size={componentSize as SizeType}
          >
            <Form.Item label="Form Size" name="size">
              <Radio.Group>
                <Radio.Button value="small">Small</Radio.Button>
                <Radio.Button value="default">Default</Radio.Button>
                <Radio.Button value="large">Large</Radio.Button>
              </Radio.Group>
            </Form.Item>
            <Form.Item label="First Name">
              <Input disabled={isDisabled} placeholder={curr_user.firstName!} />
            </Form.Item>
            <Form.Item label="Last Name">
              <Input disabled={isDisabled} placeholder={curr_user.lastName!} />
            </Form.Item>
            <Form.Item label="Email">
              <Input disabled={isDisabled} placeholder={curr_user.email!} />
            </Form.Item>
            <Form.Item label="Phone">
              <Input disabled={isDisabled} placeholder={curr_user.phone!} />
            </Form.Item>
            <Form.Item label="Address">
              <Input disabled={isDisabled} placeholder={curr_user.address!} />
            </Form.Item>

            <Form.Item label="Toggle Edit" valuePropName="checked">
              <Switch
                onChange={() => {
                  setIsDisabled(!isDisabled);
                }}
              />
            </Form.Item>
            <Form.Item label="Save Changes">
              <Button onClick={onUpdate}>Update</Button>
            </Form.Item>
          </Form>
        </div>
      }
    />
  );
};

export default UserProfile;
