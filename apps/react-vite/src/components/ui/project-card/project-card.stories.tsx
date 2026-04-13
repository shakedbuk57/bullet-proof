import type { Meta, StoryObj } from '@storybook/react';

import { ProjectCard } from './project-card';

const meta: Meta<typeof ProjectCard> = {
  component: ProjectCard,
};

export default meta;
type Story = StoryObj<typeof meta>;

const mockProject = {
  id: '1',
  name: 'Mobile App Design System',
  type: 'UI Design',
  editedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
  status: 'In Progress',
};

const mockProjectWithPreview = {
  ...mockProject,
  previewUrl:
    'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&h=300&fit=crop',
};

const mockProjectNoStatus = {
  id: '2',
  name: 'Icon Library',
  type: 'UI Kit',
  editedDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
};

export const Default: Story = {
  args: {
    project: mockProject,
  },
};

export const WithPreview: Story = {
  args: {
    project: mockProjectWithPreview,
  },
};

export const NoStatus: Story = {
  args: {
    project: mockProjectNoStatus,
  },
};

export const RecentlyEdited: Story = {
  args: {
    project: {
      ...mockProject,
      editedDate: new Date(),
    },
  },
};

export const Complete: Story = {
  args: {
    project: {
      ...mockProject,
      status: 'Complete',
    },
  },
};
