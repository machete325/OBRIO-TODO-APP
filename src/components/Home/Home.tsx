import React, { useEffect, useState, MouseEvent, ChangeEvent, KeyboardEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import { taskSelector } from '../../core/task/task.selectors';
import { TaskActionCreator } from '../../core/task/task.action';

import { MainButton, FooterButton, ListIconButton, ListIcon } from '../../assets/Home_styles';
import s from './Home.module.css';

interface EditTask {
  id: string | null;
  isChange: boolean;
  name: string | null;
}

function Home() {
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const tasksData = useSelector(taskSelector);
  const [newTask, setNewTask] = useState({ name: '' });
  const [data, setData] = useState(tasksData);
  const [editTask, setEditTask] = useState<EditTask>({
    id: null,
    isChange: false,
    name: null,
  });

  useEffect(() => {
    setData(tasksData);
  }, [tasksData]);

  const handleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTask({ ...newTask, name: e.target.value });
  };

  const handleCreate = () => {
    if (newTask.name !== '') {
      dispatch(TaskActionCreator.createTask(newTask.name));
      setNewTask({ ...newTask, name: '' });
    }
  };

  const handleClickEdit = (e: MouseEvent<HTMLButtonElement>) => {
    const id = e.currentTarget.getAttribute('id');
    const name = e.currentTarget.getAttribute('name');
    setEditTask({ ...editTask, id, isChange: true, name });
  };

  const handleClickDelete = (e: MouseEvent<HTMLButtonElement>) => {
    const id: string | number = e.currentTarget.getAttribute('id')!;
    dispatch(TaskActionCreator.deleteTask(id));
  };

  const handleClickDeleteDone = () => {
    dispatch(TaskActionCreator.deleteDoneTasks());
  };

  const handleClickDeleteAll = () => {
    dispatch(TaskActionCreator.deleteAllTasks());
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

  const metricHandler = (e: MouseEvent<HTMLDivElement>) => {
    const name: string | null = (e.target as HTMLElement).title;
    if (name === 'task_container') {
      const id = e.currentTarget.getAttribute('id');
      navigateTo(`/task/${id}`);
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.keyCode === 13) {
      handleCreate();
    }
  };

  return (
    <div className={s.wrapper} onKeyDown={handleKeyDown}>
      <header className={s.header}>Todo List</header>
      <div className={s.search}>
        <div className={s.paper}>
          <ListIconButton sx={{ p: '10px' }} aria-label='menu'>
            <ListIcon />
          </ListIconButton>
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            value={newTask.name}
            onChange={handleChangeName}
            placeholder='New Todo'
          />
        </div>
        <div className={s.search_button_container}>
          <MainButton variant='contained' onClick={handleCreate}>
            Add new Task
          </MainButton>
        </div>
      </div>
      <div className={s.body}>
        {data.map((task) => (
          <div
            key={task.id}
            id={`${task.id}`}
            title='task_container'
            className={s.task_container}
            onClick={metricHandler}
          >
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
      </div>
      <div className={s.footer}>
        <FooterButton variant='contained' onClick={handleClickDeleteDone}>
          Delete done tasks
        </FooterButton>
        <FooterButton variant='contained' onClick={handleClickDeleteAll}>
          Delete all tasks
        </FooterButton>
      </div>
    </div>
  );
}

export default Home;
