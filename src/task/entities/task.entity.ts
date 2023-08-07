export interface Task {
  id: string;
  title: string;
  description: string;
  status: Status;
  dueDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

export enum Status {
  TODO = 'TODO',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}
