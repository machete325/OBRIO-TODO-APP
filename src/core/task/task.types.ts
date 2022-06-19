export enum TaskEnum {
  CREATE_TASK = 'CREATE_TASK',
  UPDATE_TASK = 'UPDATE_TASK',
  DELETE_TASK = 'DELETE_TASK',
  CHECKED_TASK = 'CHECKED_TASK',
  DELETE_ALL_TASKS = 'DELETE_ALL_TASKS',
  DELETE_DONE_TASKS = 'DELETE_DONE_TASKS',
}

export interface Task {
  id: number | string;
  name: string;
  isDone: boolean;
}

export interface CreateTask {
  type: TaskEnum.CREATE_TASK;
  payload: {
    name: string;
    isDone: boolean;
  };
}

export interface UpdateTask {
  type: TaskEnum.UPDATE_TASK;
  payload: {
    id: number | string;
    name: string;
  };
}

export interface DeleteTask {
  type: TaskEnum.DELETE_TASK;
  payload: {
    id: number | string;
  };
}

export interface CheckedTask {
  type: TaskEnum.CHECKED_TASK;
  payload: {
    id: number | string;
    isDone: boolean;
  };
}

export interface DeleteAllTasks {
  type: TaskEnum.DELETE_ALL_TASKS;
}

export interface DeleteDoneTasks {
  type: TaskEnum.DELETE_DONE_TASKS;
}

export interface TaskElements {
  data: Task[];
}

export type TaskState = TaskElements;

export type TaskAction =
  | CreateTask
  | UpdateTask
  | DeleteTask
  | CheckedTask
  | DeleteAllTasks
  | DeleteDoneTasks;
