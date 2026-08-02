import type { Meta, StoryObj } from '@storybook/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HelmetProvider } from 'react-helmet-async';

import { queryConfig } from '@/lib/react-query';

import BoardRoute from './board';

const queryClient = new QueryClient({
  defaultOptions: queryConfig,
});

const meta: Meta<typeof BoardRoute> = {
  title: 'Routes/Board',
  component: BoardRoute,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <Story />
        </QueryClientProvider>
      </HelmetProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof BoardRoute>;

export const Default: Story = {};
