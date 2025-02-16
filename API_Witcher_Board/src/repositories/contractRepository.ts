import { Contract, Status } from "../model/model";

let contracts: Contract[] = [];

export interface Filter {
  title?: string;
  assignedTo?: number;
  status?: Status;
}

const filterContract = (
  filter: Filter | undefined,
  contract: Contract
): boolean => {
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

export const getContracts = (filter?: Filter) => {
  return contracts.filter((contract) => filterContract(filter, contract));
};

export const getContract = (id: number) => {
  return contracts.find((contract) => contract.id === id);
};

export type CreateContractType = Omit<Contract, "id" | "status" | "assignedTo">;

let index = 1;
export const addContract = (contract: CreateContractType) => {
  const newContract: Contract = {
    ...contract,
    id: index,
    status: Status.AVAILABLE,
    assignedTo: null,
  };
  contracts.push(newContract);

  index++;

  return newContract;
};

export const updateContract = (
  id: number,
  updateContract: CreateContractType
) => {
  const contract = getContract(id);
  if (!contract) {
    return undefined;
  }

  Object.assign(contract, updateContract);

  return contract;
};

export const assignContract = (id: number, witcherId: number) => {
  const contract = getContract(id);
  if (!contract) {
    return undefined;
  }
  if (contract.status !== Status.AVAILABLE || contract.assignedTo) {
    return contract;
  }

  Object.assign(contract, {
    status: Status.ASSIGNED,
    assignedTo: witcherId,
  });

  return contract;
};

export const completeContract = (id: number) => {
  const contract = getContract(id);
  if (!contract) {
    return undefined;
  }

  if (contract.status !== Status.ASSIGNED) {
    return contract;
  }

  Object.assign(contract, {
    status: Status.COMPLETED,
  });

  return contract;
};

export const removeContract = (id: number) => {
  const contract = getContract(id);
  if (!contract) {
    return undefined;
  }

  contracts = contracts.filter((contract) => contract.id !== id);

  return contract;
};
