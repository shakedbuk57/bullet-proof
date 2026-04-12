import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { initialize } from 'msw-storybook-addon';
import { handlers } from '@/testing/mocks/handlers';
import '../src/index.css';

initialize({ handlers });

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
  (Story: React.ComponentType) => {
    useEffect(() => {
      document.documentElement.classList.add('dark');
      return () => {
        document.documentElement.classList.remove('dark');
      };
    }, []);

    return (
      <div className="min-h-screen bg-background text-foreground">
        <Router>
          <QueryClientProvider client={queryClient}>
            <Story />
          </QueryClientProvider>
        </Router>
      </div>
    );
  },
];
