import type { Board } from './types/Board';

type BoardItemProps = {
  board: Board; // Пропс board должен быть типа Board
};

const BoardItem = ({ board }: BoardItemProps) => {
  return (
    <div>
      <h2>{board.name}</h2>
      <p>{board.description}</p>
      <p>Количество задач: {board.taskCount}</p>
    </div>
  );
};

export default BoardItem;