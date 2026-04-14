import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HelmetProvider } from 'react-helmet-async';
import { ErrorBoundary } from 'react-error-boundary';
import Cookies from 'js-cookie';
import { MainErrorFallback } from '../src/components/errors/main';
import '../src/index.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      staleTime: 1000 * 60,
    },
  },
});

// Initialize MSW for Storybook
const initializeMSW = async () => {
  // Only run in browser environment
  if (typeof window === 'undefined') {
    return;
  }

  try {
    // Import and start the MSW worker
    const { worker } = await import('../src/testing/mocks/browser');
    const { db } = await import('../src/testing/mocks/db');
    const { encode, hash } = await import('../src/testing/mocks/utils');

    // Start the worker
    await worker.start({
      serviceWorkerUrl: '/mockServiceWorker.js',
      onUnhandledRequest: 'bypass',
    });

    // Initialize the database with a test user
    const testUser = db.user.create({
      id: 'storybook-user',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      password: hash('password123'),
      role: 'ADMIN',
      teamId: 'team-1',
      bio: 'Test user for Storybook',
      createdAt: Date.now(),
    });

    // Create auth token and set it as cookie
    const sanitizedUser = {
      id: testUser.id,
      firstName: testUser.firstName,
      lastName: testUser.lastName,
      email: testUser.email,
      role: testUser.role,
      teamId: testUser.teamId,
      bio: testUser.bio,
      createdAt: testUser.createdAt,
    };
    const encodedToken = encode(sanitizedUser);
    Cookies.set('bulletproof_react_app_token', encodedToken, { path: '/' });
  } catch (error) {
    console.warn('MSW initialization for Storybook failed:', error);
  }
};

// Ensure MSW is initialized
let mswInitialized = false;
if (!mswInitialized && typeof window !== 'undefined') {
  mswInitialized = true;
  initializeMSW().catch(console.error);
}

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
};

// Auth-aware wrapper that manages loading state
const AuthContextWrapper = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Wait for auth to complete (auth initialization happens in MSW setup)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="flex h-96 w-full items-center justify-center">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  return <>{children}</>;
};

export const decorators = [
  (Story) => (
    <Router>
      <QueryClientProvider client={queryClient}>
        <HelmetProvider>
          <ErrorBoundary FallbackComponent={MainErrorFallback}>
            <AuthContextWrapper>
              <Story />
            </AuthContextWrapper>
          </ErrorBoundary>
        </HelmetProvider>
      </QueryClientProvider>
    </Router>
  ),
];
