import React from "react";

// ant components
import { Spin } from "antd";

// ant icon
import { LoadingOutlined, CloseCircleOutlined } from "@ant-design/icons";

const antIcon = <LoadingOutlined style={{ fontSize: 32 }} spin />;

// render display based on status
const DataDisplayer = ({
  status,
  data,
  data2,
  isModalOpen,
  isModalOpen2,
  render,
  events,
  error,
  form,
}) => {
  switch (status) {
    case "success":
      return render({ data, events, form, data2, isModalOpen, isModalOpen2 });
    case "error":
      return (
        <div key="02">
          <CloseCircleOutlined
            style={{ color: "red", marginBottom: "12px", fontSize: "24px" }}
          />
          {/* {error} */}
          {error}
        </div>
      );
    default:
      return (
        <div key="03">
          <Spin indicator={antIcon} />
        </div>
      );
  }
};

export default DataDisplayer;
