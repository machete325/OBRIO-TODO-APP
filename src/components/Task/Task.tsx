import React, { useState, useEffect, MouseEvent, ChangeEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import { taskSelector } from '../../core/task/task.selectors';
import { MainButton } from '../../assets/Home_styles';
import { TaskActionCreator } from '../../core/task/task.action';

import s from './Task.module.css';

interface EditTask {
  id: string | null;
  isChange: boolean;
  name: string | null;
}

function Task() {
  const { taskId } = useParams();
  const dispatch = useDispatch();
  const tasksData = useSelector(taskSelector);
  const [data, setData] = useState(tasksData.filter((task) => task.id == taskId));
  const [editTask, setEditTask] = useState<EditTask>({
    id: null,
    isChange: false,
    name: null,
  });

  useEffect(() => {
    setData(tasksData.filter((task) => task.id == taskId));
  }, [tasksData]);

  const handleClickEdit = (e: MouseEvent<HTMLButtonElement>) => {
    const id = e.currentTarget.getAttribute('id');
    const name = e.currentTarget.getAttribute('name');
    setEditTask({ ...editTask, id, isChange: true, name });
  };

  const handleClickDelete = (e: MouseEvent<HTMLButtonElement>) => {
    const id: string | number = e.currentTarget.getAttribute('id')!;
    dispatch(TaskActionCreator.deleteTask(id));
  };

  const handleClickCheckBox = (e: ChangeEvent<HTMLInputElement>) => {
    const id: string | number = e.currentTarget.getAttribute('id')!;
    dispatch(TaskActionCreator.checkedTask(id, e.target.checked));
  };

  const handleClickSave = () => {
    const { id, name } = editTask;
    dispatch(TaskActionCreator.updateTask(id!, name!));
    setEditTask({ ...editTask, isChange: false });
  };

  const handleChangeEditName = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setEditTask({ ...editTask, name });
  };

  return (
    <div className={s.wrapper}>
      {data.map((task, index) => (
        <div key={index} id={`${task.id}`} className={s.task_container}>
          <div className={task.isDone ? s.task_name_done : s.task_name}>
            {editTask.id == task.id && editTask.isChange ? (
              <input
                className={s.task_input}
                onChange={handleChangeEditName}
                value={editTask.name!}
                placeholder='Task Name'
              />
            ) : (
              task.name
            )}
          </div>
          <div className={s.task_buttons_container}>
            <Checkbox id={`${task.id}`} checked={task.isDone} onChange={handleClickCheckBox} />
            {editTask.id == task.id && editTask.isChange ? (
              <IconButton id={`${task.id}`} onClick={handleClickSave}>
                <SaveIcon />
              </IconButton>
            ) : (
              <IconButton id={`${task.id}`} name={task.name} onClick={handleClickEdit}>
                <EditIcon />
              </IconButton>
            )}
            <IconButton id={`${task.id}`} onClick={handleClickDelete}>
              <DeleteIcon />
            </IconButton>
          </div>
        </div>
      ))}
      <div className={s.button_container}>
        <Link to='/'>
          <MainButton variant='contained'>Return to Home page</MainButton>
        </Link>
      </div>
    </div>
  );
}

export default Task;
