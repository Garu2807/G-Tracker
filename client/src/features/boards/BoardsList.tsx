import { useQuery } from '@tanstack/react-query';
import type { Board } from './types/Board';
import BoardItem from './BoardItem';

const getBoards = async (): Promise<Board[]> => {
  const response = await fetch('/api/boards');
  if (!response.ok) {
    throw new Error('Ошибка при загрузке данных');
  }
  
  const data = await response.json();
  return data.data;
};

const BoardsList = () => {
  const {data: boards, isLoading, error} = useQuery({
    queryKey: ['boards'],
    queryFn: getBoards,
  });

  if (error instanceof Error) return <div>Ошибка: {error.message}</div>;

  return <div>{isLoading ? 'Загрузка...' : boards?.length ? boards.map(board => <BoardItem board={board} key={board.id} />) : 'Доски не найдены'}</div>;
};

export default BoardsList;