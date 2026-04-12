import type { Meta, StoryObj } from '@storybook/react-vite';
import { HttpResponse, http } from 'msw';
import Cookies from 'js-cookie';

import { env } from '@/config/env';
import { createUser, createDiscussion } from '@/testing/data-generators';
import { encode } from '@/testing/mocks/utils';
import { AUTH_COOKIE } from '@/testing/mocks/utils';
import { DiscussionsKanban } from './discussions-kanban';

const meta: Meta<typeof DiscussionsKanban> = {
  title: 'Features/Discussions/DiscussionsKanban',
  component: DiscussionsKanban,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof DiscussionsKanban>;

// Create mock users
const author1 = createUser({
  id: 'user-1',
  firstName: 'John',
  lastName: 'Doe',
  email: 'john@example.com',
  role: 'ADMIN',
  teamId: 'team-1',
});

const author2 = createUser({
  id: 'user-2',
  firstName: 'Jane',
  lastName: 'Smith',
  email: 'jane@example.com',
  role: 'USER',
  teamId: 'team-1',
});

const author3 = createUser({
  id: 'user-3',
  firstName: 'Bob',
  lastName: 'Johnson',
  email: 'bob@example.com',
  role: 'USER',
  teamId: 'team-1',
});

// Create mock discussions with different statuses
const mockDiscussions = [
  // Backlog discussions
  createDiscussion({
    id: 'disc-1',
    title: 'Implement user authentication',
    body: 'We need to add a robust authentication system for the application.',
    status: 'Backlog',
    author: author1,
    teamId: 'team-1',
    createdAt: Date.now() - 7 * 24 * 60 * 60 * 1000, // 7 days ago
  }),
  createDiscussion({
    id: 'disc-2',
    title: 'Design new dashboard layout',
    body: 'Create a new layout for the main dashboard with better UX.',
    status: 'Backlog',
    author: author2,
    teamId: 'team-1',
    createdAt: Date.now() - 5 * 24 * 60 * 60 * 1000, // 5 days ago
  }),
  createDiscussion({
    id: 'disc-3',
    title: 'Add dark mode support',
    body: 'Implement dark mode theme across the application.',
    status: 'Backlog',
    author: author3,
    teamId: 'team-1',
    createdAt: Date.now() - 3 * 24 * 60 * 60 * 1000, // 3 days ago
  }),

  // In Progress discussions
  createDiscussion({
    id: 'disc-4',
    title: 'Refactor API client',
    body: 'Improve the API client with better error handling and request caching.',
    status: 'In Progress',
    author: author1,
    teamId: 'team-1',
    createdAt: Date.now() - 2 * 24 * 60 * 60 * 1000, // 2 days ago
  }),
  createDiscussion({
    id: 'disc-5',
    title: 'Optimize database queries',
    body: 'Review and optimize slow database queries to improve performance.',
    status: 'In Progress',
    author: author2,
    teamId: 'team-1',
    createdAt: Date.now() - 1 * 24 * 60 * 60 * 1000, // 1 day ago
  }),

  // Done discussions
  createDiscussion({
    id: 'disc-6',
    title: 'Setup CI/CD pipeline',
    body: 'Configure GitHub Actions for automated testing and deployment.',
    status: 'Done',
    author: author1,
    teamId: 'team-1',
    createdAt: Date.now() - 10 * 24 * 60 * 60 * 1000, // 10 days ago
  }),
  createDiscussion({
    id: 'disc-7',
    title: 'Create project documentation',
    body: 'Write comprehensive documentation for the project structure and setup.',
    status: 'Done',
    author: author3,
    teamId: 'team-1',
    createdAt: Date.now() - 8 * 24 * 60 * 60 * 1000, // 8 days ago
  }),
];

const createAuthHandlers = (user: ReturnType<typeof createUser>) => {
  const encodedToken = encode(user);
  Cookies.set(AUTH_COOKIE, encodedToken, { path: '/' });

  return [
    http.get(`${env.API_URL}/auth/me`, () => {
      return HttpResponse.json(
        { data: user },
        {
          headers: {
            'Set-Cookie': `${AUTH_COOKIE}=${encodedToken}; Path=/;`,
          },
        },
      );
    }),
  ];
};

const createDiscussionsHandlers = (discussions: typeof mockDiscussions) => [
  http.get(`${env.API_URL}/discussions`, () => {
    return HttpResponse.json({
      data: discussions,
      meta: {
        page: 1,
        total: discussions.length,
        totalPages: 1,
      },
    });
  }),
  http.patch(`${env.API_URL}/discussions/:discussionId`, async ({ request }) => {
    const data = (await request.json()) as any;
    const updatedDiscussion = mockDiscussions.find(
      (d) => d.id === (request.url.match(/discussions\/(.*)/)?.[1]),
    );
    if (updatedDiscussion) {
      updatedDiscussion.status = data.status;
    }
    return HttpResponse.json(updatedDiscussion);
  }),
];

export const Default: Story = {
  parameters: {
    msw: {
      handlers: [
        ...createAuthHandlers(author1),
        ...createDiscussionsHandlers(mockDiscussions),
      ],
    },
  },
};

// Story with empty columns
export const EmptyColumns: Story = {
  parameters: {
    msw: {
      handlers: [
        ...createAuthHandlers(author1),
        ...createDiscussionsHandlers([]),
      ],
    },
  },
};

// Story with only backlog items
export const OnlyBacklog: Story = {
  parameters: {
    msw: {
      handlers: [
        ...createAuthHandlers(author1),
        ...createDiscussionsHandlers(
          mockDiscussions.filter((d) => d.status === 'Backlog'),
        ),
      ],
    },
  },
};

// Story with only in-progress items
export const OnlyInProgress: Story = {
  parameters: {
    msw: {
      handlers: [
        ...createAuthHandlers(author1),
        ...createDiscussionsHandlers(
          mockDiscussions.filter((d) => d.status === 'In Progress'),
        ),
      ],
    },
  },
};

// Story with only completed items
export const OnlyDone: Story = {
  parameters: {
    msw: {
      handlers: [
        ...createAuthHandlers(author1),
        ...createDiscussionsHandlers(
          mockDiscussions.filter((d) => d.status === 'Done'),
        ),
      ],
    },
  },
};
