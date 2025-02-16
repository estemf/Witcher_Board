export enum Status {
  AVAILABLE = "Available",
  ASSIGNED = "Assigned",
  COMPLETED = "Completed",
}

export interface Witcher {
  id: number;
  name: string;
  avatar: string;
}

export interface Contract {
  id: number;
  title: string;
  description: string;
  reward: string;
  status: Status;
  assignedTo: number | null;
}
