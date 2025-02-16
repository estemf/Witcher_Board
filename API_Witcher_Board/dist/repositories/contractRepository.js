"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeContract = exports.completeContract = exports.assignContract = exports.updateContract = exports.addContract = exports.getContract = exports.getContracts = void 0;
const model_1 = require("../model/model");
let contracts = [];
const filterContract = (filter, contract) => {
    if (!filter) {
        return true;
    }
    if (filter.title && !contract.title.includes(filter.title)) {
        return false;
    }
    if (filter.assignedTo && contract.assignedTo !== filter.assignedTo) {
        return false;
    }
    return !filter.status || filter.status === contract.status;
};
const getContracts = (filter) => {
    return contracts.filter((contract) => filterContract(filter, contract));
};
exports.getContracts = getContracts;
const getContract = (id) => {
    return contracts.find((contract) => contract.id === id);
};
exports.getContract = getContract;
let index = 1;
const addContract = (contract) => {
    const newContract = Object.assign(Object.assign({}, contract), { id: index, status: model_1.Status.AVAILABLE, assignedTo: null });
    contracts.push(newContract);
    index++;
    return newContract;
};
exports.addContract = addContract;
const updateContract = (id, updateContract) => {
    const contract = (0, exports.getContract)(id);
    if (!contract) {
        return undefined;
    }
    Object.assign(contract, updateContract);
    return contract;
};
exports.updateContract = updateContract;
const assignContract = (id, witcherId) => {
    const contract = (0, exports.getContract)(id);
    if (!contract) {
        return undefined;
    }
    if (contract.status !== model_1.Status.AVAILABLE || contract.assignedTo) {
        return contract;
    }
    Object.assign(contract, {
        status: model_1.Status.ASSIGNED,
        assignedTo: witcherId,
    });
    return contract;
};
exports.assignContract = assignContract;
const completeContract = (id) => {
    const contract = (0, exports.getContract)(id);
    if (!contract) {
        return undefined;
    }
    if (contract.status !== model_1.Status.ASSIGNED) {
        return contract;
    }
    Object.assign(contract, {
        status: model_1.Status.COMPLETED,
    });
    return contract;
};
exports.completeContract = completeContract;
const removeContract = (id) => {
    const contract = (0, exports.getContract)(id);
    if (!contract) {
        return undefined;
    }
    contracts = contracts.filter((contract) => contract.id !== id);
    return contract;
};
exports.removeContract = removeContract;
