import {
  TaskEnum,
  createTask,
  deleteTask,
  updateTask,
  checkedTask,
  deleteAllTasks,
  deleteDoneTasks,
} from './task.types';

export const TaskActionCreator = {
  createTask: (name: string): createTask => {
    const newTask = {
      name,
      isDone: false,
    };
    return {
      type: TaskEnum.CREATE_TASK,
      payload: newTask,
    };
  },
  updateTask: (id: number | string, name: string): updateTask => {
    return {
      type: TaskEnum.UPDATE_TASK,
      payload: { id, name },
    };
  },
  deleteTask: (id: number | string): deleteTask => {
    return {
      type: TaskEnum.DELETE_TASK,
      payload: { id },
    };
  },
  checkedTask: (id: number | string, isDone: boolean): checkedTask => {
    return {
      type: TaskEnum.CHECKED_TASK,
      payload: { id, isDone },
    };
  },

  deleteAllTasks: (): deleteAllTasks => {
    return {
      type: TaskEnum.DELETE_ALL_TASKS,
    };
  },
  deleteDoneTasks: (): deleteDoneTasks => {
    return {
      type: TaskEnum.DELETE_DONE_TASKS,
    };
  },
};
