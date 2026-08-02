import { Task, TaskStatus } from '@/types/api';

// Mock data layer for the board feature.
// It simulates a tasks backend in memory until a real API exists:
// `getTasks` and `updateTask` read and write this module-level store,
// so the UI behaves the same way it will against the real endpoints.

const baseCreatedAt = 1717000000000;
const dayMs = 24 * 60 * 60 * 1000;

let tasks: Task[] = [
  {
    id: 'task-1',
    createdAt: baseCreatedAt,
    title: 'Set up CI pipeline',
    description: 'Run lint, type checks, and tests on every pull request.',
    status: 'done',
    priority: 'medium',
    assignee: 'Alice Johnson',
  },
  {
    id: 'task-2',
    createdAt: baseCreatedAt + dayMs,
    title: 'Configure ESLint import boundaries',
    description: 'Forbid cross-feature imports so module boundaries hold.',
    status: 'done',
    priority: 'low',
    assignee: 'Bob Smith',
  },
  {
    id: 'task-3',
    createdAt: baseCreatedAt + 2 * dayMs,
    title: 'Design discussions list view',
    description: 'Table with pagination, prefetch on hover, empty state.',
    status: 'in-progress',
    priority: 'high',
    assignee: 'Carol Danvers',
  },
  {
    id: 'task-4',
    createdAt: baseCreatedAt + 3 * dayMs,
    title: 'Add comment threading',
    description: 'Allow replies to comments on a discussion.',
    status: 'in-progress',
    priority: 'medium',
    assignee: 'Dave Miller',
  },
  {
    id: 'task-5',
    createdAt: baseCreatedAt + 4 * dayMs,
    title: 'Write E2E tests for auth flows',
    description: 'Cover login, register, and logout with Playwright.',
    status: 'in-progress',
    priority: 'medium',
    assignee: 'Alice Johnson',
  },
  {
    id: 'task-6',
    createdAt: baseCreatedAt + 5 * dayMs,
    title: 'Draft team settings page',
    description: 'Rename the team and manage its description.',
    status: 'todo',
    priority: 'low',
    assignee: 'Bob Smith',
  },
  {
    id: 'task-7',
    createdAt: baseCreatedAt + 6 * dayMs,
    title: 'Role-based access on users route',
    description: 'Only admins should see the users list.',
    status: 'todo',
    priority: 'high',
    assignee: 'Carol Danvers',
  },
  {
    id: 'task-8',
    createdAt: baseCreatedAt + 7 * dayMs,
    title: 'Polish empty states across lists',
    description: 'Consistent icon and copy when there is nothing to show.',
    status: 'todo',
    priority: 'low',
    assignee: 'Eve Davis',
  },
  {
    id: 'task-9',
    createdAt: baseCreatedAt + 8 * dayMs,
    title: 'Explore realtime discussion updates',
    description: 'Investigate websockets for live comment feeds.',
    status: 'super-super-backlog',
    priority: 'medium',
    assignee: 'Dave Miller',
  },
  {
    id: 'task-10',
    createdAt: baseCreatedAt + 9 * dayMs,
    title: 'Spike: markdown editor for comments',
    description: 'Evaluate a lightweight markdown input with preview.',
    status: 'backlog',
    priority: 'low',
    assignee: 'Eve Davis',
  },
  {
    id: 'task-11',
    createdAt: baseCreatedAt + 10 * dayMs,
    title: 'Dark mode audit',
    description: 'Check every screen against the dark color tokens.',
    status: 'backlog',
    priority: 'medium',
    assignee: 'Alice Johnson',
  },
  {
    id: 'task-12',
    createdAt: baseCreatedAt + 11 * dayMs,
    title: 'Onboarding flow for new teams',
    description: 'Guide a new team to its first discussion.',
    status: 'super-backlog',
    priority: 'high',
    assignee: 'Bob Smith',
  },
  {
    id: 'task-13',
    createdAt: baseCreatedAt + 12 * dayMs,
    title: 'Q3 roadmap brainstorm',
    description: 'Collect ideas and themes for the next quarter.',
    status: 'super-super-backlog',
    priority: 'medium',
    assignee: 'Carol Danvers',
  },
  {
    id: 'task-14',
    createdAt: baseCreatedAt + 13 * dayMs,
    title: 'Moonshot: offline-first discussions',
    description: 'Explore syncing discussions when the network drops.',
    status: 'super-super-backlog',
    priority: 'low',
    assignee: 'Eve Davis',
  },
];

export const getMockTasks = (): Task[] => tasks.map((task) => ({ ...task }));

export const updateMockTaskStatus = (
  id: string,
  status: TaskStatus,
): Task => {
  const task = tasks.find((entry) => entry.id === id);
  if (!task) {
    throw new Error(`Task with id ${id} not found`);
  }
  task.status = status;
  return { ...task };
};
