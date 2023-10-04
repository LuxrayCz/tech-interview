import { Loader2, X } from "lucide-react";

type RecordChildrenType = {
  data: {
    ID: string;
    Nemesis_id: string;
    Secrete_code: string;
  };
  children: {};
};

interface Props {
  recordChildren: RecordChildrenType;
  index: number;
  rowIndex: number;
  deleteRecord: DeleteRecordType;
  loadings: Loadings;
}
const RecordChildren = ({
  recordChildren,
  index,
  rowIndex,
  deleteRecord,
  loadings,
}: Props) => {
  return (
    <div
      className={`grid grid-cols-4 place-items-center py-2 text-white  text-center space-x-10 ${
        index % 2 === 0 ? "bg-gray-600" : "bg-gray-900"
      } `}
    >
      <p>{recordChildren.data.ID}</p>
      <p>{recordChildren.data.Nemesis_id}</p>
      <p>{recordChildren.data.Secrete_code}</p>
      <button
        disabled={loadings.recordIsLoading}
        className="cursor-pointer"
        onClick={() => deleteRecord(rowIndex, recordChildren.data.ID)}
      >
        {loadings.recordIsLoading ? (
          <Loader2 className="h-7 w-7 animate-spin" />
        ) : (
          <X className="h-7 w-7" />
        )}
      </button>
    </div>
  );
};

export default RecordChildren;
