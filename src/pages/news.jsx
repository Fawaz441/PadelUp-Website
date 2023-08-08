import { LikeOutlined, MessageOutlined, StarOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { Avatar, List, Space } from "antd";
import Loader from "@/widgets/misc/loader";
import apiInstance from "@/api/instance";
import MySwal from "@/widgets/misc/alert";

const News = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getNews = async () => {
    try {
      const { data: news } = await apiInstance.getNews();
      setData(news.data);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      MySwal.fire({
        icon: "error",
        title: "Oops...",
        confirmButtonText: "Retry",
        text: "Something went wrong!",
      }).then((result) => {
        if (result.isConfirmed) {
          getNews();
        }
      });
    }
  };

  useEffect(() => {
    getNews();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen flex-1 items-center justify-center">
        <Loader loading />
      </div>
    );
  }

  return (
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
            pageSize: 10,
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
                <div className="relative hidden h-[272px] w-[272px] bg-[grey] md:block">
                  <img
                    className="absolute left-0 top-0 h-full w-full object-cover"
                    width={272}
                    alt="logo"
                    src={item.image}
                  />
                </div>
              }
            >
              <List.Item.Meta
                className="!text-white"
                title={
                  <a className="!text-white" href={item.href}>
                    {item.title}
                  </a>
                }
                description={item.description}
              />
              {item.content}
              <br />
              <br />
              {item.date}
            </List.Item>
          )}
        />
      </div>
    </>
  );
};
export default News;
