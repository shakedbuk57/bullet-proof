import { LucideIcon } from 'lucide-react';
import * as React from 'react';

import { cn } from '@/utils/cn';

export type ProjectListItemProps = {
  title: string;
  icon?: LucideIcon;
  statusIcon?: LucideIcon;
  isNested?: boolean;
  hasCheckmark?: boolean;
  onClick?: () => void;
  className?: string;
  children?: React.ReactNode;
};

export const ProjectListItem = React.forwardRef<
  HTMLDivElement,
  ProjectListItemProps
>(
  (
    {
      title,
      icon,
      statusIcon: StatusIcon,
      isNested = false,
      hasCheckmark = false,
      onClick,
      className,
      children,
    },
    ref,
  ) => {
    const Icon = icon;

    return (
      <div
        ref={ref}
        className={cn(
          'flex items-center justify-between gap-3 rounded-md px-4 py-4 transition-colors hover:bg-gray-700/40 bg-gray-800/70',
          isNested && 'ml-10 bg-gray-900/60',
          className,
        )}
        onClick={onClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if ((e.key === 'Enter' || e.key === ' ') && onClick) {
            e.preventDefault();
            onClick();
          }
        }}
      >
        <div className="flex items-center gap-3 flex-1 min-w-0">
          {hasCheckmark && (
            <div className="text-green-500 flex-shrink-0 text-sm font-bold">✓</div>
          )}
          {Icon && (
            <Icon size={20} className="flex-shrink-0 text-gray-400" />
          )}
          <span className="truncate text-gray-200 text-base font-medium">
            {title}
          </span>
          {children}
        </div>

        {StatusIcon && (
          <div className="flex-shrink-0">
            <StatusIcon size={20} className={cn(
              title === 'Project 5' ? 'text-red-500' : 'text-green-500'
            )} />
          </div>
        )}
      </div>
    );
  },
);

ProjectListItem.displayName = 'ProjectListItem';
