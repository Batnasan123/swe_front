import React from "react";
import { Drawer } from "antd";
import { Layout, Space } from "antd";

const { Header, Footer, Sider, Content } = Layout;

const Main = ({ children }) => {
  return (
    <Layout
      className="h-full"
      style={{
        backgroundImage: "linear-gradient(rgb(17 24 39),rgb(71,71,255))",
      }}
    >
      <Content>
        <div className="mx-auto w-[90%] rounded-xl bg-white  px-3 text-center font-Montserrat shadow-2xl max-[639px]:px-2">
          <div className="my-32 p-4">{children} </div>
        </div>
      </Content>
    </Layout>
  );
};

export default Main;
