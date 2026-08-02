import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Task, TaskStatus } from '@/types/api';

import { getMockTasks } from '../api/mock-tasks';

import { KanbanBoard } from './kanban-board';

const meta: Meta<typeof KanbanBoard> = {
  title: 'Features/Board/KanbanBoard',
  component: KanbanBoard,
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof KanbanBoard>;

const KanbanBoardWithState = ({ initialTasks }: { initialTasks: Task[] }) => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const handleTaskMove = (taskId: string, status: TaskStatus) => {
    setTasks((current) =>
      current.map((task) => (task.id === taskId ? { ...task, status } : task)),
    );
  };

  return <KanbanBoard tasks={tasks} onTaskMove={handleTaskMove} />;
};

export const Default: Story = {
  render: () => <KanbanBoardWithState initialTasks={getMockTasks()} />,
};

export const EmptyColumns: Story = {
  render: () => (
    <KanbanBoardWithState
      initialTasks={getMockTasks().filter((task) =>
        ['todo', 'done'].includes(task.status),
      )}
    />
  ),
};
