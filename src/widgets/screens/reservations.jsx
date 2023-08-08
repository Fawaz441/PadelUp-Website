import React from "react";
import {
  Card,
  List,
  theme,
  Breadcrumb,
  Layout,
  Button,
  Modal,
  Divider,
  Typography,
} from "antd";
const { Content } = Layout;

const data = [
  {
    title: "Padel Up",
    description: "12:00PM - 12:30PM",
  },
  {
    title: "Padel Up",
    description: "12:00PM - 12:30PM",
  },
  {
    title: "Padel Up",
    description: "12:00PM - 12:30PM",
  },
  {
    title: "Padel Up",
    description: "12:00PM - 12:30PM",
  },
  {
    title: "Padel Up",
    description: "12:00PM - 12:30PM",
  },
];

const reservationList = [
  "Time: 12:00PM",
  "Price: 600 EGP/hr",
  "Reservation Time: 11:00AM",
  // "Man charged over missing wedding girl.",
  // "Los Angeles battles huge wildfires.",
];

const Reservations = () => {
  const [modalOpen, setModalOpen] = React.useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
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
        <Breadcrumb.Item>Bookings</Breadcrumb.Item>
      </Breadcrumb>
      <div
        style={{
          padding: 24,
          flex: 1,
          background: colorBgContainer,
        }}
      >
        <List
          grid={{ gutter: 16, column: 4 }}
          dataSource={data}
          renderItem={(item) => (
            <List.Item
              className="cursor-pointer"
              onClick={() => setModalOpen(true)}
            >
              <Card title={item.title}>{item.description}</Card>
            </List.Item>
          )}
        />
      </div>
      {/* info modal */}
      <Modal
        title="Padel Up"
        footer={[<Button className="!bg-[red] !text-white">Cancel Reservation</Button>]}
        style={{
          top: 20,
        }}
        open={modalOpen}
        onOk={() => setModalOpen(false)}
        onCancel={() => setModalOpen(false)}
      >
        <List
          size="small"
          bordered
          dataSource={reservationList}
          renderItem={(item) => <List.Item>{item}</List.Item>}
        />
      </Modal>
    </Content>
  );
};

export default Reservations;
