import React from 'react'
import type { Task } from './types/Task';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import styles from './tasks.module.css';

const getTaskById = async (id: string): Promise<{ data: Task }> => {
  const response = await fetch(`/api/tasks/${id}`);
  if (!response.ok) throw new Error('Ошибка при загрузке задач');
  return response.json();
};
function TaskPage() {
      const { id } = useParams<{ id: string }>();
  const { data, isLoading, error } = useQuery({
    queryKey: ['task', id],
    queryFn: () => getTaskById(id!),
    enabled: !!id,
  });
    if (isLoading) return <div className={styles.loading}>Загрузка...</div>;
  if (error instanceof Error) return <div className={styles.error}>Ошибка: {error.message}</div>;
  return (
    <div>
      <h1>{data?.data.title}</h1>
    </div>
  )
}

export default TaskPage
