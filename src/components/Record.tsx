import { ArrowBigRight, Loader2, X } from "lucide-react";
import { useState } from "react";
import RecordChildren from "./RecordChildren";

type Record = {
  data: {
    ID: string;
    Character_Id: string;
    Is_Alive: string;
    Years: string;
  };
  children: {
    has_secrete: {
      records: [
        {
          data: {
            ID: string;
            Nemesis_id: string;
            Secrete_code: string;
          };
          children: {};
        }
      ];
    };
  };
};
interface Props {
  record: Record;
  index: number;
  deleteChildren: DeleteChildrenType;
  rowIndex: number;
  deleteRecord: DeleteRecordType;
  loadings: Loadings;
}

const Record = ({
  record,
  index,
  deleteChildren,
  rowIndex,
  deleteRecord,
  loadings,
}: Props) => {
  const [recordChildrenShow, setRecordChildrenShow] = useState(false);

  return (
    <div>
      <div
        className={`grid grid-cols-6 place-items-center py-2 text-white  text-center space-x-10 ${
          index % 2 === 0 ? "bg-gray-600" : "bg-gray-900"
        } `}
      >
        <div
          className="cursor-pointer"
          onClick={() => setRecordChildrenShow((prev) => !prev)}
        >
          {record.children.has_secrete ? (
            <ArrowBigRight className="w-5 h-5" />
          ) : null}
        </div>
        <p>{record.data.ID}</p>
        <p>{record.data.Character_Id}</p>
        <p>{record.data.Is_Alive}</p>
        <p>{record.data.Years}</p>
        <button
          className="cursor-pointer"
          disabled={loadings.childrenIsLoading}
          onClick={() =>
            deleteChildren(record.data.ID, record.data.Character_Id)
          }
        >
          {loadings.childrenIsLoading ? (
            <Loader2 className="h-7 w-7 animate-spin" />
          ) : (
            <X className="h-7 w-7" />
          )}
        </button>
      </div>
      <div>
        {recordChildrenShow && (
          <div className="flex justify-center w-full mb-4 ">
            <div>
              {record.children.has_secrete ? (
                <div
                  className={`grid grid-cols-4 place-items-center py-2 text-black font-bold  text-center space-x-10  bg-green-400 `}
                >
                  <p>ID</p>
                  <p>Nemesis_id</p>
                  <p>Secrete_code</p>
                  <div>Delete</div>
                </div>
              ) : null}
              {record.children.has_secrete
                ? record.children.has_secrete.records.map(
                    (oneChildren, index) => (
                      <RecordChildren
                        key={index}
                        deleteRecord={deleteRecord}
                        loadings={loadings}
                        rowIndex={rowIndex}
                        index={index}
                        recordChildren={oneChildren}
                      />
                    )
                  )
                : null}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Record;
