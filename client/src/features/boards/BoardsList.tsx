import { useQuery } from '@tanstack/react-query';
import type { Board } from './types/Board';
import BoardItem from './BoardItem';
import styles from './Boards.module.css';

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

  if (error instanceof Error) return <div>Ошибка: {error.message}</div>;

  return  <div className={styles.container}>{isLoading ? 'Загрузка...' : boards?.length ? boards.map(board => <BoardItem board={board} key={board.id} />) : <div className={styles.noBoards}>Доски не найдены</div>}</div>;
};

export default BoardsList;