import type { Meta, StoryObj } from '@storybook/react-vite';
import { HelmetProvider } from 'react-helmet-async';
import { ProjectsList } from './projects-list';
import { type Project } from '@/components/ui/project-card';

const meta: Meta<typeof ProjectsList> = {
  title: 'Features/Projects/ProjectsList',
  component: ProjectsList,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <HelmetProvider>
        <Story />
      </HelmetProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ProjectsList>;

// Sample projects data
const sampleProjects: Project[] = [
  {
    id: '1',
    name: 'Mobile App Design',
    previewUrl: undefined,
    type: 'UI Design',
    editedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    status: 'In Progress',
  },
  {
    id: '2',
    name: 'Website Redesign',
    previewUrl: undefined,
    type: 'Web Design',
    editedDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    status: 'Review',
  },
  {
    id: '3',
    name: 'Dashboard Components',
    previewUrl: undefined,
    type: 'UI Kit',
    editedDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    status: 'Complete',
  },
  {
    id: '4',
    name: 'Brand Guidelines',
    previewUrl: undefined,
    type: 'Branding',
    editedDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    status: 'Complete',
  },
  {
    id: '5',
    name: 'E-commerce Platform',
    previewUrl: undefined,
    type: 'Web Design',
    editedDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    status: 'In Progress',
  },
  {
    id: '6',
    name: 'Icon System',
    previewUrl: undefined,
    type: 'UI Kit',
    editedDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    status: 'Review',
  },
];

export const Default: Story = {
  args: {
    projects: sampleProjects,
  },
};

export const WithMoreProjects: Story = {
  args: {
    projects: [
      ...sampleProjects,
      {
        id: '7',
        name: 'Analytics Dashboard',
        previewUrl: undefined,
        type: 'Web Design',
        editedDate: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
        status: 'In Progress',
      },
      {
        id: '8',
        name: 'Mobile App UI',
        previewUrl: undefined,
        type: 'UI Design',
        editedDate: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
        status: 'Review',
      },
      {
        id: '9',
        name: 'Wireframe Kit',
        previewUrl: undefined,
        type: 'UI Kit',
        editedDate: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
        status: 'Complete',
      },
      {
        id: '10',
        name: 'Design System v2',
        previewUrl: undefined,
        type: 'Design System',
        editedDate: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000),
        status: 'In Progress',
      },
    ],
  },
};

export const Empty: Story = {
  args: {
    projects: [],
  },
};
