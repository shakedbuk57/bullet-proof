import { useState } from 'react';

import { Task, TaskStatus } from '@/types/api';
import { cn } from '@/utils/cn';

import { TASK_STATUSES } from '../constants';

import { KanbanCard } from './kanban-card';

export type KanbanColumnProps = {
  status: { value: TaskStatus; label: string };
  statusIndex: number;
  tasks: Task[];
  draggingTaskId: string | null;
  onTaskMove: (taskId: string, status: TaskStatus) => void;
  onDragTaskStart: (taskId: string) => void;
  onDragTaskEnd: () => void;
};

export const KanbanColumn = ({
  status,
  statusIndex,
  tasks,
  draggingTaskId,
  onTaskMove,
  onDragTaskStart,
  onDragTaskEnd,
}: KanbanColumnProps) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const previousStatus = TASK_STATUSES[statusIndex - 1];
  const nextStatus = TASK_STATUSES[statusIndex + 1];

  return (
    <section
      aria-label={status.label}
      onDragOver={(event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
        setIsDragOver(true);
      }}
      onDragLeave={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node)) {
          setIsDragOver(false);
        }
      }}
      onDrop={(event) => {
        event.preventDefault();
        setIsDragOver(false);
        onDragTaskEnd();
        const taskId = event.dataTransfer.getData('text/plain');
        if (taskId) {
          onTaskMove(taskId, status.value);
        }
      }}
      className={cn(
        'flex w-72 shrink-0 flex-col rounded-lg bg-muted p-2 transition-colors',
        isDragOver && 'bg-accent ring-1 ring-ring',
      )}
    >
      <div className="flex items-center justify-between px-2 py-2">
        <h2 className="text-sm font-medium">{status.label}</h2>
        <span className="rounded-full bg-background px-2 py-0.5 text-xs text-muted-foreground">
          {tasks.length}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-2">
        {tasks.map((task) => (
          <KanbanCard
            key={task.id}
            task={task}
            previousStatus={previousStatus}
            nextStatus={nextStatus}
            isDragging={draggingTaskId === task.id}
            onMove={onTaskMove}
            onDragStart={onDragTaskStart}
            onDragEnd={onDragTaskEnd}
          />
        ))}
        {tasks.length === 0 && (
          <div className="flex h-24 items-center justify-center rounded-md border border-dashed text-xs text-muted-foreground">
            No tasks yet
          </div>
        )}
      </div>
    </section>
  );
};
