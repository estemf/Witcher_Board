"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContractRoute = void 0;
const express_1 = require("express");
const contractRepository_1 = require("../repositories/contractRepository");
const model_1 = require("../model/model");
const zod_1 = require("zod");
const utils_1 = require("./utils");
const witcherRepository_1 = require("../repositories/witcherRepository");
exports.ContractRoute = (0, express_1.Router)();
const FilterSchema = zod_1.z.object({
    title: zod_1.z.string().optional(),
    assignedTo: zod_1.z.coerce.number().optional(),
    status: zod_1.z.nativeEnum(model_1.Status).optional(),
});
exports.ContractRoute.get("/", (req, res) => {
    let filter;
    try {
        filter = FilterSchema.parse({
            title: req.query.title,
            assignedTo: req.query.assignedTo,
            status: req.query.status,
        });
    }
    catch (e) {
        res.status(400).json({ message: "Bad filters." });
        return;
    }
    res.status(200).json((0, contractRepository_1.getContracts)(filter));
});
const getContractId = (req) => {
    try {
        return (0, utils_1.getId)(req.params.id);
    }
    catch (e) {
        console.error(e);
        return undefined;
    }
};
exports.ContractRoute.get("/:id", (req, res) => {
    const contractId = getContractId(req);
    if (!contractId) {
        res.status(404).json({ message: "Contract not found." });
        return;
    }
    const contract = (0, contractRepository_1.getContract)(contractId);
    if (!contract) {
        res.status(404).json({ message: "Contract not found." });
        return;
    }
    res.status(200).json(contract);
});
const createContractSchema = zod_1.z.object({
    title: zod_1.z.string().min(1),
    description: zod_1.z.string().min(1),
    reward: zod_1.z.string().min(1),
});
const validateContract = (contract) => {
    return createContractSchema.parse(contract);
};
exports.ContractRoute.post("/", (req, res) => {
    let contract;
    try {
        contract = validateContract(req.body);
    }
    catch (e) {
        res.status(400).json({ message: "Bad request body" });
        console.error(e);
        return;
    }
    res.status(201).json((0, contractRepository_1.addContract)(contract));
});
exports.ContractRoute.put("/:id", (req, res) => {
    let contract;
    try {
        contract = validateContract(req.body);
    }
    catch (e) {
        res.status(400).json({ message: "Bad request body" });
        console.error(e);
        return;
    }
    const contractId = getContractId(req);
    if (!contractId) {
        res.status(404).json({ message: "Contract not found." });
        return;
    }
    const updatedContract = (0, contractRepository_1.updateContract)(contractId, contract);
    if (!updatedContract) {
        res.status(404).json({ message: "Contract not found." });
        return;
    }
    res.status(200).json(updatedContract);
});
exports.ContractRoute.put("/:id/assignedTo", (req, res) => {
    let witcherId;
    try {
        witcherId = (0, utils_1.getId)(req.body);
    }
    catch (e) {
        console.error(e);
        res.status(400).json({ message: "Unknown witcher." });
        return;
    }
    const witcher = (0, witcherRepository_1.getWitcher)(witcherId);
    if (!witcher) {
        res.status(400).json({ message: "Unknown witcher." });
        return;
    }
    const contractId = getContractId(req);
    if (!contractId) {
        res.status(404).json({ message: "Contract not found." });
        return;
    }
    const contract = (0, contractRepository_1.assignContract)(contractId, witcherId);
    if (!contract) {
        res.status(404).json({ message: "Contract not found." });
        return;
    }
    if (contract.status !== model_1.Status.ASSIGNED ||
        contract.assignedTo !== witcherId) {
        res.status(400);
        if (contract.status === model_1.Status.COMPLETED) {
            res.json({ message: "Contract already completed." });
        }
        else if (contract.assignedTo !== witcherId) {
            res.json({ message: "Contract already assigned to another Witcher." });
        }
        else {
            res.json({ message: "Contract with bad status." });
        }
        return;
    }
    res.status(200).json(contract);
});
exports.ContractRoute.put("/:id/status", (req, res) => {
    const contractId = getContractId(req);
    if (!contractId) {
        res.status(404).json({ message: "Contract not found." });
        return;
    }
    if (req.body !== "Completed") {
        res.status(400).json({ message: "Bad status." });
        return;
    }
    const contract = (0, contractRepository_1.completeContract)(contractId);
    if (!contract) {
        res.status(404).json({ message: "Contract not found." });
        return;
    }
    if (contract.status !== model_1.Status.COMPLETED) {
        res.status(400).json({ message: "Contract with bad status." });
        return;
    }
    res.status(200).json(contract);
});
exports.ContractRoute.delete("/:id", (req, res) => {
    const contractId = getContractId(req);
    if (!contractId) {
        res.status(404).json({ message: "Contract not found." });
        return;
    }
    const contract = (0, contractRepository_1.removeContract)(contractId);
    if (!contract) {
        res.status(404).json({ message: "Contract not found." });
        return;
    }
    res.status(200).json(contract);
});
