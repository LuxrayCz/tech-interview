import React from 'react'

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
      
}
interface Props{
    record: Record,
    index: number
}
const Record = ({record, index}: Props) => {
    console.log("reacord", record)
  return (
    <div className={`grid grid-cols-6 place-items-center py-2 text-white  text-center space-x-10 ${index % 2 === 0 ? "bg-gray-600" : "bg-gray-900"} `}>
        <p>{record.data.ID}</p>
        <p>{record.data.Character_Id}</p>
        <p>{record.data.Is_Alive}</p>
        <p>{record.data.Years}</p>
    </div>
  )
}

export default Record