import type { Meta, StoryObj } from '@storybook/react-vite';
import { HttpResponse, http } from 'msw';

import { createTeam } from '@/testing/data-generators';
import TeamsRoute from './teams';

const meta: Meta<typeof TeamsRoute> = {
  title: 'Routes/Teams',
  component: TeamsRoute,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof TeamsRoute>;

// Helper to generate paginated teams data
const generateTeamsData = (page: number, totalTeams: number, pageSize: number = 5) => {
  const totalPages = Math.ceil(totalTeams / pageSize);
  const teams = Array.from({ length: totalTeams }, (_, i) =>
    createTeam({ id: `team-${i + 1}` }),
  );
  const startIdx = (page - 1) * pageSize;
  const endIdx = startIdx + pageSize;
  
  return {
    data: teams.slice(startIdx, endIdx),
    meta: {
      page,
      total: totalTeams,
      totalPages,
    },
  };
};

export const Default: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get('https://api.bulletproofapp.com/teams', ({ request }) => {
          const url = new URL(request.url);
          const page = Number(url.searchParams.get('page') || 1);
          return HttpResponse.json(generateTeamsData(page, 5, 5));
        }),
      ],
    },
  },
};

export const WithMultiplePages: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get('https://api.bulletproofapp.com/teams', ({ request }) => {
          const url = new URL(request.url);
          const page = Number(url.searchParams.get('page') || 1);
          return HttpResponse.json(generateTeamsData(page, 25, 5));
        }),
      ],
    },
  },
};

export const Empty: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get('https://api.bulletproofapp.com/teams', () => {
          return HttpResponse.json({ data: [], meta: { page: 1, total: 0, totalPages: 0 } });
        }),
      ],
    },
  },
};
