type DataType = {
  data: {
    ID: string;
    Name: string;
    Gender: string;
    Ability: string;
    Minimal_Distance: string;
    Weight: string;
    Born: string;
    In_Space_Since: string;
    Beer_Consumption: string;
    Knows_the_Answer: string;
  };
  children: {
    has_nemesis: {
      records: [
        {
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
      ];
    };
  };
};