import React from 'react';
import { BrowserRouter as Router } from 'react-router';
import { initialize, mswLoader } from 'msw-storybook-addon';
import '../src/index.css';

initialize();

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
};

export const decorators = [
  (Story) => (
    <Router>
      <Story />
    </Router>
  ),
];

export const loaders = [mswLoader];
