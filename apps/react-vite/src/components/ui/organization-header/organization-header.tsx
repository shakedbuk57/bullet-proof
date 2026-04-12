import * as React from 'react';

import { cn } from '@/utils/cn';

export type OrganizationHeaderProps = {
  name: string;
  className?: string;
};

export const OrganizationHeader = React.forwardRef<
  HTMLDivElement,
  OrganizationHeaderProps
>(({ name, className }, ref) => (
  <div
    ref={ref}
    className={cn(
      'text-2xl font-semibold text-gray-400 sm:text-3xl md:text-4xl',
      className,
    )}
  >
    {name}
  </div>
));

OrganizationHeader.displayName = 'OrganizationHeader';
