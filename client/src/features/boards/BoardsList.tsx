import { useQuery } from '@tanstack/react-query';
import type { Board } from './types/Board';
import BoardItem from './BoardItem';

const fetchBoards = async (): Promise<Board[]> => {
  const response = await fetch('http://localhost:8081/api/v1/boards');
  if (!response.ok) {
    throw new Error('Ошибка при загрузке данных');
  }
  const data = await response.json();
  return data.data; // Достаём массив из ключа "data"
};

const BoardsList = () => {
  const {
    data: boards,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['boards'],
    queryFn: fetchBoards,
  });

  if (isLoading) return <div>Загрузка...</div>;
  if (error instanceof Error) return <div>Ошибка: {error.message}</div>;

  return (
    <div>
      {boards?.map(board => (
        <BoardItem board={board} key={board.id} />
      ))}
    </div>
  );
};

export default BoardsList;
