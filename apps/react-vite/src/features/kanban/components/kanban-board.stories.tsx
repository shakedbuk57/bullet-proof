import { Meta, StoryObj } from '@storybook/react';
import { KanbanBoard } from './kanban-board';

const meta: Meta<typeof KanbanBoard> = {
  title: 'Features/Kanban/KanbanBoard',
  component: KanbanBoard,
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'desktop',
    },
  },
  decorators: [
    (Story: any) => (
      <div style={{ width: '100%', minHeight: '100vh', padding: '2rem', backgroundColor: '#f9fafb' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type KanbanBoardStory = StoryObj<typeof KanbanBoard>;

export const Default: KanbanBoardStory = {
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
      width: 1400,
      height: 900,
    },
  },
};
