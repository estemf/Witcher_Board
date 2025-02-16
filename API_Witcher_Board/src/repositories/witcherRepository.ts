import { Witcher } from "../model/model";

const witchers: Witcher[] = [];

export const getWitchers = () => witchers;

export const getWitcher = (id: number) => {
  return witchers.find((witcher) => witcher.id === id);
};

let index = 1;
export const addWitcher = (witcher: Omit<Witcher, "id">) => {
  const newWitcher: Witcher = {
    id: index,
    ...witcher,
  };

  witchers.push(newWitcher);

  index++;

  return newWitcher;
};
