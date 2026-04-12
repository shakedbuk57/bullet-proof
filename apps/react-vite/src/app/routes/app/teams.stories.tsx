import type { Meta, StoryObj } from '@storybook/react-vite';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HttpResponse, http } from 'msw';

import { createTeam } from '@/testing/data-generators';
import { env } from '@/config/env';

import TeamsRoute from './teams';

const meta: Meta<typeof TeamsRoute> = {
  title: 'Routes/Teams',
  component: TeamsRoute,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => {
      const queryClient = new QueryClient({
        defaultOptions: {
          queries: {
            retry: false,
          },
        },
      });

      return (
        <QueryClientProvider client={queryClient}>
          <Story />
        </QueryClientProvider>
      );
    },
  ],
};

export default meta;
type Story = StoryObj<typeof TeamsRoute>;

// Generate mock teams data
const generateMockTeams = (count: number = 5) => {
  const teams = [];
  for (let i = 0; i < count; i++) {
    teams.push(createTeam());
  }
  return teams;
};

export const Default: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get(`${env.API_URL}/teams`, () => {
          const teams = generateMockTeams(5);
          return HttpResponse.json({
            data: teams,
            meta: {
              page: 1,
              total: 15,
              totalPages: 3,
            },
          });
        }),
      ],
    },
  },
};

export const WithMultiplePages: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get(`${env.API_URL}/teams`, ({ request }) => {
          const url = new URL(request.url);
          const page = Number(url.searchParams.get('page') || 1);
          const teams = generateMockTeams(5);

          return HttpResponse.json({
            data: teams,
            meta: {
              page,
              total: 25,
              totalPages: 5,
            },
          });
        }),
      ],
    },
  },
};

export const Empty: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get(`${env.API_URL}/teams`, () => {
          return HttpResponse.json({
            data: [],
            meta: {
              page: 1,
              total: 0,
              totalPages: 0,
            },
          });
        }),
      ],
    },
  },
};
