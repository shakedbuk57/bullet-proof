import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { initialize, mswLoader } from 'msw-storybook-addon';
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

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
};

export const decorators = [
  (Story) => {
    useEffect(() => {
      // Apply dark class to document root for CSS variables
      document.documentElement.classList.add('dark');
      return () => {
        document.documentElement.classList.remove('dark');
      };
    }, []);

    return (
      <div className="dark min-h-screen bg-background text-foreground">
        <QueryClientProvider client={queryClient}>
          <Router>
            <Story />
          </Router>
        </QueryClientProvider>
      </div>
    );
  },
];

export const loaders = [mswLoader];
