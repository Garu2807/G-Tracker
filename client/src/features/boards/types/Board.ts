'use strict';

import type { Task } from "../../tasks/types/Task";

export type Board = {
  id: number;
  name: string;
  description: string;
  taskCount: number;
};

export type BoardWithTasks = {
  board: Board;
  tasks: Task[];
};
