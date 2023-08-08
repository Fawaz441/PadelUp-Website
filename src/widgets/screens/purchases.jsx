import React, { useState } from "react";
import { List, Button, Modal, Breadcrumb, theme, Layout } from "antd";
const { Content } = Layout;

const PlaySets = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const playSets = [
    { hours: 1, price: 400 },
    { hours: 4, price: 1500 },
    { hours: 8, price: 3000 },
    { hours: 16, price: 6000 },
    { hours: 32, price: 12000 },
  ];

  const [visibleModal, setVisibleModal] = useState(false);
  const [selectedPlaySet, setSelectedPlaySet] = useState(null);

  const handlePurchase = (playSet) => {
    setSelectedPlaySet(playSet);
    setVisibleModal(true);
  };

  const handleModalOk = () => {
    // Implement your purchase logic here
    console.log(
      `Purchased ${selectedPlaySet.hours}hr play set for ${selectedPlaySet.price} LE`
    );
    setVisibleModal(false);
  };

  const handleModalCancel = () => {
    setVisibleModal(false);
  };

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
        <Breadcrumb.Item>Play Sets</Breadcrumb.Item>
      </Breadcrumb>
      <div
        className="mx-auto max-w-[400px]"
        style={{
          padding: 24,
          flex: 1,
          background: colorBgContainer,
        }}
      >
        <div>
          <List
            dataSource={playSets}
            renderItem={(playSet) => (
              <List.Item>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <span>
                    {playSet.hours}hr at {playSet.price} LE
                  </span>
                  <Button onClick={() => handlePurchase(playSet)}>
                    Purchase
                  </Button>
                </div>
              </List.Item>
            )}
          />
          <Modal
            title={`Purchase ${
              selectedPlaySet ? selectedPlaySet.hours + "hr" : ""
            } Play Set`}
            visible={visibleModal}
            onOk={handleModalOk}
            onCancel={handleModalCancel}
          >
            {/* Add content to the modal */}
            {selectedPlaySet && (
              <p>
                Are you sure you want to purchase the {selectedPlaySet.hours}hr
                play set for {selectedPlaySet.price} LE?
              </p>
            )}
          </Modal>
        </div>
      </div>
    </Content>
  );
};

export default PlaySets;
