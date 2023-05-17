// system import
import React, { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";

// global state
import useCompany from "../../hooks/useCompany";
import { AuthContext } from "@/context/user.context";
// import useAuth from "../hooks/useAuth";

// design components
import MainLayout from "../../layouts/Main";
import DataDisplayer from "../../Component/displayer";
import Card02 from "../../Component/card/Card02";
import { Alert, Button, Form, Input, Select, Modal, Menu, Layout } from "antd";
const { Header, Content, Footer } = Layout;

const render = ({ data, events, data2, isModalOpen, isModalOpen2 }) => {
  const dataDetails = [...data];
  dataDetails.sort((a, b) => {
    const aa = new Date(a.created);
    const bb = new Date(b.created);

    return aa - bb;
  });
  const [form] = Form.useForm();
  const [form2] = Form.useForm();
  form.setFieldsValue({
    _id: data2._id,
    name: data2.name,
    author: data2.author,
    isbn: data2.isbn,
    price: data2.price,
    year: data2.year,
  });
  // form2.setFieldsValue({
  //   name: "",
  //   author: "",
  //   isbn: "",
  //   price: "",
  //   year: "",
  // });
  return (
    <div>
      <Header className="bg-white">
        <Button className="mx-10" onClick={() => events.createBook()}>
          create book
        </Button>
        <Button className="mx-10" onClick={() => events.logout()}>
          logout
        </Button>
      </Header>
      <div className="my-5 font-bold"></div>
      <Modal
        okType="default"
        title="Номны талаарх мэдээлэл"
        // open={true}
        open={isModalOpen}
        onOk={events.handleOk}
        onCancel={events.handleCancel}
      >
        <div>
          {/* <p>{console.log(showData?.email)}</p> */}
          <Form form={form} onFinish={events.handleFinishForm}>
            <Form.Item label="id" name="_id" hidden>
              <Input defaultValue={data2?._id} />
            </Form.Item>
            <Form.Item label="Name" name="name">
              <Input defaultValue={data2?.name} />
            </Form.Item>
            <Form.Item label="author" name="author">
              <Input defaultValue={data2?.author} />
            </Form.Item>
            <Form.Item label="ISBN" name="isbn">
              <Input defaultValue={data2?.isbn} />
            </Form.Item>
            <Form.Item label="price $" name="price">
              <Input defaultValue={data2?.price} />
            </Form.Item>
            <Form.Item label="year" name="year">
              <Input defaultValue={data2?.year} />
            </Form.Item>
            <Form.Item>
              <Button
                type="link"
                htmlType="submit"
                className="bg-cyan-600 text-white hover:bg-cyan-800 hover:text-white"
                // disabled={ButtonError}
              >
                update
              </Button>
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                // onClick={events.deleteBook}
                onClick={() => events.deleteBook({ _id: data2?._id })}
                danger
              >
                delete
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Modal>
      <Modal
        okType="default"
        title="Ном оруулах"
        // open={true}
        open={isModalOpen2}
        onOk={events.handleOk2}
        onCancel={events.handleCancel2}
      >
        <div>
          {/* <p>{console.log(showData?.email)}</p> */}
          <Form form={form2} onFinish={events.createBook2}>
            <Form.Item label="Name" name="name">
              <Input type="text" />
            </Form.Item>
            <Form.Item label="author" name="author">
              <Input type="text" />
            </Form.Item>
            <Form.Item label="ISBN" name="isbn">
              <Input type="number" />
            </Form.Item>
            <Form.Item label="price $" name="price">
              <Input type="number" />
            </Form.Item>
            <Form.Item label="year" name="year">
              <Input type="number" />
            </Form.Item>
            <Form.Item>
              <Button
                type="link"
                htmlType="submit"
                className="bg-cyan-600 text-white hover:bg-cyan-800 hover:text-white"
              >
                create
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Modal>
      <div className="grid place-items-center gap-3 font-Montserrat sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {dataDetails.length > 0 &&
          dataDetails.map((item, index) => {
            return (
              <Card02
                key={index}
                data={{
                  id: item?._id,
                  key: index,
                  title: item?.name,
                  date1: item?.created,
                  date2: item?.updated,
                  isbn: item?.isbn,
                  year: item?.year,
                  price: item?.price,
                  author: item?.author,
                }}
                events={{
                  onClick: events.handleClick,
                }}
                // tr={tr}
              />
            );
          })}
      </div>
    </div>
  );
};

function Presentation() {
  const router = useRouter();
  const company = useCompany();
  const context = useContext(AuthContext);
  const auth = context;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  useEffect(() => {
    company.loadListAPI({ method: "GET" });
  }, []);

  const handleOnClick = (value) => {
    // console.log("values", value);
    let body = {
      id: value.id,
    };
    company.loadDetailAPI(body);
    // setShowData(company?.state?.detail);
    setIsModalOpen(true);
  };
  const handleOk = () => {
    // events.handleClick(showData);
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleOk2 = () => {
    // events.handleClick(showData);
    setIsModalOpen2(false);
  };

  const handleCancel2 = () => {
    setIsModalOpen2(false);
  };
  const handleFinishForm = async (value) => {
    // events.handleClick(showData);
    let body = {
      id: value._id,
      name: value.name,
      author: value.author,
      isbn: value.isbn,
      price: value.price,
      year: value.year,
    };
    await company.update(body);
    company.loadDetailAPI(body);
    console.log("form body", body);
  };
  const deleteBook = async (value) => {
    let body = {
      productId: value._id,
    };
    await company.deleteById(body);
    company.loadListAPI({ method: "GET" });
    // console.log("form finish", body);
  };
  const createBook = async () => {
    setIsModalOpen2(true);
  };
  const createBook2 = async (value) => {
    let body = {
      name: value.name,
      author: value.author,
      isbn: value.isbn,
      price: value.price,
      year: value.year,
    };
    // await company.deleteById(body);
    await company.create(body);
    company.loadListAPI({ method: "GET" });
    setIsModalOpen2(false);
    console.log("createBook", value);
  };
  const logout = async () => {
    auth.signOut();
    // company.loadListAPI({ method: "GET" });
    // setIsModalOpen2(false);
    // console.log("createBook", value);
  };
  return (
    <React.Fragment>
      <h1
        className="mb-2 pt-4"
        style={{
          fontSize: "32px",
          fontWeight: "500",
        }}
      >
        Нүүр хэсэг
      </h1>
      <DataDisplayer
        error={company?.state?.message}
        status={company?.state?.status}
        data={company?.state?.list}
        // data2={company?.state?.detail}
        data2={company?.state?.detail}
        isModalOpen={isModalOpen}
        isModalOpen2={isModalOpen2}
        render={render}
        events={{
          handleClick: handleOnClick,
          handleOk: handleOk,
          handleCancel: handleCancel,
          handleOk2: handleOk2,
          handleCancel2: handleCancel2,
          handleFinishForm: handleFinishForm,
          deleteBook: deleteBook,
          createBook: createBook,
          createBook2: createBook2,
          logout: logout,
        }}
      />
    </React.Fragment>
  );
}

Presentation.getLayout = function getLayout(page) {
  return <MainLayout>{page}</MainLayout>;
};
export default Presentation;
