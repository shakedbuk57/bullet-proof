import type { Preview } from '@storybook/react-vite';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter as Router } from 'react-router';
import { initialize, mswLoader } from 'msw-storybook-addon';
import { HelmetProvider } from 'react-helmet-async';
import React from 'react';

import '../src/index.css';
import { Notifications } from '../src/components/ui/notifications';
import { AuthLoader } from '../src/lib/auth';
import { queryConfig } from '../src/lib/react-query';

initialize({
  onUnhandledRequest: 'bypass',
});

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => {
      const [queryClient] = React.useState(
        () =>
          new QueryClient({
            defaultOptions: queryConfig,
          }),
      );

      return (
        <Router>
          <HelmetProvider>
            <QueryClientProvider client={queryClient}>
              <Notifications />
              <AuthLoader
                renderLoading={() => (
                  <div className="flex h-screen w-screen items-center justify-center">
                    Loading...
                  </div>
                )}
              >
                <Story />
              </AuthLoader>
            </QueryClientProvider>
          </HelmetProvider>
        </Router>
      );
    },
  ],
  loaders: [mswLoader],
};

export default preview;
