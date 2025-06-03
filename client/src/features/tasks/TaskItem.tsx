import type { Task } from './types/Task'
import styles from './tasks.module.css';
import { useNavigate } from 'react-router-dom';
type TaskItemProps = {
  task: Task; 
};
function TaskItem({ task }: TaskItemProps) {
  const navigate = useNavigate(); // Хук для навигации
  const handleClick = () => {
    navigate(`/tasks/${task.id}`); // Переход на страницу доски
  }
  return (
        <div  className={styles['task-item']}>
                <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>
              <strong>Приоритет:</strong> {task.priority}
            </p>

            <p>
              <strong>Статус:</strong> {task.status}
            </p>
            <button onClick={handleClick}>Перейти к задаче</button>
        </div>
  )
}

export default TaskItem
