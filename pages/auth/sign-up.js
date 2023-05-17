import React, { useEffect, useContext } from "react";
import Image from "next/image";
import { Form, Button, Input, Layout } from "antd";
const { Header, Footer, Sider, Content } = Layout;
import { AuthContext } from "@/context/user.context";
import Link from "next/link";

export default function Signup() {
  const context = useContext(AuthContext);
  const auth = context;
  const { form } = Form.useForm();
  const handleFinish = (values) => {
    let body = {
      email: values.email,
      password: values.password,
      phone: 95802438,
      type: values.type,
      register: values.register,
      // companyId: 1,
    };
    console.log(body);
    //
    auth.signUp(body);
  };
  return (
    <Layout className="w-96 ml-32 mt-32">
      <div className="rounded bg-blue-700">
        <Header className="bg-blue-500">Sign up</Header>
        <Content className="content-center">
          <Form
            className="h-full w-full px-12 py-2"
            onFinish={handleFinish}
            form={form}
            initialValues={{
              email: "",
              password: "",
            }}
          >
            <Form.Item name="type" label="Төрөл">
              <Input
                className=""
                type="text"
                // placeholder={tr("form_auth_placeholder_email")}
              />
            </Form.Item>
            <Form.Item name="register" label="Регистер">
              <Input
                className=""
                type="text"
                // placeholder={tr("form_auth_placeholder_email")}
              />
            </Form.Item>
            <Form.Item name="email" label="E-майл">
              <Input
                className=""
                type="email"
                // placeholder={tr("form_auth_placeholder_email")}
              />
            </Form.Item>
            <Form.Item name="phone" label="Утасны дугаар">
              <Input
                className=""
                type="number"
                // placeholder={tr("form_auth_placeholder_email")}
              />
            </Form.Item>
            <Form.Item name="password" label="Нууц үг">
              <Input
                className=""
                type="password"
                // placeholder={tr("form_auth_placeholder_email")}
              />
            </Form.Item>
            <Button
              className="h-11  w-full rounded-2xl border-gray-600 bg-green-500  text-black"
              type="primary"
              htmlType="submit"
            >
              sign up
            </Button>
          </Form>
        </Content>
        <Footer>
          <Link href="/">
            <Button
              type="link"
              className="h-11  w-full rounded-2xl border-gray-600 bg-white  text-black"
            >
              Буцах
            </Button>
          </Link>
        </Footer>
      </div>
    </Layout>
  );
}
