import {Item} from "./types";

const MOCK: Item[] = [
  {
    id: 1,
    text: "Helado de pejelagarto",
  },
  {
    id: 2,
    text: "sanguche de pejelagarto",
  },
  {
    id: 3,
    text: "jugo de pejelagarto",
  },
];

export default {
  list: (): Promise<Item[]> => Promise.resolve(MOCK),
  create: (text: Item["text"]): Promise<Item> => Promise.resolve({id: +new Date(), text}),
  remove: (id: Item["id"]): Promise<Item["id"]> => Promise.resolve(id),
};
