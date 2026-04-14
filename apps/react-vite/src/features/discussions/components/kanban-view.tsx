import { useQueryClient } from '@tanstack/react-query';

import { Spinner } from '@/components/ui/spinner';
import { Discussion } from '@/types/api';
import { cn } from '@/utils/cn';

import { getDiscussionQueryOptions } from '../api/get-discussion';
import { KanbanCard } from './kanban-card';

export type KanbanViewProps = {
  discussions: Discussion[] | undefined;
  isLoading?: boolean;
  onDiscussionPrefetch?: (id: string) => void;
};

// Define kanban columns - using simple categorization based on discussion properties
// In a real app, you might have a status field on discussions
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

export const KanbanView = ({
  discussions,
  isLoading,
  onDiscussionPrefetch,
}: KanbanViewProps) => {
  const queryClient = useQueryClient();

  if (isLoading) {
    return (
      <div className="flex h-96 w-full items-center justify-center">
        <Spinner size="lg" />
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
                  <KanbanCard
                    key={discussion.id}
                    discussion={discussion}
                    onDiscussionPrefetch={(id) => {
                      queryClient.prefetchQuery(
                        getDiscussionQueryOptions(id),
                      );
                      onDiscussionPrefetch?.(id);
                    }}
                  />
                ))
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
