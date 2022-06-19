import { RootState } from '../../redux/store';
export const taskSelector = (state: RootState) => state.tasks.data;
