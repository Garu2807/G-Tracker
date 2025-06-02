import type { Task } from './types/Board'
import styles from './Boards.module.css';
type TaskItemProps = {
  task: Task; 
};
function TaskItem({ task }: TaskItemProps) {
  return (
        <div  className={styles.taskItem}>
                <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>
              <strong>Приоритет:</strong> {task.priority}
            </p>

            <p>
              <strong>Статус:</strong> {task.status}
            </p>
        </div>

 
  )
}

export default TaskItem
