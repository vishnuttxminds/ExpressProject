

const objArray = [
  { id: 1, name: "Jabbar" },
  { id: 2, name: "Vishwam" },
  { id: 3, name: "Jose" },
  { id: 4, name: "Abu Tahir" },
  { id: 5, name: "Mannadiyar" },
  { id: 6, name: "Kouravar" },
  { id: 7, name: "Chako maash" },
];
const actualSize = objArray.length;

export const arrayInsertion = (item: { id: number; name: string }) => {
  const promise = new Promise<void>(function (resolve, reject) {
    objArray.push(item);
    if (objArray.length > actualSize) {
      resolve();
    } else {
      reject();
    }
  });
  return promise;
};

export const getAllList = () => {
  return objArray;
};

const checkTheIdAvailability = async (index: number) => {
  return (index = objArray.findIndex((item) => item.id === index));
};


export const deleteFromArray = async (id: number) => {
  let currentSize = objArray.length;


  let itemId = await checkTheIdAvailability(id);

  console.log("PARSAM > ", itemId);
  
  const promise = new Promise<void>(function (resolve, reject) {
    if (itemId !== -1) {
      objArray.splice(itemId, 1);
    } else {
      reject("There is no id found in the list :");
    }
    if (objArray.length < currentSize) {
      resolve();
    } else {
      reject("Delete item is not success");
    }
  });
  return promise;
};

export const updateIteamOfArray = async (item: {
  id: number;
  name: string;
}) => {
  let itemId = await checkTheIdAvailability(item.id);

  const promise = new Promise<void>(function (resolve, reject) {
    if (itemId !== -1) {
      objArray[itemId].name = item.name;
      resolve();
    } else {
      reject("There is no id found in the list :");
    }
  });
  return promise;
};
