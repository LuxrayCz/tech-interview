import { ArrowBigRight, X } from "lucide-react";
import Record from "./Record";
import { useState } from "react";

type Props = {
  oneComp: DataType;
  index: number;
  deleteData: (index: number) => Promise<void>;
  deleteChildren: DeleteChildrenType;
  deleteRecord: DeleteRecordType;
};

const DataComp = ({ oneComp, index, deleteData, deleteChildren, deleteRecord }: Props) => {
  const [isChildrenShown, setIsChildrenShown] = useState(false);

  if (oneComp.children.has_nemesis) {
    const filteredRecords = oneComp.children.has_nemesis.records.filter((oneRecord) => oneRecord.data.ID !== "454");
  }

  return (
    <div>
      {/* SHOW DATA */}
      <div
        className={`grid grid-cols-12 place-items-center py-2 text-white  text-center space-x-10 ${index % 2 === 0 ? "bg-gray-600" : "bg-gray-900"} `}
      >
        <div className="cursor-pointer" onClick={() => setIsChildrenShown((prev) => !prev)}>
          {oneComp.children.has_nemesis ? <ArrowBigRight className="w-5 h-5" /> : null}
        </div>
        <p>{oneComp.data.ID}</p>
        <p>{oneComp.data.Name}</p>
        <p>{oneComp.data.Gender}</p>
        <p>{oneComp.data.Ability}</p>
        <p>{oneComp.data.Minimal_Distance}</p>
        <p>{oneComp.data.Weight}</p>
        <p>{oneComp.data.Born}</p>
        <p>{oneComp.data.In_Space_Since}</p>
        <p>{oneComp.data.Beer_Consumption}</p>
        <p>{oneComp.data.Knows_the_Answer}</p>
        <div className="flex items-center justify-center cursor-pointer" onClick={() => deleteData(oneComp.id)}>
          <X className="h-7 w-7" />
        </div>
      </div>

      {/* SHOW CHILdren if exists */}
      {oneComp.children.has_nemesis && isChildrenShown ? (
        <div className="ml-10 w-full  mb-3">
          <div className="max-w-2xl">
            <div className={`grid grid-cols-6 place-items-center py-2 text-black font-bold  text-center space-x-10 bg-green-600 `}>
              <div />
              <p>ID</p>
              <p>Character_Id</p>
              <p>Is_Alive</p>
              <p>Years</p>
              <p>Delete</p>
            </div>

            {oneComp.children.has_nemesis
              ? oneComp.children.has_nemesis.records.map((record, index) => (
                  <Record
                    key={index}
                    deleteRecord={deleteRecord}
                    record={record}
                    rowIndex={oneComp.id}
                    index={index}
                    deleteChildren={deleteChildren}
                  />
                ))
              : null}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default DataComp;
