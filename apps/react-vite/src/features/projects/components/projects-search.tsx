import { Search } from 'lucide-react';
import * as React from 'react';

import { cn } from '@/utils/cn';

export type ProjectsSearchProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
};

export const ProjectsSearch = React.forwardRef<
  HTMLInputElement,
  ProjectsSearchProps
>(
  (
    {
      value,
      onChange,
      placeholder = 'Search projects...',
      className,
    },
    ref,
  ) => {
    return (
      <div
        className={cn(
          'relative flex items-center rounded-lg border border-input bg-background',
          className,
        )}
      >
        <Search className="absolute left-3 h-5 w-5 text-muted-foreground" />
        <input
          ref={ref}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="h-10 w-full bg-transparent py-2 pl-10 pr-3 text-sm outline-none placeholder:text-muted-foreground focus:outline-none"
        />
      </div>
    );
  },
);

ProjectsSearch.displayName = 'ProjectsSearch';
