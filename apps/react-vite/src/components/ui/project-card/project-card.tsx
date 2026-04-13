import { Heart, Check, Clock, Zap } from 'lucide-react';
import * as React from 'react';

import { Button } from '../button';
import { cn } from '@/utils/cn';

export type ProjectStatus = 'completed' | 'pending' | 'in-progress' | 'feedback';

export type ProjectCardProps = {
  id: string;
  name: string;
  status: ProjectStatus;
  isLiked?: boolean;
  onLike?: (id: string, isLiked: boolean) => void;
  timeIndicator?: string;
  className?: string;
};

const statusIcons: Record<ProjectStatus, React.ReactNode> = {
  completed: <Check className="size-5 text-green-500" aria-hidden="true" />,
  pending: <Clock className="size-5 text-yellow-500" aria-hidden="true" />,
  'in-progress': <Zap className="size-5 text-blue-500" aria-hidden="true" />,
  feedback: <Clock className="size-5 text-orange-500" aria-hidden="true" />,
};

export const ProjectCard = React.forwardRef<
  HTMLDivElement,
  ProjectCardProps
>(
  (
    {
      id,
      name,
      status,
      isLiked = false,
      onLike,
      timeIndicator,
      className,
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          'flex items-center justify-between rounded-lg border border-border bg-card p-4 shadow-sm transition-colors hover:bg-accent',
          className,
        )}
      >
        <div className="flex flex-1 items-center gap-4">
          <div className="flex-shrink-0">
            {statusIcons[status]}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">
              {name}
            </p>
            {timeIndicator && (
              <p className="text-xs text-muted-foreground mt-1">
                {timeIndicator}
              </p>
            )}
          </div>
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => onLike?.(id, !isLiked)}
          aria-label={isLiked ? 'Unlike project' : 'Like project'}
          className="flex-shrink-0 ml-4"
        >
          <Heart
            className={cn(
              'size-5 transition-colors',
              isLiked
                ? 'fill-red-500 text-red-500'
                : 'text-muted-foreground hover:text-red-500',
            )}
            aria-hidden="true"
          />
        </Button>
      </div>
    );
  },
);

ProjectCard.displayName = 'ProjectCard';
