import React, { use } from 'react'
import styles from './tasks.module.css'
import type { Task } from './types/Task';
import { useQuery } from '@tanstack/react-query';
import TaskItem from './TaskItem';

const getTasks = async ():Promise<{data: Task[]}> =>{
  const response = await fetch('/api/tasks')
    if (!response.ok) {
    throw new Error('Ошибка при загрузке данных');
  }
  return response.json(); 
}

function TasksList() {
 const { data: tasks, isLoading, error } = useQuery({
    queryKey: ['tasks'],
    queryFn: getTasks,
    select: (response) => response.data, // Извлекаем только поле "data"
  });
    if (isLoading) {
    return <div className={styles.container}>Загрузка...</div>;
  }

  if (error instanceof Error) {
    return <div className={styles.error}>Ошибка: {error.message}</div>;
  }

  if (!tasks || tasks.length === 0) {
    return <div className={styles.noBoards}>Доски не найдены</div>;
  }
  return (
    <div className={styles.container}>
            {tasks.map((task) => (
          <TaskItem key={task.id}task={task} />
      ))}
    </div>
  )
}

export default TasksList
