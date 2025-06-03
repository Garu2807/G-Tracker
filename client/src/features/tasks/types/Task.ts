'use strict';

// Тип для исполнителя задачи
export type Assignee = {
  id: number;
  fullName: string;
  email: string;
  avatarUrl: string;
};

// Тип для задачи
export type Task = {
  id: number;
  title: string;
  description: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'Done' | 'InProgress' | 'Backlog';
  assignee: Assignee; // Вложенный объект исполнителя
  boardId: number; // ID доски
  boardName: string; // Название доски
};


export type TaskResponse = {
  data: Task[];
};