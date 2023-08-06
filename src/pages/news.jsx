import { LikeOutlined, MessageOutlined, StarOutlined } from "@ant-design/icons";
import React from "react";
import { Avatar, List, Space } from "antd";
const data = Array.from({
  length: 23,
}).map((_, i) => ({
  href: "https://ant.design",
  title: `Hype Padel Tournament 150K`,
  avatar: `https://xsgames.co/randomusers/avatar.php?g=pixel&key=${i}`,
  description: "Hype Padel Tournament",
  content: `Divisions: Open A, B, C, D\nRegistration Deadline: June 11th`,
}));
const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);
const News = () => (
  <>
    <div className="fixed top-0 h-full w-full  bg-[url('https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80')] bg-cover bg-center" />
    <div className="fixed top-0 h-full w-full  bg-black/[.8] bg-cover bg-center" />
    <div className="relative mx-auto max-w-[800px] py-[100px]">
      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          onChange: (page) => {
            console.log(page);
          },
          pageSize: 3,
        }}
        dataSource={data}
        footer={
          <div className="px-4">
            <b className="text-white">PadelUp</b>
          </div>
        }
        renderItem={(item) => (
          <List.Item
            key={item.title}
            // actions={[
            //   <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
            //   <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
            //   <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
            // ]}
            extra={
              <img
                className="hidden md:block"
                width={272}
                alt="logo"
                src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
              />
            }
          >
            <List.Item.Meta
                className="!text-white" 
              avatar={<Avatar src={item.avatar} />}
              title={<a className="!text-white" href={item.href}>{item.title}</a>}
              description={item.description}
            />
            {item.content}
          </List.Item>
        )}
      />
    </div>
  </>
);
export default News;
