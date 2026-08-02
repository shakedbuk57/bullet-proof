import { ChevronLeft, ChevronRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Task, TaskStatus } from '@/types/api';
import { cn } from '@/utils/cn';

const priorityStyles: Record<Task['priority'], string> = {
  low: 'bg-secondary text-secondary-foreground',
  medium: 'bg-primary/10 text-primary',
  high: 'bg-destructive/10 text-destructive',
};

const getInitials = (name: string) =>
  name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

export type KanbanCardProps = {
  task: Task;
  previousStatus?: { value: TaskStatus; label: string };
  nextStatus?: { value: TaskStatus; label: string };
  isDragging: boolean;
  onMove: (taskId: string, status: TaskStatus) => void;
  onDragStart: (taskId: string) => void;
  onDragEnd: () => void;
};

export const KanbanCard = ({
  task,
  previousStatus,
  nextStatus,
  isDragging,
  onMove,
  onDragStart,
  onDragEnd,
}: KanbanCardProps) => {
  return (
    <div
      draggable
      onDragStart={(event) => {
        event.dataTransfer.setData('text/plain', task.id);
        event.dataTransfer.effectAllowed = 'move';
        onDragStart(task.id);
      }}
      onDragEnd={onDragEnd}
      className={cn(
        'group cursor-grab rounded-md border bg-card p-3 shadow-sm transition-opacity',
        isDragging && 'cursor-grabbing opacity-50',
      )}
    >
      <p className="text-sm font-medium text-card-foreground">{task.title}</p>
      <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
        {task.description}
      </p>
      <div className="mt-3 flex items-center gap-2">
        <span
          className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[10px] font-medium text-primary"
          title={task.assignee}
        >
          {getInitials(task.assignee)}
        </span>
        <span
          className={cn(
            'rounded-full px-2 py-0.5 text-xs font-medium capitalize',
            priorityStyles[task.priority],
          )}
        >
          {task.priority}
        </span>
        <span className="ml-auto flex opacity-0 transition-opacity focus-within:opacity-100 group-hover:opacity-100">
          {previousStatus && (
            <Button
              variant="ghost"
              size="icon"
              className="size-6"
              aria-label={`Move to ${previousStatus.label}`}
              onClick={() => onMove(task.id, previousStatus.value)}
            >
              <ChevronLeft className="size-4" />
            </Button>
          )}
          {nextStatus && (
            <Button
              variant="ghost"
              size="icon"
              className="size-6"
              aria-label={`Move to ${nextStatus.label}`}
              onClick={() => onMove(task.id, nextStatus.value)}
            >
              <ChevronRight className="size-4" />
            </Button>
          )}
        </span>
      </div>
    </div>
  );
};
