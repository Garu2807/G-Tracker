import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import styles from './Boards.module.css';
import type { Task } from './types/Board';
import { DragDropContext, Droppable, Draggable, type DropResult } from '@hello-pangea/dnd';
import { useState, useEffect } from 'react';

const getBoardTasks = async (id: string): Promise<{ data: Task[] }> => {
  const response = await fetch(`/api/boards/${id}`);
  if (!response.ok) {
    throw new Error('Ошибка при загрузке задач');
  }
  return response.json();
};

function BoardPage() {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, error } = useQuery({
    queryKey: ['boardTasks', id],
    queryFn: () => getBoardTasks(id!),
    enabled: !!id,
  });

  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    if (data?.data) {
      setTasks(data.data);
    }
  }, [data]);

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const reorderedTasks = Array.from(tasks);
    const [removed] = reorderedTasks.splice(result.source.index, 1);
    reorderedTasks.splice(result.destination.index, 0, removed);

    setTasks(reorderedTasks);
  };

  if (isLoading) {
    return <div className={styles.loading}>Загрузка...</div>;
  }

  if (error instanceof Error) {
    return <div className={styles.error}>Ошибка: {error.message}</div>;
  }

  if (!tasks || tasks.length === 0) {
    return <div className={styles.notFound}>Задачи не найдены</div>;
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className={styles.container}>
        <h1 className={styles.title}>Задачи доски</h1>
        <Droppable droppableId="tasks">
          {(provided) => (
            <ul
              className={styles.tasksList}
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {tasks.map((task, index) => (
                <Draggable key={task.id} draggableId={String(task.id)} index={index}>
                  {(provided) => (
                    <li
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={styles.taskItem}
                    >
                      <h3>{task.title}</h3>
                      <p>{task.description}</p>
                      <p>
                        <strong>Приоритет:</strong> {task.priority}
                      </p>
                      <p>
                        <strong>Статус:</strong> {task.status}
                      </p>
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
}

export default BoardPage;