import express from "express";
import { WitcherRoute } from "./api/witcherRoute";
import { ContractRoute } from "./api/contractRoute";

export const routes = express.Router();

routes.use("/api/witchers", WitcherRoute);
routes.use("/api/contracts", ContractRoute);
