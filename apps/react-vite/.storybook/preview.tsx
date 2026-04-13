import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router';
import { HelmetProvider } from 'react-helmet-async';
import '../src/index.css';

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
      <HelmetProvider>
        <Router>
          <div className="min-h-screen bg-background text-foreground">
            <Story />
          </div>
        </Router>
      </HelmetProvider>
    );
  },
];
