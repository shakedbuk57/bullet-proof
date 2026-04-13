import React from 'react';
import { BrowserRouter as Router } from 'react-router';
import { HelmetProvider } from 'react-helmet-async';
import '../src/index.css';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
};

export const decorators = [
  (Story) => (
    <div className="dark" style={{ minHeight: '100vh', backgroundColor: 'hsl(222.2, 84%, 4.9%)', color: 'hsl(210, 40%, 98%)' }}>
      <HelmetProvider>
        <Router>
          <Story />
        </Router>
      </HelmetProvider>
    </div>
  ),
];
