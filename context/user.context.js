import React, { createContext, useEffect, useState } from "react";
import { useRouter } from "next/router";

import axios from "../utils/axios";
import { isValidToken, setSession } from "../utils/jwt.js";
// import { useTranslation } from "react-i18next";
import { message } from "antd";

const AuthContext = createContext();

var initialData = {
  status: "",
  message: "",
  token: "",
  detail: {},
  loggedInCompany: null,
  isInitialized: false,
  isAuthenticated: false,
};

const AuthProvider = (props) => {
  //   const { t } = useTranslation();
  const router = useRouter();
  const [state, setState] = useState(initialData);

  useEffect(() => {
    var detail = localStorage.getItem("agm_detail");
    var initialData = detail !== null ? JSON.parse(detail) : {};
    var accessToken = localStorage.getItem("accessToken");
    var company = localStorage.getItem("companyId");

    if (isValidToken(accessToken)) {
      setSession(accessToken);
    }

    setState({
      ...state,
      status: "success",
      message: "",
      token: accessToken !== null ? accessToken : "",
      detail: initialData !== null ? initialData : {},
      isInitialized: true,
      loggedInCompany: company !== null ? company : null,
      isAuthenticated: accessToken !== null ? isValidToken(accessToken) : false,
    });
    // console.log('setlocal');
  }, []);

  const [messageApi, contextHolder] = message.useMessage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalType, setIsModalType] = useState("send");

  const eventFun = () => {
    var detail = localStorage.getItem("agm_detail");
    var initialData = detail !== null ? JSON.parse(detail) : {};
    var accessToken = localStorage.getItem("accessToken");
    var company = localStorage.getItem("companyId");

    if (isValidToken(accessToken)) {
      setSession(accessToken);
    }

    setState({
      ...state,
      status: "success",
      message: "",
      token: accessToken !== null ? accessToken : "",
      detail: initialData !== null ? initialData : {},
      isInitialized: true,
      loggedInCompany: company !== null ? company : null,
      isAuthenticated: accessToken !== null ? isValidToken(accessToken) : false,
    });
  };

  // const ClearMessage = () => {
  //   setState({
  //     ...state,
  //     status: "",
  //   });
  // };

  const LoadingFun = () => {
    messageApi.open({
      type: "loading",
      content: "Уншиж байна...",
      duration: 0,
    });
  };

  const DeleteMess = () => {
    messageApi.destroy();
  };

  //   ####  #  ####  #    # # #    #
  //  #      # #    # ##   # # ##   #
  //   ####  # #      # #  # # # #  #
  //       # # #  ### #  # # # #  # #
  //  #    # # #    # #   ## # #   ##
  //   ####  #  ####  #    # # #    #

  const signIn = async (body) => {
    setState({
      ...state,
      status: "loading",
      message: "agm_auth_login_loading",
    });

    var config = {
      url: "/users/login",
      method: "post",
      data: {
        ...body,
      },
    };
    LoadingFun();
    try {
      const response = await axios(config);
      const { data, accessToken } = response?.data;
      var detail = JSON.stringify(data);
      // console.log(first)
      var auth_detail = {
        detail: data,
        token: accessToken,
        isAuthenticated: isValidToken(accessToken),
      };
      // console.log(auth_detail)
      localStorage.setItem("agm_detail", detail);

      setSession(accessToken);
      setState({
        ...state,
        status: "success",
        ...auth_detail,
      });
      console.log(data);
      // checkUser({
      //   // userId: data.shareholder.userId,
      //   companyId: companyId,
      //   detail: auth_detail,
      // });
      DeleteMess();
      message.success("Нэвтрэлт амжилттай");
      router.push("/book");
    } catch (err) {
      console.log(err);
      setState({
        ...state,
        status: "error",
        message: err?.message,
      });
      DeleteMess();
      message.error("Нэвтрэлт амжилтгүй");
    }
  };

  //   ####  #  ####  #    # #    # #####
  //  #      # #    # ##   # #    # #    #
  //   ####  # #      # #  # #    # #    #
  //       # # #  ### #  # # #    # #####
  //  #    # # #    # #   ## #    # #
  //   ####  #  ####  #    #  ####  #

  const signUp = async (body) => {
    var config = {
      url: "/users/register",
      method: "post",
      data: {
        ...body,
      },
    };
    // console.log(config);
    LoadingFun();

    try {
      const response = await axios(config);
      const { data } = response;
      // const { data } = response?.data
      // console.log(data.shareholder.userId, 'хэрэглэгчийн ID')
      setState({
        ...state,
        status: "success",
      });
      DeleteMess();
      message.success("Та амжилттай бүртгүүллээ. Бүртгэлээрээ нэвтрэн үү.", 10);
      //   router.push("/auth/sign-in");
      // signIn({ email: email, password: password, companyId: companyId });

      // router.push('/auth/confirmation')
    } catch (err) {
      // console.log("aldaaa ", err);
      if (err.message === "SequelizeUniqueConstraintError: Validation error") {
        setState({
          ...state,
          status: "error",
          message:
            "Тухайн и-мэйл хаяг бүртгэлтэй байна. Та өөрийн бүртгэлээр нэвтэрнэ үү.",
        });
      } else {
        setState({
          ...state,
          status: "error",
          message: err?.message,
        });
      }
      DeleteMess();
      message.error("Системд бүртгэх амжилтгүй боллоо.");
      //   message.error(err?.message);
    }
  };

  // check user
  const checkUser = async ({ userId, companyId, detail }) => {
    let body = {
      userId,
      companyId,
    };

    var config = {
      url: "/users/checkconfirmation",
      method: "post",
      data: {
        ...body,
      },
    };

    try {
      const response = await axios(config);
      const { data } = response?.data;

      setState({
        ...state,
        status: "success",
        ...detail,
      });
      message.success("Та ажилттай нэвтэрлээ.");
      router.push("/meeting");
    } catch (err) {
      setState({
        ...state,
        status: "error",
        message: err?.message,
      });
      eventFun();
      message.warning("Та баталгаажуулалт хийнэ үү");
      setIsModalOpen(true);
    }
  };
  const signOut = () => {
    setSession(null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("companyId");
    localStorage.removeItem("agm_detail");
    setState({
      ...state,
      status: "success",
      message: "",
      isAuthenticated: false,
      detail: {},
    });
    message.success("Та системээс гарлаа.");
    router.push("/");
  };

  return (
    <AuthContext.Provider
      value={{
        state,
        // comment,
        signIn,
        signOut,
        signUp,
        // confirmationUser,
        // sendCodeUser,
        // setLoggedInCompany,
        // vote,
        eventFun,
        // ForgotPass,
        // ChangePass,
        // contextHolder,
        // // ClearMessage,
        // showModal,
        // handleOk,
        // isModalOpen,
        // isModalType,
        // handleCancel,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
