import { useQuery } from '@tanstack/react-query';
import type { Board } from './types/Board';
import BoardItem from './BoardItem';
import styles from './boards.module.css';

const getBoards = async (): Promise<{ data: Board[] }> => {
  const response = await fetch('/api/boards');
  if (!response.ok) {
    throw new Error('Ошибка при загрузке данных');
  }
  return response.json(); // Возвращаем весь ответ
};

const BoardsList = () => {

  const { data: boards, isLoading, error } = useQuery({
    queryKey: ['boards'],
    queryFn: getBoards,
    select: (response) => response.data, // Извлекаем только поле "data"
  });

  if (isLoading) {
    return <div className={styles.container}>Загрузка...</div>;
  }

  if (error instanceof Error) {
    return <div className={styles.error}>Ошибка: {error.message}</div>;
  }

  if (!boards || boards.length === 0) {
    return <div className={styles.noBoards}>Доски не найдены</div>;
  }

  return (
    <div className={styles.container}>
      {boards.map((board) => (
          <BoardItem key={board.id}board={board} />
      ))}
    </div>
  );
};

export default BoardsList;