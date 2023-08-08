import React from "react";
import { Breadcrumb, Layout, theme, Divider } from "antd";
import { Descriptions } from "antd";
import { CardBody } from "@material-tailwind/react";
const { Content } = Layout;

const items = [
  {
    key: "1",
    label: "UserName",
    children: "Zhou Maomao",
  },
  {
    key: "2",
    label: "Telephone",
    children: "1810000000",
  },
  {
    key: "3",
    label: "Live",
    children: "Hangzhou, Zhejiang",
  },
  {
    key: "4",
    label: "Remark",
    children: "empty",
  },
  {
    key: "5",
    label: "Address",
    children: "No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China",
  },
];
const UserInfo = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

   // Wallet information
   const walletBalance = 0; // Default wallet balance
   const currency = "LE"; // Currency

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
          <Descriptions style={{ fontSize: '20px' }} title="Wallet" items={[{ label: "Balance", children: `${walletBalance} ${currency}` }]} />
        </CardBody>
      </div>
    </Content>
  );
};
export default UserInfo;
