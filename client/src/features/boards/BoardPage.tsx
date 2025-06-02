import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import styles from './Boards.module.css';
import type { Task } from './types/Board';
import DragAndDrop from './DragAndDrop';

const getBoardTasks = async (id: string): Promise<{ data: Task[] }> => {
  const response = await fetch(`/api/boards/${id}`);
  if (!response.ok) throw new Error('Ошибка при загрузке задач');
  return response.json();
};

function BoardPage() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, error } = useQuery({
    queryKey: ['boardTasks', id],
    queryFn: () => getBoardTasks(id!),
    enabled: !!id,
  });

  if (isLoading) return <div className={styles.loading}>Загрузка...</div>;
  if (error instanceof Error) return <div className={styles.error}>Ошибка: {error.message}</div>;
  if (!data || data.data.length === 0) return <div className={styles.notFound}>Задачи не найдены</div>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Задачи доски</h1>
      <DragAndDrop tasks={data.data} />
    </div>
  );
}

export default BoardPage;