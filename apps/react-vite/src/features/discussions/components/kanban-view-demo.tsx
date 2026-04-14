import { Discussion } from '@/types/api';
import { cn } from '@/utils/cn';
import { formatDate } from '@/utils/format';

const KANBAN_COLUMNS = [
  { id: 'recent', title: 'Recent', color: 'bg-blue-50' },
  { id: 'popular', title: 'Popular', color: 'bg-purple-50' },
  { id: 'archived', title: 'All', color: 'bg-gray-50' },
];

const categorizeDiscussions = (discussions: Discussion[]) => {
  const now = Date.now();
  const weekInMs = 7 * 24 * 60 * 60 * 1000;

  const recent: Discussion[] = [];
  const popular: Discussion[] = [];
  const archived: Discussion[] = [];

  discussions.forEach((discussion) => {
    const age = now - discussion.createdAt;

    // Recent: created in last 7 days
    if (age < weekInMs) {
      recent.push(discussion);
    } else if (discussion.title.length > 50) {
      // Popular: longer discussions (more detailed)
      popular.push(discussion);
    } else {
      // All others go to archived
      archived.push(discussion);
    }
  });

  return { recent, popular, archived };
};

type KanbanViewDemoProps = {
  discussions: Discussion[] | undefined;
  isLoading?: boolean;
};

export const KanbanViewDemo = ({
  discussions,
  isLoading,
}: KanbanViewDemoProps) => {
  if (isLoading) {
    return (
      <div className="flex h-96 w-full items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="mt-2 text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!discussions || discussions.length === 0) {
    return (
      <div className="flex h-96 w-full items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted/20">
        <div className="text-center">
          <p className="text-sm font-medium text-muted-foreground">
            No discussions yet
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Create your first discussion to get started
          </p>
        </div>
      </div>
    );
  }

  const categorized = categorizeDiscussions(discussions);

  return (
    <div className="flex gap-6 overflow-x-auto pb-4">
      {KANBAN_COLUMNS.map((column) => {
        const columnDiscussions = categorized[
          column.id as keyof typeof categorized
        ] as Discussion[];

        return (
          <div
            key={column.id}
            className="flex min-w-[320px] flex-col rounded-lg border border-border p-4"
          >
            {/* Column Header */}
            <div className="mb-4">
              <h3 className="font-semibold text-foreground">{column.title}</h3>
              <p className="mt-1 text-xs text-muted-foreground">
                {columnDiscussions.length}{' '}
                {columnDiscussions.length === 1 ? 'item' : 'items'}
              </p>
            </div>

            {/* Column Content */}
            <div className="flex-1 space-y-3">
              {columnDiscussions.length === 0 ? (
                <div className="flex h-40 items-center justify-center rounded bg-muted/30 text-center">
                  <p className="text-xs text-muted-foreground">
                    No discussions
                  </p>
                </div>
              ) : (
                columnDiscussions.map((discussion) => (
                  <div
                    key={discussion.id}
                    className={cn(
                      'rounded-lg border border-border bg-card p-4 shadow-sm',
                      'transition-all duration-200 hover:shadow-md hover:border-primary/50',
                    )}
                  >
                    <div className="space-y-3">
                      {/* Title */}
                      <div>
                        <span className="block text-sm font-semibold text-foreground line-clamp-2">
                          {discussion.title}
                        </span>
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
                            By {discussion.author.firstName}{' '}
                            {discussion.author.lastName}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {formatDate(discussion.createdAt)}
                          </p>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2 border-t border-border pt-3">
                        <button className="flex-1 text-center rounded px-2 py-1 text-xs font-medium text-primary hover:bg-primary/10 transition-colors">
                          View
                        </button>
                        <button className="rounded px-2 py-1 text-xs font-medium text-destructive hover:bg-destructive/10 transition-colors">
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
