'use strict';
export type Board = {
  id: number;
  name: string;
  description: string;
  taskCount: number;
};
export type Assignee = {
  id: number;
  fullName: string;
  email: string;
  avatarUrl: string;
};

export type Task = {
  id: number;
  title: string;
  description: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'Done' | 'InProgress' | 'Backlog';
  assignee: Assignee;
};

export type TaskResponse = {
  data: Task[];
};
export type BoardWithTasks = {
  board: Board;
  tasks: Task[];
};
