import {
  TaskEnum,
  CreateTask,
  DeleteTask,
  UpdateTask,
  CheckedTask,
  DeleteAllTasks,
  DeleteDoneTasks,
} from './task.types';

export const TaskActionCreator = {
  createTask: (name: string): CreateTask => {
    const newTask = {
      name,
      isDone: false,
    };
    return {
      type: TaskEnum.CREATE_TASK,
      payload: newTask,
    };
  },
  updateTask: (id: number | string, name: string): UpdateTask => {
    return {
      type: TaskEnum.UPDATE_TASK,
      payload: { id, name },
    };
  },
  deleteTask: (id: number | string): DeleteTask => {
    return {
      type: TaskEnum.DELETE_TASK,
      payload: { id },
    };
  },
  checkedTask: (id: number | string, isDone: boolean): CheckedTask => {
    return {
      type: TaskEnum.CHECKED_TASK,
      payload: { id, isDone },
    };
  },

  deleteAllTasks: (): DeleteAllTasks => {
    return {
      type: TaskEnum.DELETE_ALL_TASKS,
    };
  },
  deleteDoneTasks: (): DeleteDoneTasks => {
    return {
      type: TaskEnum.DELETE_DONE_TASKS,
    };
  },
};
