import React, { createContext, useState } from "react";
import axios2 from "../utils/axios2";
import { useRouter } from "next/router";
import { message } from "antd";

const BookContext = createContext();

const initialState = {
  status: "",
  message: "",
  modal: false,
  detail: {
    _id: "",
    name: "",
    author: "",
    isb: "",
    price: "",
    year: "",
    created: "",
  },
  list: [],
};

const BookProvider = (props) => {
  const [state, setState] = useState(initialState);
  const router = useRouter();

  const loadDetailAPI = async (body) => {
    console.log("body", body);
    setState({
      ...state,
      status: "loading",
      message: "",
    });

    var config = {
      url: `/products/productById`,
      method: "post",
      data: {
        ...body,
      },
    };

    try {
      var response = await axios2(config);
      // const { data } = response.data;
      console.log("data", response.data);
      setState({
        ...state,
        status: "success",
        detail: response.data,
        message: "",
      });
    } catch (err) {
      console.log(err);
      message.error(err);
      // if (err?.statusCode === 409) {
      //   router.push("/");
      // }

      setState({
        ...state,
        status: "error",
        message: err.message || "Something went wrong!",
      });
    }
  };

  const loadListAPI = async ({ suffix, method, headers }) => {
    setState({
      ...state,
      status: "loading",
      message: "",
    });

    var config = {
      url: `/products/list`,
      method: method,
      data: {},
      headers: {
        ...headers,
      },
    };

    try {
      // console.log("$:/state/company/config ", config);
      const response = await axios2(config);
      // console.log("response", response);
      const { data } = response?.data;
      console.log("data", response?.data);
      console.log("data", data);
      setState({
        ...state,
        status: "success",
        list: response?.data,
        message: "",
      });
    } catch (err) {
      if (err?.statusCode === 409 || err === "token is required") {
        router.push("/");
      }
      console.log("$:/api/error ", err);

      setState({
        ...state,
        status: "error",
        message: err.message,
      });
    }
  };
  const update = async (body) => {
    setState({
      ...state,
      status: "loading",
      message: "",
    });
    console.log("body123", body);
    var config = {
      url: `/products/update`,
      method: "post",
      data: {
        ...body,
      },
      // headers: {
      //   ...headers,
      // },
    };

    try {
      const response = await axios2(config);
      console.log("data", response?.data);
      setState({
        ...state,
        status: "success",
      });
      message.success("successfully updated");
    } catch (err) {
      console.log("$:/api/error ", err);
      setState({
        ...state,
        status: "error",
        message: err.message,
      });
      message.error(err);
    }
  };
  const deleteById = async (body) => {
    setState({
      ...state,
      status: "loading",
      message: "",
    });

    var config = {
      url: `/products/deleteById`,
      method: "delete",
      data: {
        ...body,
      },
    };

    try {
      const response = await axios2(config);
      console.log("data", response?.data);
      setState({
        ...state,
        status: "success",
      });
      message.success("successfully deleted");
    } catch (err) {
      console.log("$:/api/error ", err);
      setState({
        ...state,
        status: "error",
        message: err.message,
      });
      message.error(err);
    }
  };
  const create = async (body) => {
    setState({
      ...state,
      status: "loading",
      message: "",
    });

    var config = {
      url: `/products/create`,
      method: "post",
      data: {
        ...body,
      },
    };

    try {
      const response = await axios2(config);
      console.log("data", response?.data);
      setState({
        ...state,
        status: "success",
      });
      message.success("successfully created");
    } catch (err) {
      console.log("$:/api/error ", err);
      setState({
        ...state,
        status: "error",
        message: err.message,
      });
      message.error(err);
    }
  };

  return (
    <BookContext.Provider
      value={{
        state,
        // SetLogo,
        loadListAPI,
        loadDetailAPI,
        update,
        deleteById,
        create,
        // setDetail,
      }}
    >
      {props.children}
    </BookContext.Provider>
  );
};

export { BookContext, BookProvider };
