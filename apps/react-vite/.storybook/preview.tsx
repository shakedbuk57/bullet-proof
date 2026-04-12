import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router';
import { initialize, mswLoader } from 'msw-storybook-addon';
import '../src/index.css';

initialize();

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
      <div className="min-h-screen bg-background text-foreground">
        <Router>
          <Story />
        </Router>
      </div>
    );
  },
];

export const loaders = [mswLoader];
