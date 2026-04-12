import type { Meta, StoryObj } from '@storybook/react-vite';
import { http, HttpResponse } from 'msw';

import { OrganizationSettings } from './organization-settings';
import { Project } from '../types';

const mockProjects: Project[] = [
  {
    id: '1',
    name: 'Setup Authentication',
    description: 'Implement JWT-based authentication',
    organizationId: 'org-1',
    completed: true,
    createdAt: new Date('2024-01-15').toISOString(),
  },
  {
    id: '2',
    name: 'Database Schema Design',
    description: 'Design and setup PostgreSQL schema',
    organizationId: 'org-1',
    completed: true,
    createdAt: new Date('2024-01-20').toISOString(),
  },
  {
    id: '3',
    name: 'API Endpoint Development',
    description: 'Create REST API endpoints',
    organizationId: 'org-1',
    completed: false,
    createdAt: new Date('2024-02-01').toISOString(),
  },
  {
    id: '4',
    name: 'Frontend Integration',
    description: 'Integrate React components with API',
    organizationId: 'org-1',
    completed: false,
    createdAt: new Date('2024-02-10').toISOString(),
  },
  {
    id: '5',
    name: 'Testing & QA',
    description: 'Write unit and integration tests',
    organizationId: 'org-1',
    completed: false,
    createdAt: new Date('2024-02-15').toISOString(),
  },
];

const meta: Meta<typeof OrganizationSettings> = {
  title: 'Features/Organization/OrganizationSettings',
  component: OrganizationSettings,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof OrganizationSettings>;

export const Default: Story = {
  args: {
    organizationId: 'org-1',
    organizationName: 'Acme Corporation',
  },
  parameters: {
    msw: {
      handlers: [
        http.get('https://api.bulletproofapp.com/organizations/:organizationId/projects', () => {
          return HttpResponse.json({
            data: mockProjects,
          });
        }),
      ],
    },
  },
};

export const WithMultiplePages: Story = {
  args: {
    organizationId: 'org-1',
    organizationName: 'Tech Innovations Inc',
  },
  parameters: {
    msw: {
      handlers: [
        http.get('https://api.bulletproofapp.com/organizations/:organizationId/projects', ({ request }) => {
          const url = new URL(request.url);
          const page = parseInt(url.searchParams.get('page') || '1', 10);
          const itemsPerPage = 3;
          const startIndex = (page - 1) * itemsPerPage;
          const endIndex = startIndex + itemsPerPage;
          const paginatedProjects = mockProjects.slice(startIndex, endIndex);
          
          return HttpResponse.json({
            data: paginatedProjects,
            meta: {
              page,
              total: mockProjects.length,
              totalPages: Math.ceil(mockProjects.length / itemsPerPage),
            },
          });
        }),
      ],
    },
  },
};

export const EmptyProjects: Story = {
  args: {
    organizationId: 'org-2',
    organizationName: 'Startup Company',
  },
  parameters: {
    msw: {
      handlers: [
        http.get('https://api.bulletproofapp.com/organizations/:organizationId/projects', () => {
          return HttpResponse.json({
            data: [],
          });
        }),
      ],
    },
  },
};

export const Loading: Story = {
  args: {
    organizationId: 'org-1',
    organizationName: 'Enterprise Solutions',
  },
  parameters: {
    msw: {
      handlers: [
        http.get('https://api.bulletproofapp.com/organizations/:organizationId/projects', async () => {
          // Simulate a slow network request
          await new Promise((resolve) => setTimeout(resolve, 3000));
          return HttpResponse.json({
            data: mockProjects,
          });
        }),
      ],
    },
  },
};
