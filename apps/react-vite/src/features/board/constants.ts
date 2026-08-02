import { TaskStatus } from '@/types/api';

export const TASK_STATUSES: { value: TaskStatus; label: string }[] = [
  { value: 'super-super-backlog', label: 'Super Super Backlog' },
  { value: 'super-backlog', label: 'Super Backlog' },
  { value: 'backlog', label: 'Backlog' },
  { value: 'todo', label: 'To Do' },
  { value: 'in-progress', label: 'In Progress' },
  { value: 'done', label: 'Done' },
];
