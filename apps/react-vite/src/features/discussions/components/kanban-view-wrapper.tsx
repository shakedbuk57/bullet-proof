import React from 'react';
import { KanbanView, KanbanViewProps } from './kanban-view';

// Mock Authorization context provider
const AuthorizationMockProvider = ({ children }: { children: React.ReactNode }) => {
  // Return children without Authorization checks
  return <>{children}</>;
};

export const KanbanViewWrapper = (props: KanbanViewProps) => {
  return (
    <AuthorizationMockProvider>
      <KanbanView {...props} />
    </AuthorizationMockProvider>
  );
};
