import { ArrowBigRight, X } from "lucide-react";

type Props = {
  oneComp: DataType;
  index: number;
  deleteData: (index: number) => Promise<void>;
};

const DataComp = ({ oneComp, index, deleteData }: Props) => {
  console.log(oneComp.data.ID);
  console.log(index % 2);
  return (
    <div
      className={`grid grid-cols-12 place-items-center py-2 text-white  text-center space-x-10 ${index % 2 === 0 ? "bg-gray-600" : "bg-gray-900"} `}
    >
      <div className="cursor-pointer">
        <ArrowBigRight className="w-5 h-5" />
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
      <div className="flex items-center justify-center cursor-pointer" onClick={() => deleteData(index)}>
        <X className="w-5 h-5" />
      </div>
    </div>
  );
};

export default DataComp;
