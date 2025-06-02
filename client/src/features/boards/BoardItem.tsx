import type { Board } from './types/Board';
import styles from './Boards.module.css';
import { useNavigate } from 'react-router-dom';

type BoardItemProps = {
  board: Board; // Пропс board должен быть типа Board
};

const BoardItem = ({ board }: BoardItemProps) => {
  const navigate = useNavigate(); // Хук для навигации

  const handleClick = () => {
    navigate(`/boards/${board.id}`); // Переход на страницу доски
  };

  return (
    <div className={styles.boardItem}>
      <h2>{board.name}</h2>
      <p>{board.description}</p>
      <p>Количество задач: {board.taskCount}</p>
      <button className={styles.open_btn} onClick={handleClick}>
        Перейти к доске
      </button>
    </div>
  );
};

export default BoardItem;