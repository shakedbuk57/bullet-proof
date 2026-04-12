import * as React from 'react';

import { cn } from '@/utils/cn';

export type ProjectListProps = {
  className?: string;
  children?: React.ReactNode;
};

export const ProjectList = React.forwardRef<
  HTMLDivElement,
  ProjectListProps
>(({ className, children }, ref) => (
  <div
    ref={ref}
    className={cn(
      'space-y-2 rounded-lg bg-transparent',
      className,
    )}
  >
    {children}
  </div>
));

ProjectList.displayName = 'ProjectList';
