import React, { useEffect, useState } from "react";
import {
  List,
  Button,
  Modal,
  Tag,
  Breadcrumb,
  Layout,
  theme,
  Radio,
  Space,
} from "antd";

const { Content } = Layout;

const Academy = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const lessons = [
    {
      private: true,
      name: "Private 8 sessions",
      price: "8000LE",
      description: ["1. Warmup", "2. Technical special shot", "3. Drill"],
    },
    {
      private: true,
      name: "Private 12 sessions",
      price: "12000LE",
      description: [
        "1. Warmup and stretching",
        "2. Forehand and backhand techniques",
        "3. Advanced footwork drills",
        "4. Match strategy and tactics",
      ],
    },
    {
      private: false,
      name: "Group Beginner Course",
      price: "3000LE",
      description: [
        "1. Introduction to paddle tennis",
        "2. Basic grip and swings",
        "3. Learning volleys and serves",
        "4. Practice with partners",
      ],
    },
    {
      private: true,
      name: "Intensive Conditioning Workshop",
      price: "6000LE",
      description: [
        "1. Cardiovascular fitness drills",
        "2. Strength and endurance training",
        "3. Speed and agility exercises",
        "4. Recovery and injury prevention",
      ],
    },
    {
      private: false,
      name: "Advanced Tournament Prep",
      price: "5000LE",
      description: [
        "1. Fine-tuning strokes and technique",
        "2. Mental game and focus strategies",
        "3. Simulating match situations",
        "4. Mock tournament participation",
      ],
    },
    // Add more lessons...
  ];

  const [visibleModal, setVisibleModal] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [selectedPaymentType, setSelectedPaymentType] = useState("card");

  const handleJoinNow = (lesson) => {
    setSelectedLesson(lesson);
    setVisibleModal(true);
  };

  const handleModalOk = () => {
    // Implement your "Join Now" logic here
    console.log(`Joined lesson: ${selectedLesson.name}`);
    setVisibleModal(false);
  };

  const handleModalCancel = () => {
    setVisibleModal(false);
  };

  useEffect(() => {
    if (!visibleModal && selectedPaymentType === "card") {
      setSelectedPaymentType("cash");
    }
  }, [visibleModal]);

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
        <Breadcrumb.Item>Academy</Breadcrumb.Item>
      </Breadcrumb>
      <div
        style={{
          padding: 24,
          flex: 1,
          background: colorBgContainer,
        }}
        className="mx-auto max-w-[500px]"
      >
        <div>
          <h1>PadelUp Academy</h1>
          <List
            dataSource={lessons}
            renderItem={(lesson) => (
              <List.Item>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <div>
                    {lesson.private && <Tag color="purple">Private</Tag>}
                    <h3 className="mb-1">{lesson.name}</h3>
                    <p className="font-regular">{lesson.price}</p>
                    <ul>
                      {lesson.description.map((step, index) => (
                        <li className="font-semibold" key={index}>{step}</li>
                      ))}
                    </ul>
                  </div>
                  <Button onClick={() => handleJoinNow(lesson)}>
                    Join Now
                  </Button>
                </div>
              </List.Item>
            )}
          />
          <Modal
            title={`Join ${selectedLesson ? selectedLesson.name : ""}`}
            open={visibleModal}
            onOk={handleModalOk}
            onCancel={handleModalCancel}
          >
            {/* Add content to the modal */}
            {selectedLesson && (
              <div>
                <b>
                  <p className="mb-2 mt-4">Select Payment Method</p>
                </b>
                <Radio.Group
                  onChange={(e) => setSelectedPaymentType(e.target.value)}
                  value={selectedPaymentType}
                >
                  <Space direction="vertical">
                    <Radio value={"cash"}>Cash</Radio>
                    <Radio value={"card"}>Credit/Debit Card</Radio>
                  </Space>
                </Radio.Group>
              </div>
            )}
          </Modal>
        </div>
      </div>
    </Content>
  );
};

export default Academy;
