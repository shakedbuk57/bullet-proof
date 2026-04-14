import type { Meta, StoryObj } from '@storybook/react-vite';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { queryConfig } from '@/lib/react-query';
import SettingsRoute from './settings';

const mockData = {
  data: [
    {
      id: '1',
      name: 'Create Issue',
      description: 'Create new issues in Linear projects',
      status: 'allowed' as const,
      category: 'issues',
    },
    {
      id: '2',
      name: 'Update Issue',
      description: 'Update existing issues in Linear projects',
      status: 'allowed' as const,
      category: 'issues',
    },
    {
      id: '3',
      name: 'Delete Issue',
      description: 'Delete issues from Linear projects',
      status: 'allowed' as const,
      category: 'issues',
    },
    {
      id: '4',
      name: 'Create Comment',
      description: 'Add comments to issues',
      status: 'allowed' as const,
      category: 'comments',
    },
    {
      id: '5',
      name: 'Update Comment',
      description: 'Edit existing comments on issues',
      status: 'allowed' as const,
      category: 'comments',
    },
    {
      id: '6',
      name: 'Delete Comment',
      description: 'Delete comments from issues',
      status: 'ask' as const,
      category: 'comments',
    },
    {
      id: '7',
      name: 'Manage Labels',
      description: 'Create and modify issue labels',
      status: 'allowed' as const,
      category: 'labels',
    },
    {
      id: '8',
      name: 'View Projects',
      description: 'View and list Linear projects',
      status: 'allowed' as const,
      category: 'projects',
    },
    {
      id: '9',
      name: 'Archive Issue',
      description: 'Archive issues in Linear projects',
      status: 'blocked' as const,
      category: 'issues',
    },
  ],
  enabledCount: 8,
  totalCount: 9,
};

const meta: Meta<typeof SettingsRoute> = {
  title: 'Routes/Settings',
  component: SettingsRoute,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => {
      const queryClient = new QueryClient({
        defaultOptions: queryConfig,
      });

      // Pre-populate the cache with mock data
      queryClient.setQueryData(['toolPermissions'], mockData);

      return (
        <QueryClientProvider client={queryClient}>
          <Story />
        </QueryClientProvider>
      );
    },
  ],
};

export default meta;
type Story = StoryObj<typeof SettingsRoute>;

export const Default: Story = {};
