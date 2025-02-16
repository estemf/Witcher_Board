import { Request, Response, Router } from "express";
import { getWitcher, getWitchers } from "../repositories/witcherRepository";
import { getId } from "./utils";
import { Witcher } from "../model/model";

export const WitcherRoute = Router();

const completeAvatar = (witcher: Witcher, req: Request): Witcher => {
  const host = `${req.protocol}://${req.get("host")}`;
  return {
    ...witcher,
    avatar: `${host}/images/${witcher.avatar}.png`,
  };
};

type WitchersResponse = Response<Witcher[] | { message: string }>;
WitcherRoute.get("/", (req, res: WitchersResponse) => {
  res
    .status(200)
    .json(getWitchers().map((witcher) => completeAvatar(witcher, req)));
});

interface WitcherResponse extends Response<Witcher | { message: string }> {}
WitcherRoute.get("/:id", (req, res: WitcherResponse) => {
  const witcher = getWitcher(getId(req.params.id));
  if (!witcher) {
    res.status(404).json({ message: "Witcher not found." });
    return;
  }
  res.status(200).json(completeAvatar(witcher, req));
});
