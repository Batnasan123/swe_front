import React, { useEffect, useState } from "react";
import moment from "moment";

import { Card, Button } from "antd";

const Card02 = (props) => {
  const { data, events, tr } = props;
  const [value, setValue] = useState("main_date_start");

  // console.log(data);

  const currnetDate = new Date();
  const futureDate = new Date(data.date1);

  futureDate.setTime(futureDate.getTime());

  useEffect(() => {
    // console.log(data);
    if (futureDate < currnetDate) {
      // console.log(`${currnetDate} Хугацаа өнгөрсөн  ${futureDate}`)
      setValue("main_date_started");
    } else if (futureDate > currnetDate) {
      // console.log(`${currnetDate} Хугацаа болоогүй ${futureDate}`)
      setValue("main_date_start");
    }
  }, []);
  return (
    <Card
      onClick={() => events.onClick({ id: data.id })}
      key={data.index}
      hoverable
      className="w-full  border-solid border-slate-300"
      size="small"
      cover={
        <div
          className="h-40 overflow-hidden rounded-xl"
          style={{
            // backgroundImage: "url(" + data.logo + ")",
            backgroundPosition: "center",
            objectFit: "cover",
            backgroundRepeat: "no-repeat",
            backgroundSize: "140px",
          }}
        />
      }
    >
      <div>
        <div className="mb-5 text-left text-[18px] font-bold">{data.title}</div>
        <ul>
          <li>Author:{data.author}</li>
          {/* <li>ISBN:{data.isbn}</li> */}
          <li>Year:{data.year}</li>
          <li>Price:{data.price}$</li>
        </ul>
        <div className="m-1 flex justify-between text-[12px] xl:text-[16px]">
          Оруулсан огноо:
          <div className="font-bold">
            {data?.date1 && moment(data.date2).format("YYYY-MM-DD LT")}
          </div>
        </div>
        <div className="m-1 flex justify-between text-[12px] xl:text-[16px]">
          <div className="font-bold">
            {data?.date2 && "зассан огноо:"}
            {data?.date2 && moment(data.date2).format("YYYY-MM-DD LT")}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default Card02;
