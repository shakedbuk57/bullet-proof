import { Link } from 'react-router';

import { cn } from '@/utils/cn';
import { formatDate } from '@/utils/format';
import { Discussion } from '@/types/api';
import { paths } from '@/config/paths';

import { DeleteDiscussion } from './delete-discussion';

export type KanbanCardProps = {
  discussion: Discussion;
  onDiscussionPrefetch?: (id: string) => void;
};

export const KanbanCard = ({
  discussion,
  onDiscussionPrefetch,
}: KanbanCardProps) => {
  return (
    <div
      className={cn(
        'rounded-lg border border-border bg-card p-4 shadow-sm',
        'transition-all duration-200 hover:shadow-md hover:border-primary/50',
      )}
    >
      <div className="space-y-3">
        {/* Title */}
        <div>
          <Link
            onMouseEnter={() => {
              onDiscussionPrefetch?.(discussion.id);
            }}
            to={paths.app.discussion.getHref(discussion.id)}
            className="group block text-sm font-semibold text-foreground hover:text-primary"
          >
            <span className="line-clamp-2">{discussion.title}</span>
          </Link>
        </div>

        {/* Description */}
        {discussion.body && (
          <p className="line-clamp-3 text-xs text-muted-foreground">
            {discussion.body}
          </p>
        )}

        {/* Metadata */}
        <div className="flex items-center justify-between pt-2">
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">
              By {discussion.author.firstName} {discussion.author.lastName}
            </p>
            <p className="text-xs text-muted-foreground">
              {formatDate(discussion.createdAt)}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 border-t border-border pt-3">
          <Link
            to={paths.app.discussion.getHref(discussion.id)}
            className="flex-1 text-center rounded px-2 py-1 text-xs font-medium text-primary hover:bg-primary/10 transition-colors"
          >
            View
          </Link>
          <DeleteDiscussion id={discussion.id} />
        </div>
      </div>
    </div>
  );
};
