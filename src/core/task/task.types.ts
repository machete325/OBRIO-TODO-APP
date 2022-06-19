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

export interface createTask {
  type: TaskEnum.CREATE_TASK;
  payload: {
    name: string;
    isDone: boolean;
  };
}

export interface updateTask {
  type: TaskEnum.UPDATE_TASK;
  payload: {
    id: number | string;
    name: string;
  };
}

export interface deleteTask {
  type: TaskEnum.DELETE_TASK;
  payload: {
    id: number | string;
  };
}

export interface checkedTask {
  type: TaskEnum.CHECKED_TASK;
  payload: {
    id: number | string;
    isDone: boolean;
  };
}

export interface deleteAllTasks {
  type: TaskEnum.DELETE_ALL_TASKS;
}

export interface deleteDoneTasks {
  type: TaskEnum.DELETE_DONE_TASKS;
}

export interface TaskElements {
  data: Task[];
}

export type TaskState = TaskElements;

export type TaskAction =
  | createTask
  | updateTask
  | deleteTask
  | checkedTask
  | deleteAllTasks
  | deleteDoneTasks;
