import { LucideIcon, Plus, Search } from 'lucide-react';
import * as React from 'react';

import { cn } from '@/utils/cn';

export type ProjectListHeaderProps = {
  title: string;
  onSearch?: () => void;
  onCreate?: () => void;
  className?: string;
};

export const ProjectListHeader = React.forwardRef<
  HTMLDivElement,
  ProjectListHeaderProps
>(({ title, onSearch, onCreate, className }, ref) => (
  <div
    ref={ref}
    className={cn(
      'flex items-center justify-between gap-4 mb-6',
      className,
    )}
  >
    <h3 className="text-xl font-semibold text-gray-300">{title}</h3>
    <div className="flex items-center gap-3">
      {onSearch && (
        <button
          onClick={onSearch}
          className="rounded-full p-2.5 text-gray-400 hover:text-gray-300 bg-gray-700/40 hover:bg-gray-700/60 transition-colors"
          title="Search"
          type="button"
        >
          <Search size={20} />
        </button>
      )}
      {onCreate && (
        <button
          onClick={onCreate}
          className="rounded-full p-2.5 text-gray-400 hover:text-gray-300 bg-gray-700/40 hover:bg-gray-700/60 transition-colors"
          title="Create"
          type="button"
        >
          <Plus size={20} />
        </button>
      )}
    </div>
  </div>
));

ProjectListHeader.displayName = 'ProjectListHeader';
