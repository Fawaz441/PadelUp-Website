import React, { useState } from "react";
import {
  Card,
  Row,
  Col,
  Avatar,
  List,
  Layout,
  Breadcrumb,
  theme,
  Modal,
  Input,
  Button,
} from "antd";
const { Content } = Layout;
import { TrophyOutlined, UserOutlined } from "@ant-design/icons";

const Rankings = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [searchTerm, setSearchTerm] = useState("");
  const [playerSearchTerm, setPlayerSearchTerm] = useState("");
  const [visibleModal, setVisibleModal] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  const handlePlayerSearch = (value) => {
    setPlayerSearchTerm(value);
  };

  const handleConnect = (player) => {
    setSelectedPlayer(player);
    setVisibleModal(true);
  };

  const handleModalOk = () => {
    // Implement your connection logic here
    console.log(`Connected with ${selectedPlayer.name}`);
    setVisibleModal(false);
  };

  const handleModalCancel = () => {
    setVisibleModal(false);
  };

  const rankingsData = [
    { rank: 1, name: "Player A", level: "Advanced" },
    { rank: 2, name: "Player B", level: "Intermediate" },
    { rank: 3, name: "Player C", level: "Beginner" },
    { rank: 4, name: "Player D", level: "Advanced" },
    { rank: 5, name: "Player E", level: "Intermediate" },
    { rank: 6, name: "Player F", level: "Advanced" },
    { rank: 7, name: "Player G", level: "Intermediate" },
    { rank: 8, name: "Player H", level: "Beginner" },
    { rank: 9, name: "Player I", level: "Intermediate" },
    { rank: 10, name: "Player J", level: "Advanced" },
    // Add more data...
  ];

  const playConnectionsData = [
    { name: "Player K", level: "Beginner" },
    { name: "Player L", level: "Intermediate" },
    { name: "Player M", level: "Advanced" },
    { name: "Player N", level: "Beginner" },
    { name: "Player O", level: "Advanced" },
    { name: "Player P", level: "Intermediate" },
    { name: "Player Q", level: "Advanced" },
    { name: "Player R", level: "Intermediate" },
    { name: "Player S", level: "Beginner" },
    { name: "Player T", level: "Intermediate" },
    // Add more data...
  ];

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
        <Breadcrumb.Item>Rankings</Breadcrumb.Item>
      </Breadcrumb>
      <div
        style={{
          padding: 24,
          flex: 1,
          background: colorBgContainer,
        }}
      >
        <div>
          <Input.Search
            className="mb-[10px]"
            placeholder="Find Padel Teams"
            onChange={(e) => handleSearch(e.target.value)}
          />
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Card title="Rankings" extra={<TrophyOutlined />}>
                <List
                  itemLayout="horizontal"
                  dataSource={rankingsData}
                  renderItem={(item) => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={<Avatar icon={<UserOutlined />} />}
                        title={<strong>{item.name}</strong>}
                        description={item.level}
                      />
                      {`Rank #${item.rank}`}
                    </List.Item>
                  )}
                />
              </Card>
            </Col>
            <Col span={12}>
              <Card title="Play Connections">
                <Input.Search
                  className="mb-[10px]"
                  placeholder="Find a player"
                  onChange={(e) => handlePlayerSearch(e.target.value)}
                />
                <List
                  itemLayout="horizontal"
                  dataSource={playConnectionsData}
                  renderItem={(item) => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={<Avatar icon={<UserOutlined />} />}
                        title={<strong>{item.name}</strong>}
                        description={item.level}
                      />
                      <button onClick={() => handleConnect(item)}>
                        Connect
                      </button>
                    </List.Item>
                  )}
                />
              </Card>
            </Col>
          </Row>
        </div>
        <Modal
          title={`Connect with ${selectedPlayer ? selectedPlayer.name : ""}`}
          open={visibleModal}
          onOk={handleModalOk}
          onCancel={handleModalCancel}
        >
          {/* Add content to the modal */}
          {selectedPlayer && (
            <p>Are you sure you want to connect with {selectedPlayer.name}?</p>
          )}
        </Modal>
      </div>
    </Content>
  );
};

export default Rankings;
