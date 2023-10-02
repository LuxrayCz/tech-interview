import { useEffect, useState } from "react";
import DataComp from "../components/DataComp";
import axios from "axios";

const columns = [
  {
    title: "ID",
  },
  {
    title: "Name",
  },
  {
    title: "Gender",
  },
  {
    title: "Ability",
  },
  {
    title: "Minimal Distance",
  },
  {
    title: "Weight",
  },
  {
    title: "Born",
  },
  {
    title: "In Space Since",
  },
  {
    title: "Beer Consumption",
  },
  {
    title: "Knows the Answer",
  },
];

const Main = () => {
  //FETCH ALL DATA
  const [data, setData] = useState<DataType[]>();
  useEffect(() => {
    const fetchData = async () => {
      await axios.get("http://localhost:3500/items").then((res) => setData(res.data));
    };
    fetchData();
  }, []);

  const deleteData = async (index: number) => {
    await axios.delete("http://localhost:3500/items/" + (index + 1));
    console.log(data);
  };

  return (
    <div className="flex justify-center">
      <div className=" max-auto max-w-[1500px] w-[90vw]">
        <div className={`grid grid-cols-12 place-items-center py-2 text-white  text-center space-x-10  bg-green-600`}>
          {/* MAP THROUGH COLUMN NAME */}
          <div />
          {columns.map((oneColumn, index) => (
            <p key={index} className="font-bold">
              {oneColumn.title}
            </p>
          ))}
          <div />
        </div>
        {/* MAP THROUGH DATA FROM API IF EXISTS */}
        {data &&
          data.length > 0 &&
          data.map((oneComp, index) => {
            return <DataComp oneComp={oneComp} index={index} deleteData={deleteData} />;
          })}
      </div>
    </div>
  );
};

export default Main;
