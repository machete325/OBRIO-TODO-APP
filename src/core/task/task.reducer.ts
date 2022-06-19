import { TaskEnum, TaskState, TaskAction } from './task.types';

const initialState: TaskState = {
  data: [
    { id: 1, name: 'Learn React', isDone: false },
    { id: 2, name: 'Go to a Shop', isDone: true },
    { id: 3, name: 'Read a book', isDone: false },
  ],
};

const taskReducer = (state = initialState, action: TaskAction) => {
  switch (action.type) {
    case TaskEnum.CREATE_TASK: {
      const { name, isDone } = action.payload;
      const id = Math.floor(Math.random() * 1000000) + 1;
      const newTask = {
        id,
        name,
        isDone,
      };
      return { ...state, data: [...state.data, newTask] };
    }
    case TaskEnum.UPDATE_TASK: {
      const { id, name } = action.payload;
      const data = state.data.map((elem) => ({ ...elem }));
      data.find((task) => {
        if (task.id == id) {
          return (task.name = name);
        }
      });
      return { ...state, data };
    }
    case TaskEnum.DELETE_TASK: {
      const { id } = action.payload;
      const filteredData = state.data.filter((elem) => elem.id != id);
      return { ...state, data: filteredData };
    }
    case TaskEnum.CHECKED_TASK: {
      const { id, isDone } = action.payload;
      const data = state.data.map((elem) => ({ ...elem }));
      data.find((task) => {
        if (task.id == id) {
          return (task.isDone = isDone);
        }
      });
      return { ...state, data };
    }
    case TaskEnum.DELETE_ALL_TASKS: {
      return { ...state, data: [] };
    }
    case TaskEnum.DELETE_DONE_TASKS: {
      const filteredData = state.data.filter((elem) => !elem.isDone);
      return { ...state, data: filteredData };
    }
    default:
      return state;
  }
};

export default taskReducer;
