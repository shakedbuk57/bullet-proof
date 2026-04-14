import { Meta, StoryObj } from '@storybook/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthLoader } from '@/lib/auth';

import { KanbanView } from './kanban-view';

const mockDiscussions = [
  // Recent discussions (created within last 7 days)
  {
    id: '1',
    title: 'Getting started with React Hooks',
    body: 'I was wondering about the best practices when using React Hooks in modern applications. Can anyone share their experience?',
    teamId: 'team-1',
    author: {
      id: 'user-1',
      firstName: 'Alice',
      lastName: 'Johnson',
      email: 'alice@example.com',
      role: 'ADMIN' as const,
      teamId: 'team-1',
      bio: 'React enthusiast',
      createdAt: 1000000,
    },
    createdAt: Date.now() - 2 * 24 * 60 * 60 * 1000, // 2 days ago
  },
  {
    id: '2',
    title: 'TypeScript configuration tips',
    body: 'Found some interesting TypeScript configs that might help the team. Let me know what you think!',
    teamId: 'team-1',
    author: {
      id: 'user-2',
      firstName: 'Bob',
      lastName: 'Smith',
      email: 'bob@example.com',
      role: 'USER' as const,
      teamId: 'team-1',
      bio: 'Full stack developer',
      createdAt: 1000001,
    },
    createdAt: Date.now() - 1 * 24 * 60 * 60 * 1000, // 1 day ago
  },
  {
    id: '3',
    title: 'New project architecture discussion',
    body: 'I think we should discuss our new architecture for the upcoming project. This is a detailed discussion about how we plan to structure our codebase, database schema, and API design.',
    teamId: 'team-1',
    author: {
      id: 'user-3',
      firstName: 'Carol',
      lastName: 'Davis',
      email: 'carol@example.com',
      role: 'USER' as const,
      teamId: 'team-1',
      bio: 'Senior architect',
      createdAt: 1000002,
    },
    createdAt: Date.now() - 3 * 24 * 60 * 60 * 1000, // 3 days ago (longer title = popular)
  },
  // Older discussions (goes to All)
  {
    id: '4',
    title: 'Database optimization',
    body: 'We should look at our database queries and see if we can optimize them further.',
    teamId: 'team-1',
    author: {
      id: 'user-4',
      firstName: 'David',
      lastName: 'Wilson',
      email: 'david@example.com',
      role: 'USER' as const,
      teamId: 'team-1',
      bio: 'DevOps engineer',
      createdAt: 1000003,
    },
    createdAt: Date.now() - 14 * 24 * 60 * 60 * 1000, // 14 days ago
  },
  {
    id: '5',
    title: 'Testing best practices we should implement company-wide for maintaining code quality and ensuring reliability across all projects and teams',
    body: 'Let\'s establish some testing standards.',
    teamId: 'team-1',
    author: {
      id: 'user-5',
      firstName: 'Eve',
      lastName: 'Martinez',
      email: 'eve@example.com',
      role: 'USER' as const,
      teamId: 'team-1',
      bio: 'QA Lead',
      createdAt: 1000004,
    },
    createdAt: Date.now() - 20 * 24 * 60 * 60 * 1000, // 20 days ago (longer title = popular)
  },
  {
    id: '6',
    title: 'Frontend performance',
    body: 'Any suggestions on improving load times?',
    teamId: 'team-1',
    author: {
      id: 'user-6',
      firstName: 'Frank',
      lastName: 'Brown',
      email: 'frank@example.com',
      role: 'USER' as const,
      teamId: 'team-1',
      bio: 'Frontend specialist',
      createdAt: 1000005,
    },
    createdAt: Date.now() - 30 * 24 * 60 * 60 * 1000, // 30 days ago
  },
  {
    id: '7',
    title: 'API design patterns that we should follow for consistency and maintainability of our REST endpoints and GraphQL schema',
    body: 'We need consistent patterns.',
    teamId: 'team-1',
    author: {
      id: 'user-1',
      firstName: 'Alice',
      lastName: 'Johnson',
      email: 'alice@example.com',
      role: 'ADMIN' as const,
      teamId: 'team-1',
      bio: 'React enthusiast',
      createdAt: 1000000,
    },
    createdAt: Date.now() - 60 * 24 * 60 * 60 * 1000, // 60 days ago (longer = popular)
  },
];

const meta: Meta<typeof KanbanView> = {
  title: 'Features/Discussions/KanbanView',
  component: KanbanView,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof KanbanView>;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

export const Default: Story = {
  args: {
    discussions: mockDiscussions,
    isLoading: false,
    onDiscussionPrefetch: (id) => console.log('Prefetch discussion:', id),
  },
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <AuthLoader renderLoading={() => <div>Loading...</div>}>
          <div className="min-h-screen w-full bg-background p-8">
            <div className="w-full overflow-hidden">
              <Story />
            </div>
          </div>
        </AuthLoader>
      </QueryClientProvider>
    ),
  ],
};

export const Loading: Story = {
  args: {
    discussions: undefined,
    isLoading: true,
  },
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <AuthLoader renderLoading={() => <div>Loading...</div>}>
          <div className="min-h-screen w-full bg-background p-8">
            <div className="w-full overflow-hidden">
              <Story />
            </div>
          </div>
        </AuthLoader>
      </QueryClientProvider>
    ),
  ],
};

export const Empty: Story = {
  args: {
    discussions: [],
    isLoading: false,
  },
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <AuthLoader renderLoading={() => <div>Loading...</div>}>
          <div className="min-h-screen w-full bg-background p-8">
            <div className="w-full overflow-hidden">
              <Story />
            </div>
          </div>
        </AuthLoader>
      </QueryClientProvider>
    ),
  ],
};

export const FewDiscussions: Story = {
  args: {
    discussions: mockDiscussions.slice(0, 2),
    isLoading: false,
  },
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <AuthLoader renderLoading={() => <div>Loading...</div>}>
          <div className="min-h-screen w-full bg-background p-8">
            <div className="w-full overflow-hidden">
              <Story />
            </div>
          </div>
        </AuthLoader>
      </QueryClientProvider>
    ),
  ],
};
