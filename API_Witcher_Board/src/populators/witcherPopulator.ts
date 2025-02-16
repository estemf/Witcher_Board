import { addWitcher } from "../repositories/witcherRepository";

export const populate = () => {
  [
    {
      name: "Geralt",
      avatar: "geralt",
    },
    {
      name: "Ciri",
      avatar: "ciri",
    },
    {
      name: "Lambert",
      avatar: "lambert",
    },
    {
      name: "Eskell",
      avatar: "eskell",
    },
    {
      name: "Vesemir",
      avatar: "vesemir",
    },
    {
      name: "Letho",
      avatar: "letho",
    },
  ].forEach((witcher) => addWitcher(witcher));
};
