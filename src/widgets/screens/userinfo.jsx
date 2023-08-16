import React, { useMemo } from "react";
import { Breadcrumb, Layout, theme, Divider } from "antd";
import { Descriptions } from "antd";
import { CardBody } from "@material-tailwind/react";
import { useAuth } from "@/helpers";
const { Content } = Layout;


const UserInfo = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const { user } = useAuth()

  // Wallet information
  const currency = "LE"; // Currency

  const items = useMemo(() => [
    {
      key: "1",
      label: "username",
      children: user?.username,
    },
    {
      key: "2",
      label: "Telephone",
      children: user?.mobile,
    },
    {
      key: "3",
      label: "Name",
      children: user?.fullName,
    },
    {
      key: "4",
      label: "Skill Level",
      children: user.skill_level,
    },
    {
      key: "5",
      label: "Gender",
      children: user.gender
    },
    {
      key: "6",
      label: "Email",
      children: user.email
    },
  ], [user]);

  return (
    <Content
      style={{
        margin: "0 16px",
      }}
    >
      <Breadcrumb
        style={{
          margin: "16px 0",
        }}
      >
        <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
      </Breadcrumb>
      <div
        style={{
          padding: 24,
          flex: 1,
          background: colorBgContainer,
        }}
      >
        <CardBody>
          <Descriptions title="User Info" items={items} />
          <Divider />
          <Descriptions style={{ fontSize: '20px' }} title="Wallet" items={[{ label: "Balance", children: `${user.walletAmount} ${currency}` }]} />
        </CardBody>
      </div>
    </Content>
  );
};
export default UserInfo;
