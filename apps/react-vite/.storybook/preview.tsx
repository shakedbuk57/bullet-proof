import React from 'react';
import { BrowserRouter as Router } from 'react-router';
import { HelmetProvider } from 'react-helmet-async';
import '../src/index.css';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
};

export const decorators = [
  (Story) => (
    <HelmetProvider>
      <Router>
        <Story />
      </Router>
    </HelmetProvider>
  ),
];
