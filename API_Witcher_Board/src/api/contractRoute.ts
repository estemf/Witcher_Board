import { Request, Response, Router } from "express";
import {
  addContract,
  assignContract,
  completeContract,
  CreateContractType,
  getContract,
  getContracts,
  removeContract,
  updateContract,
} from "../repositories/contractRepository";
import { Contract, Status } from "../model/model";
import { z } from "zod";
import { getId } from "./utils";
import { getWitcher } from "../repositories/witcherRepository";

export const ContractRoute = Router();

const FilterSchema = z.object({
  title: z.string().optional(),
  assignedTo: z.coerce.number().optional(),
  status: z.nativeEnum(Status).optional(),
});

ContractRoute.get("/", (req, res) => {
  let filter;
  try {
    filter = FilterSchema.parse({
      title: req.query.title,
      assignedTo: req.query.assignedTo,
      status: req.query.status,
    });
  } catch (e) {
    res.status(400).json({ message: "Bad filters." });
    return;
  }

  res.status(200).json(getContracts(filter));
});

const getContractId = (req: Request<{ id: string }>) => {
  try {
    return getId(req.params.id);
  } catch (e) {
    console.error(e);
    return undefined;
  }
};

type ContractResponse = Response<Contract | { message: string }>;

ContractRoute.get("/:id", (req, res: ContractResponse) => {
  const contractId = getContractId(req);
  if (!contractId) {
    res.status(404).json({ message: "Contract not found." });
    return;
  }

  const contract = getContract(contractId);
  if (!contract) {
    res.status(404).json({ message: "Contract not found." });
    return;
  }

  res.status(200).json(contract);
});

const createContractSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  reward: z.string().min(1),
});

const validateContract = (contract: CreateContractType): CreateContractType => {
  return createContractSchema.parse(contract);
};

type CreateContractRequest = Request<z.infer<typeof createContractSchema>>;

ContractRoute.post("/", (req: CreateContractRequest, res) => {
  let contract;
  try {
    contract = validateContract(req.body);
  } catch (e) {
    res.status(400).json({ message: "Bad request body" });
    console.error(e);
    return;
  }

  res.status(201).json(addContract(contract));
});

ContractRoute.put("/:id", (req, res) => {
  let contract;
  try {
    contract = validateContract(req.body);
  } catch (e) {
    res.status(400).json({ message: "Bad request body" });
    console.error(e);
    return;
  }

  const contractId = getContractId(req);
  if (!contractId) {
    res.status(404).json({ message: "Contract not found." });
    return;
  }

  const updatedContract = updateContract(contractId, contract);
  if (!updatedContract) {
    res.status(404).json({ message: "Contract not found." });
    return;
  }

  res.status(200).json(updatedContract);
});

ContractRoute.put("/:id/assignedTo", (req, res) => {
  let witcherId;
  try {
    witcherId = getId(req.body);
  } catch (e) {
    console.error(e);
    res.status(400).json({ message: "Unknown witcher." });
    return;
  }
  const witcher = getWitcher(witcherId);
  if (!witcher) {
    res.status(400).json({ message: "Unknown witcher." });
    return;
  }

  const contractId = getContractId(req);
  if (!contractId) {
    res.status(404).json({ message: "Contract not found." });
    return;
  }

  const contract = assignContract(contractId, witcherId);
  if (!contract) {
    res.status(404).json({ message: "Contract not found." });
    return;
  }
  if (
    contract.status !== Status.ASSIGNED ||
    contract.assignedTo !== witcherId
  ) {
    res.status(400);
    if (contract.status === Status.COMPLETED) {
      res.json({ message: "Contract already completed." });
    } else if (contract.assignedTo !== witcherId) {
      res.json({ message: "Contract already assigned to another Witcher." });
    } else {
      res.json({ message: "Contract with bad status." });
    }
    return;
  }

  res.status(200).json(contract);
});

ContractRoute.put("/:id/status", (req, res) => {
  const contractId = getContractId(req);
  if (!contractId) {
    res.status(404).json({ message: "Contract not found." });
    return;
  }
  if (req.body !== "Completed") {
    res.status(400).json({ message: "Bad status." });
    return;
  }

  const contract = completeContract(contractId);
  if (!contract) {
    res.status(404).json({ message: "Contract not found." });
    return;
  }
  if (contract.status !== Status.COMPLETED) {
    res.status(400).json({ message: "Contract with bad status." });
    return;
  }

  res.status(200).json(contract);
});

ContractRoute.delete("/:id", (req, res) => {
  const contractId = getContractId(req);
  if (!contractId) {
    res.status(404).json({ message: "Contract not found." });
    return;
  }

  const contract = removeContract(contractId);
  if (!contract) {
    res.status(404).json({ message: "Contract not found." });
    return;
  }

  res.status(200).json(contract);
});
