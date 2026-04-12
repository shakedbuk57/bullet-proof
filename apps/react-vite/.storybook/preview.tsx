import React from 'react';
import { BrowserRouter as Router } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { Preview } from '@storybook/react-vite';
import '../src/index.css';

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
    (Story: React.ComponentType) =>
      React.createElement(
        'div',
        { 
          className: 'dark',
          style: {
            background: 'hsl(222.2 84% 4.9%)',
            color: 'hsl(210 40% 98%)',
            minHeight: '100vh',
            padding: '20px',
          }
        },
        React.createElement(
          QueryClientProvider,
          { client: queryClient },
          React.createElement(
            Router,
            {},
            React.createElement(Story),
          ),
        ),
      ),
  ],
};

export default preview;
