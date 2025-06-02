'use strict'
import { DragDropContext, Droppable, Draggable, type DropResult } from '@hello-pangea/dnd';
import { useState, useEffect } from 'react';
import styles from './Boards.module.css';
import type { Task } from './types/Board';

const STATUSES = ['Backlog', 'InProgress', 'Done'] as const;

const updateTaskStatus = async (taskId: number, newStatus: string) => {
  const response = await fetch(`/api/tasks/updateStatus/${taskId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status: newStatus }),
  });

  if (!response.ok) {
    throw new Error('Ошибка при обновлении статуса задачи');
  }

  return response.json();
};

type DragAndDropProps = {
  tasks: Task[];
};

const DragAndDrop = ({ tasks }: DragAndDropProps) => {
  const [columns, setColumns] = useState<Record<string, Task[]>>({});

  useEffect(() => {
    const grouped: Record<string, Task[]> = {};
    STATUSES.forEach(status => {
      grouped[status] = tasks.filter(task => task.status === status);
    });
    setColumns(grouped);
  }, [tasks]);

  const handleDragEnd = async (result: DropResult) => {
    if (!result.destination) return;

    const sourceCol = result.source.droppableId;
    const destCol = result.destination.droppableId;

    if (sourceCol === destCol) {
      const updatedTasks = reorderTasks(columns[sourceCol], result.source.index, result.destination.index);
      setColumns({ ...columns, [sourceCol]: updatedTasks });
    } else {
      const { updatedSource, updatedDest, movedTask } = moveTaskBetweenColumns(
        columns[sourceCol],
        columns[destCol],
        result.source.index,
        result.destination.index,
        destCol
      );
      setColumns({ ...columns, [sourceCol]: updatedSource, [destCol]: updatedDest });

      try {
        await updateTaskStatus(movedTask.id, destCol);
      } catch (error) {
        console.error('Ошибка при обновлении статуса задачи:', error);
        setColumns({ ...columns }); // Восстановление предыдущего состояния
      }
    }
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div style={{ display: 'flex', gap: 24 }}>
        {STATUSES.map(status => (
          <Droppable droppableId={status} key={status}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                style={{
                  flex: 1,
                  background: '#f4f4f4',
                  borderRadius: 8,
                  padding: 16,
                  minHeight: 300,
                }}
              >
                <h2>{status}</h2>
                <ul className={styles.tasksList}>
                  {columns[status]?.map((task, index) => (
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
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
};

export default DragAndDrop;

// --- Вспомогательные функции ---

const reorderTasks = (tasks: Task[], startIndex: number, endIndex: number): Task[] => {
  const result = Array.from(tasks);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const moveTaskBetweenColumns = (
  sourceTasks: Task[],
  destTasks: Task[],
  sourceIndex: number,
  destIndex: number,
  newStatus: string
) => {
  const updatedSource = Array.from(sourceTasks);
  const updatedDest = Array.from(destTasks);
  const [movedTask] = updatedSource.splice(sourceIndex, 1);
  movedTask.status = newStatus as Task['status'];
  updatedDest.splice(destIndex, 0, movedTask);
  return { updatedSource, updatedDest, movedTask };
};