import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '../src/index.css';

const queryClient = new QueryClient();

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
};

export const decorators = [
  (Story) => {
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
