import { useState } from 'react';
import { QueryClient, useQueryClient } from '@tanstack/react-query';
import { LoaderFunctionArgs, useSearchParams } from 'react-router';
import { LayoutGrid, List } from 'lucide-react';

import { ContentLayout } from '@/components/layouts';
import { Button } from '@/components/ui/button';
import { getInfiniteCommentsQueryOptions } from '@/features/comments/api/get-comments';
import { getDiscussionsQueryOptions, useDiscussions } from '@/features/discussions/api/get-discussions';
import { CreateDiscussion } from '@/features/discussions/components/create-discussion';
import { DiscussionsList } from '@/features/discussions/components/discussions-list';
import { KanbanView } from '@/features/discussions/components/kanban-view';

export const clientLoader =
  (queryClient: QueryClient) =>
  async ({ request }: LoaderFunctionArgs) => {
    const url = new URL(request.url);

    const page = Number(url.searchParams.get('page') || 1);

    const query = getDiscussionsQueryOptions({ page });

    return (
      queryClient.getQueryData(query.queryKey) ??
      (await queryClient.fetchQuery(query))
    );
  };

type ViewMode = 'list' | 'kanban';

const DiscussionsRoute = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();

  const discussionsQuery = useDiscussions({
    page: +(searchParams.get('page') || 1),
  });

  return (
    <ContentLayout title="Discussions">
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <Button
            variant={viewMode === 'list' ? 'default' : 'outline'}
            size="sm"
            icon={<List className="size-4" />}
            onClick={() => setViewMode('list')}
          >
            List
          </Button>
          <Button
            variant={viewMode === 'kanban' ? 'default' : 'outline'}
            size="sm"
            icon={<LayoutGrid className="size-4" />}
            onClick={() => setViewMode('kanban')}
          >
            Kanban
          </Button>
        </div>
        <CreateDiscussion />
      </div>
      <div className="mt-4">
        {viewMode === 'list' ? (
          <DiscussionsList
            onDiscussionPrefetch={(id) => {
              // Prefetch the comments data when the user hovers over the link in the list
              queryClient.prefetchInfiniteQuery(
                getInfiniteCommentsQueryOptions(id),
              );
            }}
          />
        ) : (
          <KanbanView
            discussions={discussionsQuery.data?.data}
            isLoading={discussionsQuery.isLoading}
            onDiscussionPrefetch={(id) => {
              queryClient.prefetchInfiniteQuery(
                getInfiniteCommentsQueryOptions(id),
              );
            }}
          />
        )}
      </div>
    </ContentLayout>
  );
};

export default DiscussionsRoute;
