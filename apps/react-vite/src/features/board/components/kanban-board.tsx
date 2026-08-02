import { useState } from 'react';

import { Task, TaskStatus } from '@/types/api';

import { TASK_STATUSES } from '../constants';

import { KanbanColumn } from './kanban-column';

export type KanbanBoardProps = {
  tasks: Task[];
  onTaskMove: (taskId: string, status: TaskStatus) => void;
};

export const KanbanBoard = ({ tasks, onTaskMove }: KanbanBoardProps) => {
  const [draggingTaskId, setDraggingTaskId] = useState<string | null>(null);

  return (
    <div className="flex items-start gap-4 overflow-x-auto pb-4">
      {TASK_STATUSES.map((status, index) => (
        <KanbanColumn
          key={status.value}
          status={status}
          statusIndex={index}
          tasks={tasks.filter((task) => task.status === status.value)}
          draggingTaskId={draggingTaskId}
          onTaskMove={onTaskMove}
          onDragTaskStart={setDraggingTaskId}
          onDragTaskEnd={() => setDraggingTaskId(null)}
        />
      ))}
    </div>
  );
};
