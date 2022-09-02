type House = {
  id: number;
  address: string;
  type: string;
  
  // Resident?: Resident[];
};
type Resident = {
  id: number;
  name: string;
  age: number;
  gender: string;
  houseId: number;
  // house?: House[];
};

export const residents: Resident[] = [
  { id: 1, name: "Paul", age: 29, gender: "male" , houseId:1},
  { id: 2, name: "Scarlet", age: 30, gender: "female" ,houseId:2},
  { id: 3, name: "Monica", age: 28, gender: "female" ,houseId:3},
  { id: 4, name: "joey", age: 27, gender: "male" ,houseId:4},
];

export const houses: House[] = [
  { id: 1, address: "1428 Elm Street,", type: "house",  },
  { id: 2, address: "123 farm Street", type: "farm",  },
  { id: 3, address: "234 Texas Farm Street ", type: "farm", },
  { id: 4, address: "676 Manhattan Street", type: "flat",  },
  { id: 5, address: "890 Washington Street", type: "house",  },
];
