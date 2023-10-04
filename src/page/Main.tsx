import { useEffect, useState } from "react";
import DataComp from "../components/DataComp";
import axios from "axios";
import { columns } from "../constans";
import { Loader2 } from "lucide-react";

const Main = () => {
  //FETCH ALL DATA
  const [data, setData] = useState<DataType[]>();
  const [loadings, setLoadings] = useState<Loadings>({
    rowIsLoading: false,
    childrenIsLoading: false,
    recordIsLoading: false,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        await axios
          .get("http://localhost:3500/items")
          .then((res) => setData(res.data));
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  // Delete data from db and front-end
  const deleteData = async (index: number) => {
    setData((prev) => prev?.filter((oneData) => oneData.id !== index));
    setLoadings({ ...loadings, rowIsLoading: true });
    try {
      await axios.delete("http://localhost:3500/items/" + index);
      setLoadings({ ...loadings, rowIsLoading: false });
    } catch (error) {
      console.log(error);
      setLoadings({ ...loadings, rowIsLoading: false });
    }
  };

  //DELETE CHILDREN BY USING PUT
  const deleteChildren = async (recordId: string, characterId: string) => {
    setLoadings({ ...loadings, childrenIsLoading: true });
    let data2 = data?.find((oneData) => oneData.data.ID === characterId);
    const records = data2?.children.has_nemesis.records.filter(
      (oneRecord) => oneRecord.data.ID !== recordId
    );

    let payload;
    if (records?.length === 0) {
      payload = { id: data2?.id, data: data2?.data, children: {} };
    } else {
      payload = {
        id: data2?.id,
        data: data2?.data,
        children: {
          has_nemesis: {
            records,
          },
        },
      };
    }
    try {
      await axios.put("http://localhost:3500/items/" + data2?.id, payload);
      await axios
        .get("http://localhost:3500/items")
        .then((res) => setData(res.data));
      setLoadings({ ...loadings, childrenIsLoading: false });
    } catch (error) {
      console.log(error);
      setLoadings({ ...loadings, childrenIsLoading: false });
    }
  };

  const deleteRecord = async (rowIndex: number, recordChildrenId: string) => {
    setLoadings({ ...loadings, recordIsLoading: true });
    const row = data?.find((oneRow) => oneRow.id === rowIndex);

    const filteredRecords = row?.children.has_nemesis.records.map(
      (oneRecord) => {
        if (oneRecord) {
          if (oneRecord.children.has_secrete) {
            const filteredRecord =
              oneRecord.children.has_secrete.records.filter(
                (oneRecordData) => oneRecordData.data.ID !== recordChildrenId
              );
            if (filteredRecord.length > 0) {
              return {
                data: {
                  ID: oneRecord.data.ID,
                  Character_Id: oneRecord.data.Character_Id,
                  Is_Alive: oneRecord.data.Is_Alive,
                  Years: oneRecord.data.Years,
                },
                children: {
                  has_secrete: {
                    records: filteredRecord,
                  },
                },
              };
            } else {
              return {
                data: {
                  ID: oneRecord.data.ID,
                  Character_Id: oneRecord.data.Character_Id,
                  Is_Alive: oneRecord.data.Is_Alive,
                  Years: oneRecord.data.Years,
                },
                children: {},
              };
            }
          } else {
            return {
              data: {
                ID: oneRecord.data.ID,
                Character_Id: oneRecord.data.Character_Id,
                Is_Alive: oneRecord.data.Is_Alive,
                Years: oneRecord.data.Years,
              },
              children: {},
            };
          }
        }
        return;
      }
    );

    let payload = {
      id: row?.id,
      data: row?.data,
      children: {
        has_nemesis: {
          records: filteredRecords,
        },
      },
    };
    try {
      await axios.put("http://localhost:3500/items/" + rowIndex, payload);
      await axios
        .get("http://localhost:3500/items")
        .then((res) => setData(res.data));
      setLoadings({ ...loadings, recordIsLoading: false });
    } catch (error) {
      console.log(error);
      setLoadings({ ...loadings, recordIsLoading: false });
    }
  };

  return (
    <div className="flex justify-center">
      <div className=" max-auto max-w-[1500px] w-[90vw]">
        <div
          className={`grid grid-cols-12 place-items-center py-2 text-black font-bold   text-center space-x-10  bg-green-600`}
        >
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
        {data && data.length > 0 ? (
          data.map((oneComp, index) => {
            return (
              <DataComp
                key={index}
                deleteRecord={deleteRecord}
                oneComp={oneComp}
                index={index}
                loadings={loadings}
                deleteData={deleteData}
                deleteChildren={deleteChildren}
              />
            );
          })
        ) : (
          <div className="flex justify-center">
            <Loader2 className="animate-spin w-10 h-10" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Main;
