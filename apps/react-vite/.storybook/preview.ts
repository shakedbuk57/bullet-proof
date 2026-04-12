import React from 'react';
import { BrowserRouter as Router } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { initialize, mswLoader } from 'msw-storybook-addon';
import type { Preview } from '@storybook/react-vite';

import '../src/index.css';

initialize();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      gcTime: 0,
    },
  },
});

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story: React.ComponentType) => (
      React.createElement(
        QueryClientProvider,
        { client: queryClient },
        React.createElement(
          Router,
          {},
          React.createElement(Story)
        )
      )
    ),
  ],
  loaders: [mswLoader],
};

export default preview;